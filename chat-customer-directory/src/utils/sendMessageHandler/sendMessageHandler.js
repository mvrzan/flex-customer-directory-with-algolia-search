import { Actions } from '@twilio/flex-ui';

const onSendClickHandler = (
  customers,
  messageType,
  messageTarget,
  messageBody,
  whatsAppMessage
) => {
  if (messageTarget === 'individual') {
    customers.forEach(customer => {
      let payload = {
        destination:
          messageType === 'WhatsApp'
            ? 'whatsapp:' + customer.number
            : customer.number,
        callerId:
          messageType === 'WhatsApp'
            ? 'whatsapp:' + process.env.REACT_APP_TWILIO_WHATSAPP_FROM_NUMBER
            : process.env.REACT_APP_TWILIO_FROM_NUMBER,
        body: messageType === 'WhatsApp' ? whatsAppMessage : messageBody,
        openChat: false,
        routeToMe: true,
      };

      Actions.invokeAction('SendOutboundMessage', payload);
    });
  } else {
    let payload = {
      destination: [
        customers.map(customer =>
          messageType === 'WhatsApp'
            ? 'whatsapp:' + customer.number
            : customer.number
        ),
      ],
      callerId:
        messageType === 'WhatsApp'
          ? 'whatsapp:' + process.env.REACT_APP_TWILIO_WHATSAPP_FROM_NUMBER
          : process.env.REACT_APP_TWILIO_FROM_NUMBER,
      body: messageType === 'WhatsApp' ? whatsAppMessage : messageBody,
      openChat: true,
      routeToMe: true,
    };

    Actions.invokeAction('SendOutboundMessage', payload);
  }
};

export default onSendClickHandler;
