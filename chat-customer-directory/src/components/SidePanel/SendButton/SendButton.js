import { Button, Box } from '@twilio-paste/core';

const SendButton = props => {
  return (
    <Box padding="space50">
      <Button
        variant="primary"
        disabled={!props.isVisible}
        onClick={props.sendMessage}
      >
        Send message
      </Button>
    </Box>
  );
};

export default SendButton;
