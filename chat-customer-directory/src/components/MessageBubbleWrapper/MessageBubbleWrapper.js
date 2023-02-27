import { useEffect, useState } from 'react';

import { MediaMessage } from '../MediaMessage/MediaMessage';

export const MessageBubbleWrapper = ({
  message: {
    source: { media: mediaSource },
  },
}) => {
  const [mediaUrl, setMediaUrl] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      if (mediaSource) {
        const url = await mediaSource.getContentTemporaryUrl();
        setMediaUrl(url);
      }
    };
    fetchMedia();
  }, [mediaSource]);

  return (
    <>
      {mediaUrl && (
        <MediaMessage mediaUrl={mediaUrl} mediaType={mediaSource.contentType} />
      )}
    </>
  );
};
