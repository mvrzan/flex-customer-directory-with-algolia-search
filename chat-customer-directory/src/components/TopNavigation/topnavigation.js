import React from 'react';
import { IconButton, Actions } from '@twilio/flex-ui';

const toggleSidePanelHandler = () => {
  Actions.invokeAction('ToggleSidePanel');
};

const TopNavigation = () => {
  return <IconButton icon="SendLarge" onClick={toggleSidePanelHandler} />;
};

export default TopNavigation;
