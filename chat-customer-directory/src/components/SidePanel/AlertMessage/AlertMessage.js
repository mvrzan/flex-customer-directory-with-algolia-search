import { Alert, Text } from '@twilio-paste/core';

const AlertMessage = ({ messageObject: { messageType } }) => {
  const messageCategory = {
    sms: 'SMS',
    whatsapp: 'WhatsApp',
  };

  return (
    <Alert variant="warning">
      {messageType === messageCategory.sms && (
        <Text as="span">
          You are about to initiate a group {messageType} chat.
        </Text>
      )}
      {messageType === messageCategory.whatsapp && (
        <Text as="span">
          You are about to initiate a group {messageType} chat. Please ensure
          you are using an approved WhatsApp template.
        </Text>
      )}
    </Alert>
  );
};

export default AlertMessage;
