import { useEffect, useState } from 'react';
import { Actions, useFlexSelector } from '@twilio/flex-ui';
import {
  Box,
  Modal,
  ModalBody,
  ModalHeader,
  ModalHeading,
} from '@twilio-paste/core';

const modalHeadingID = 'modal-heading';

export const ImageModal = () => {
  const [url, setUrl] = useState('');
  const modalOpen = useFlexSelector(
    state => state.flex.view.componentViewStates.modalOpen
  );

  const closeHandler = () => {
    Actions.invokeAction('OpenImageModal', {
      url: url,
      isModalOpen: !modalOpen,
    });
  };

  useEffect(() => {
    if (modalOpen) {
      setUrl(modalOpen.url);
    }
  }, [modalOpen]);

  return (
    <Modal
      ariaLabelledby={modalHeadingID}
      isOpen={modalOpen?.isModalOpen}
      onDismiss={closeHandler}
      size="wide"
    >
      <ModalHeader>
        <ModalHeading as="h3" id={modalHeadingID}>
          Image
        </ModalHeading>
      </ModalHeader>
      <ModalBody>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <img src={url} alt="attachment" style={{ maxWidth: '50rem' }} />
        </Box>
      </ModalBody>
    </Modal>
  );
};
