import { Actions, Manager } from '@twilio/flex-ui';

// register a custom action that toggles the side panel visibility
Actions.registerAction('ToggleSidePanel', () => {
  const hidden =
    !!Manager.getInstance().store.getState()['flex'].view.componentViewStates
      ?.sidePanelState?.hidden;

  // invoke the SetComponent OOB action immediately to set the initial state
  Actions.invokeAction('SetComponentState', {
    name: 'sidePanelState',
    state: { hidden: !hidden },
  });
});
