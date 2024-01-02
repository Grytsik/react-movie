import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/lazy';
import { useEffect, useRef } from 'react';

import './TrailerVideo.scss';

export default function TrailerVideo({ videoKey }) {
  const playerRef = useRef(null);

  const opts = {
    height: 'auto',
    width: '450',
    playerVars: {
      autoplay: 1,
      controls: 1,
      autohide: 0,
      wmode: 'opaque',
      origin: 'http://localhost:3000',
    },
  };

  return (
    <div className='trailerVideo__container'>
      <ReactPlayer
        width='100%'
        height='100%'
        controls={true}
        className='react-player'
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
        }}
        url={`https://www.youtube.com/watch?v=${videoKey}`}
      />
    </div>
  );
}
