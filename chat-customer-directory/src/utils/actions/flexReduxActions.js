import { Actions, Manager } from '@twilio/flex-ui';

// register a custom action that toggles the side panel visibility
Actions.registerAction('ToggleSidePanel', () => {
  const hidden =
    !!Manager.getInstance().store.getState()['flex'].view.componentViewStates
      ?.sidePanelState?.hidden;

  // invoke the SetComponent OOB action immediately to set the initial state side panel state
  Actions.invokeAction('SetComponentState', {
    name: 'sidePanelState',
    state: { hidden: !hidden },
  });
});

// register a custom action that opens an image modal window
Actions.registerAction('OpenImageModal', async payload => {
  const isModalOpen =
    !!Manager.getInstance().store.getState()['flex'].view.componentViewStates
      ?.modalOpen?.isModalOpen;

  // invoke the SetComponent OOB action immediately to set the initial modal state
  await Actions.invokeAction('SetComponentState', {
    name: 'modalOpen',
    state: { isModalOpen: !isModalOpen, url: payload.url },
  });
});
