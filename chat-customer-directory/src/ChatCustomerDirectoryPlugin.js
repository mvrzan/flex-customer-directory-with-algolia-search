import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';
import { CustomizationProvider } from '@twilio-paste/core/customization';

import TopNavigation from './components/TopNavigation/topnavigation';
import SidePanelView from './components/SidePanel/SidePanelView';
import { MessageBubbleWrapper } from './components/MessageBubbleWrapper/MessageBubbleWrapper';
import './utils/actions/flexReduxActions';
import './utils/actions/sendMessageAction';
import registerNotifications from './utils/notifications/notifications';

const PLUGIN_NAME = 'ChatCustomerDirectoryPlugin';

export default class ChatCustomerDirectoryPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
    // pass the PasteThemeProvider to all Flex UI components without the need to wrap them separately
    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });

    // register custom notifications
    registerNotifications(manager);

    // add the custom icon (TopNavigation) into the Flex MainHeader
    flex.MainHeader.Content.add(<TopNavigation key="outbound-chat" />, {
      sortOrder: -999,
      align: 'end',
    });

    // add the custom side panel view into the main Flex container
    flex.MainContainer.Content.add(<SidePanelView key="outbound-chat-panel" />);

    //  remove the default message bubble if the body of the message contains media
    flex.MessageBubble.Content.replace(
      <MessageBubbleWrapper key={'message-bubble'} />,
      {
        if: props => props.message.source.media,
      }
    );

    // initialize the SidePanelView component
    SidePanelView(flex, manager);
  }
}
