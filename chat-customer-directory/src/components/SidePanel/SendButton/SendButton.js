import { Button, Box } from '@twilio-paste/core';

const SendButton = ({ isVisible, sendMessage }) => {
  return (
    <Box padding="space50">
      <Button variant="primary" disabled={!isVisible} onClick={sendMessage}>
        Send message
      </Button>
    </Box>
  );
};

export default SendButton;
