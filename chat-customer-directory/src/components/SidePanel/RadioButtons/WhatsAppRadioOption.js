import WhatsAppIcon from './WhatsAppIcon';
import { Box } from '@twilio-paste/core';

const WhatsAppRadioOption = () => {
  return (
    <Box as="span" display="flex" alignItems="center">
      <WhatsAppIcon decorative={true} />
      <Box marginLeft="space20">WhatsApp</Box>
    </Box>
  );
};

export default WhatsAppRadioOption;
