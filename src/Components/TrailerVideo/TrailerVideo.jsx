import ReactPlayer from 'react-player/lazy';

import './TrailerVideo.scss';

export default function TrailerVideo({ videoKey }) {
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
