import { useState, useEffect } from 'react';
import { useSearchBox, useHits } from 'react-instantsearch-hooks-web';

import { Box, Label, MultiselectCombobox, Text } from '@twilio-paste/core';

const emptyStateHandler = () => (
  <Box paddingY="space40" paddingX="space50">
    <Text as="span" fontStyle="italic">
      No results found
    </Text>
  </Box>
);

const CustomSearchBox = props => {
  const [customerValue, setCustomerValue] = useState([]);

  const { refine } = useSearchBox(props);
  const results = useHits();

  const searchHandler = event => refine(event.inputValue);

  const selectedCustomersHandler = value => {
    setCustomerValue(value);
  };

  useEffect(() => {
    props.customersHandler(customerValue);
  }, [customerValue, props]);

  return (
    <Box>
      <Label marginBottom="space50" htmlFor="customer-search">
        Message destination
      </Label>
      <MultiselectCombobox
        items={results.hits.map(result => result)}
        itemToString={item => (item ? item.customerName : '')}
        optionTemplate={option => option.customerName}
        emptyState={emptyStateHandler}
        maxHeight="120px"
        onSelectedItemsChange={selectedCustomersHandler}
        onInputValueChange={searchHandler}
      />
    </Box>
  );
};

export default CustomSearchBox;
