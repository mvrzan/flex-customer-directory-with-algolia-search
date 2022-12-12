import { useState, useEffect } from 'react';

import { Radio, RadioGroup, Box } from '@twilio-paste/core';
import SmsRadioOption from './SmsRadioOption';
import WhatsAppRadioOption from './WhatsAppRadioOption';

const RadioOptions = ({ messageProperties }) => {
  const [messageType, setMessageType] = useState('SMS');
  const [messageTarget, setMessageTarget] = useState('individual');

  const messagePropertiesHandler = selectedValue => {
    if (selectedValue === 'group') {
      setMessageTarget(selectedValue);
    } else if (selectedValue === 'individual') {
      setMessageTarget(selectedValue);
    } else if (selectedValue === 'SMS') {
      setMessageType(selectedValue);
    } else if (selectedValue === 'WhatsApp') {
      setMessageType(selectedValue);
    }
  };

  useEffect(() => {
    messageProperties(messageTarget, messageType);
  }, [messageTarget, messageType]);

  return (
    <Box padding="space50">
      <RadioGroup
        name="messageType"
        value={messageType}
        legend="Message type"
        onChange={messagePropertiesHandler}
        orientation="horizontal"
      >
        <Radio id="sms" value="SMS" name="sms">
          <SmsRadioOption />
        </Radio>
        <Radio id="whatsapp" value="WhatsApp" name="whatsapp">
          <WhatsAppRadioOption />
        </Radio>
      </RadioGroup>
      <RadioGroup
        name="messageTarget"
        value={messageTarget}
        legend="Message target"
        onChange={messagePropertiesHandler}
        orientation="horizontal"
      >
        <Radio id="individual" value="individual" name="individual">
          Individual
        </Radio>
        <Radio id="group" value="group" name="group">
          Group
        </Radio>
      </RadioGroup>
    </Box>
  );
};

export default RadioOptions;
