import { useEffect, useState } from 'react';

import { Combobox, Box, Text } from '@twilio-paste/core';
import { WhatsAppTemplates } from '../../../utils/WhatsAppTemplates/whatsappTemplates';

const WhatsAppMessages = ({ whatsappTemplate }) => {
  const [filteredTemplates, setFilteredTemplates] = useState(WhatsAppTemplates);
  const [templateValue, setTemplateValue] = useState();

  const filterHandler = event => {
    if (event.inputValue !== undefined) {
      setFilteredTemplates(
        WhatsAppTemplates.filter(item =>
          item.toLowerCase().includes(event.inputValue.toLowerCase())
        )
      );
    }

    if (event.inputValue === '') {
      setTemplateValue('');
    }
  };

  const selectedItemHandler = item => {
    if (item !== '') {
      setTemplateValue(item.selectedItem);
    }
  };

  useEffect(() => {
    if (templateValue === '' || templateValue === undefined) {
      whatsappTemplate('');
    } else {
      whatsappTemplate(templateValue);
    }
  }, [templateValue, whatsappTemplate]);

  const noResultsHandler = () => {
    return (
      <Box paddingY="space40" paddingX="space50">
        <Text as="span" fontStyle="italic">
          No results found
        </Text>
      </Box>
    );
  };

  return (
    <Box padding="space50">
      <Combobox
        autocomplete
        required
        labelText="Please select a WhatsApp template"
        helpText="Only approved WhatsApp templates are available."
        items={filteredTemplates}
        onInputValueChange={filterHandler}
        emptyState={noResultsHandler}
        selectedItem={templateValue}
        onSelectedItemChange={selectedItemHandler}
        initialSelectedItem=""
      />
    </Box>
  );
};

export default WhatsAppMessages;
