import { Alert, Text } from '@twilio-paste/core';

const AlertMessage = ({ messageObject: { messageType } }) => {
  return (
    <Alert variant="warning">
      {messageType === 'SMS' && (
        <Text as="span">
          You are about to initiate a group {messageType} chat.
        </Text>
      )}
      {messageType === 'WhatsApp' && (
        <Text as="span">
          You are about to initiate a group {messageType} chat. Please ensure
          you are using an approved WhatsApp template.
        </Text>
      )}
    </Alert>
  );
};

export default AlertMessage;
