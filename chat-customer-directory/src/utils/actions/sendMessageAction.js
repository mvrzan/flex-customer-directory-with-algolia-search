import { Actions, Manager, Notifications } from '@twilio/flex-ui';
const manager = Manager.getInstance();

const sendOutboundMessage = async sendOutboundParams => {
  const body = {
    ...sendOutboundParams,
    Token: manager.store.getState().flex.session.ssoTokenPayload.token,
  };

  const { OpenChatFlag, To } = sendOutboundParams;

  try {
    const resp = await fetch(
      `${process.env.REACT_APP_TWILIO_SERVERLESS_SERVICE}/sendMessage`,
      {
        method: 'POST',
        body: new URLSearchParams(body),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      }
    );
    const data = await resp.json();

    if (!OpenChatFlag && data.success) {
      Notifications.showNotification('outboundMessageSent', {
        message: To,
      });
    }

    if (!data.success) {
      Notifications.showNotification('outboundMessageFailed', {
        message: data.errorMessage,
      });
    }
  } catch (error) {
    console.error(error);
    Notifications.showNotification('outboundMessageFailed', {
      message: 'Error calling sendOutboundMessage function',
    });
  }
};

Actions.registerAction('SendOutboundMessage', payload => {
  if (!payload.callerId)
    payload.callerId = process.env.REACT_APP_TWILIO_FROM_NUMBER;

  if (payload.openChat) {
    // create a task immediately for group chats
    const sendOutboundParams = {
      GroupChat: true,
      OpenChatFlag: true,
      KnownAgentRoutingFlag: false,
      To: payload.destination,
      From: payload.callerId,
      Body: payload.body,
      WorkerSid: manager.workerClient.sid,
      WorkerFriendlyName: manager.user.identity,
      WorkspaceSid: process.env.REACT_APP_WORKSPACE_SID,
      WorkflowSid: process.env.REACT_APP_WORKFLOW_SID,
      QueueSid: process.env.REACT_APP_QUEUE_SID,
      InboundStudioFlow: process.env.REACT_APP_INBOUND_STUDIO_FLOW,
    };
    sendOutboundMessage(sendOutboundParams);
  } else {
    // send message and inbound triggers studio flow. optional known agent routing
    const sendOutboundParams = {
      OpenChatFlag: false,
      KnownAgentRoutingFlag: !!payload.routeToMe,
      To: payload.destination,
      From: payload.callerId,
      Body: payload.body,
      WorkerSid: manager.workerClient.sid,
      WorkerFriendlyName: manager.user.identity,
      WorkspaceSid: '',
      WorkflowSid: '',
      QueueSid: '',
      InboundStudioFlow: process.env.REACT_APP_INBOUND_STUDIO_FLOW,
    };
    sendOutboundMessage(sendOutboundParams);
  }
});
