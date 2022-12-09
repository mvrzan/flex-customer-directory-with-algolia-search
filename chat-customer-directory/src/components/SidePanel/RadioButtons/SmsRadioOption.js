import { Box } from '@twilio-paste/core';
import { ProductMessagingIcon } from '@twilio-paste/icons/esm/ProductMessagingIcon';

const SmsRadioOption = () => {
  return (
    <Box as="span" display="flex" alignItems="center">
      <ProductMessagingIcon decorative={true} />
      <Box marginLeft="space20">SMS</Box>
    </Box>
  );
};

export default SmsRadioOption;
