import YouTube from 'react-youtube';
import { useEffect, useRef } from 'react';

import './TrailerVideo.scss';

export default function TrailerVideo({ videoKey }) {
  const playerRef = useRef(null);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      controls: 1,
      autohide: 0,
      wmode: 'opaque',
      origin: 'http://localhost:3000',
    },
  };

  return (
    <div className='trailerVideo'>
      <YouTube
        onReady={(event) => event.target.pauseVideo()}
        videoId={videoKey}
        opts={opts}
        className='trailerVideo__container'
      />
    </div>
  );
}
