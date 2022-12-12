import { useState, useEffect } from 'react';
import { Box, TextArea, Label } from '@twilio-paste/core';

const MessageContainer = ({ typedMessage }) => {
  const [messageBody, setMessageBody] = useState('');

  const typedMessageHandler = event => {
    setMessageBody(event.target.value);
  };

  useEffect(() => {
    typedMessage(messageBody);
  }, [messageBody, typedMessage]);

  return (
    <Box padding="space50">
      <Label htmlFor="message-body">Message to send</Label>
      <TextArea
        value={messageBody}
        id="message-body"
        name="message-body"
        placeholder="Type message"
        onChange={typedMessageHandler}
      />
    </Box>
  );
};

export default MessageContainer;
