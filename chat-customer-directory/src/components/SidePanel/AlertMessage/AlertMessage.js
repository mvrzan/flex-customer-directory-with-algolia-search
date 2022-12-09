import { Alert, Text } from '@twilio-paste/core';

const AlertMessage = props => {
  return (
    <Alert variant="warning">
      {props.messageObject.messageType === 'SMS' && (
        <Text as="span">
          You are about to initiate a group {props.messageObject.messageType}{' '}
          chat.
        </Text>
      )}
      {props.messageObject.messageType === 'WhatsApp' && (
        <Text as="span">
          You are about to initiate a group {props.messageObject.messageType}{' '}
          chat. Please ensure you are using an approved WhatsApp template.
        </Text>
      )}
    </Alert>
  );
};

export default AlertMessage;
