import { useMemo } from 'react';
import { Actions } from '@twilio/flex-ui';

import { MediaLink, MediaMessageContainer } from './MediaMessage.styles';
import { ImageModal } from './ImageModal';

export const MediaMessage = ({ mediaUrl, mediaType }) => {
  const imageViewer = useMemo(
    () => (
      <div style={{ cursor: 'pointer' }}>
        <img
          src={mediaUrl}
          alt={mediaType}
          width="150px"
          onClick={() =>
            Actions.invokeAction('OpenImageModal', { url: mediaUrl })
          }
        />
      </div>
    ),
    [mediaUrl, mediaType]
  );

  const audioPlayer = useMemo(
    () => (
      <>
        <audio controls>
          <source src={mediaUrl} type={mediaType} />
        </audio>
        <MediaLink href={mediaUrl} target="_blank" rel="noopener noreferrer">
          Full Size Player
        </MediaLink>
      </>
    ),
    [mediaUrl, mediaType]
  );

  const videoPlayer = useMemo(
    () => (
      <>
        <video width="100%" controls>
          <source src={mediaUrl} type={mediaType} />
        </video>
        <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
          Full Size Player
        </a>
      </>
    ),
    [mediaUrl, mediaType]
  );

  const pdfViewer = useMemo(
    () => (
      <>
        <iframe title="PDF Preview" src={mediaUrl} width="100%" />
        <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
          Full Size Document
        </a>
      </>
    ),
    [mediaUrl]
  );

  return (
    <MediaMessageContainer>
      {mediaType.startsWith('image')
        ? imageViewer
        : mediaType.startsWith('audio')
        ? audioPlayer
        : mediaType.startsWith('video')
        ? videoPlayer
        : mediaType.startsWith('application')
        ? pdfViewer
        : ''}
      <ImageModal />
    </MediaMessageContainer>
  );
};
