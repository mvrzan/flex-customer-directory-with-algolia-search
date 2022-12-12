import React, { useState, useEffect } from 'react';
import { useFlexSelector, Actions } from '@twilio/flex-ui';
import { Box, Stack, Separator } from '@twilio-paste/core';

import { InstantSearch } from 'react-instantsearch-hooks-web';
import { searchClient } from '../../utils/algoliaSearch/algoliaHelpers';

import RadioOptions from './RadioButtons/RadioOptions';
import CustomSearchBox from './CustomerSearchBox/CustomSearchBox';
import MessageContainer from './OutboundMessage/MessageContainer';
import SendButton from './SendButton/SendButton';
import AlertMessage from './AlertMessage/AlertMessage';
import { StyledSidePanel, Container } from './SidePanelStyles';
import WhatsAppMessages from './OutboundMessage/WhatsAppMessages';
import onSendClickHandler from '../../utils/sendMessageHandler/sendMessageHandler';

const SidePanelView = ({ theme: { OutboundDialerPanel }, theme }) => {
  const [isSendButtonVisible, setIsSendButtonVisible] = useState(false);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [messageObject, setMessageObject] = useState({});
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');
  const [whatsAppMessage, setWhatsAppMessage] = useState('');

  const isPanelHidden = useFlexSelector(
    state => !state.flex.view.componentViewStates?.sidePanelState?.hidden
  );

  const closeSidePanelHandler = () => Actions.invokeAction('ToggleSidePanel');

  const alertMessageHandler = (messageTarget, messageType) => {
    setMessageObject(prevState => ({
      ...prevState,
      messageTarget,
      messageType,
    }));

    if (messageTarget === 'group') {
      setAlertVisible(true);
    } else {
      setAlertVisible(false);
    }

    if (messageType === 'WhatsApp') {
      setIsSendButtonVisible(false);
    }
  };

  const selectedCustomersHandler = selectedCustomers => {
    setCustomers(selectedCustomers);
  };

  const whatsappTemplateHandler = whatsappTemplate => {
    if (whatsappTemplate !== '' && whatsappTemplate !== undefined) {
      setWhatsAppMessage(whatsappTemplate);
    } else {
      setWhatsAppMessage('');
    }
  };

  const typedMessageHandler = typedMessage => {
    setMessage(typedMessage);
  };

  const sendMessageHandler = () => {
    onSendClickHandler(
      customers,
      messageObject.messageType,
      messageObject.messageTarget,
      message,
      whatsAppMessage
    );
    closeSidePanelHandler();
  };

  useEffect(() => {
    if (
      message !== '' &&
      messageObject.messageType === 'SMS' &&
      customers.length !== 0
    ) {
      setIsSendButtonVisible(true);
    } else if (
      whatsAppMessage !== '' &&
      messageObject.messageType === 'WhatsApp' &&
      customers.length !== 0
    ) {
      setIsSendButtonVisible(true);
    } else {
      setIsSendButtonVisible(false);
    }
  }, [message, customers, messageObject, whatsAppMessage]);

  return (
    <Container>
      <StyledSidePanel
        displayName="send-outbound-message"
        title="Send Outbound Message"
        isHidden={isPanelHidden}
        handleCloseClick={closeSidePanelHandler}
        themeOverride={theme && OutboundDialerPanel}
      >
        <Box>
          <Stack orientation="vertical" spacing="space20">
            <RadioOptions messageProperties={alertMessageHandler} />
            <Separator orientation="horizontal" verticalSpacing="space20" />
            <Box padding="space50" spacing="space20">
              <InstantSearch
                searchClient={searchClient}
                indexName="customer_info"
              >
                <CustomSearchBox customersHandler={selectedCustomersHandler} />
              </InstantSearch>
            </Box>
            {messageObject.messageType === 'WhatsApp' ? (
              <WhatsAppMessages whatsappTemplate={whatsappTemplateHandler} />
            ) : (
              <MessageContainer typedMessage={typedMessageHandler} />
            )}
            {isAlertVisible && <AlertMessage messageObject={messageObject} />}
            <SendButton
              isVisible={isSendButtonVisible}
              sendMessage={sendMessageHandler}
            />
          </Stack>
        </Box>
      </StyledSidePanel>
    </Container>
  );
};

export default SidePanelView;
