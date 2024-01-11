import { Link } from 'react-scroll';
import { auth } from '../../API/firebase';
import playBtn from '../../img/play.png';
import heartWhite from '../../img/heart-white.png';
import heartRed from '../../img/heart-red.png';
import LoadingInButton from '../../Components/LoadingInButton/LoadingInButton';
import { useState, useEffect } from 'react';

export default function SelectMovieLike({ addLikeMovie, isLiked, id, loading }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const newOffset = window.innerWidth <= 568 ? -250 : 0;
      setOffset(newOffset);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  return (
    <div className='selectMovieCard__like'>
      {loading ? (
        <LoadingInButton />
      ) : (
        <img
          onClick={() => addLikeMovie(auth?.currentUser?.uid, id)}
          className='selectMovieCard__heart'
          src={isLiked ? heartRed : heartWhite}
          alt='heart'
        />
      )}
      <Link to='trailer' offset={offset} smooth={true} duration={500} className='watch-selectMovie'>
        Watch Now
        <img className='selectMovie-btn__play' src={playBtn} alt='play' />
      </Link>
    </div>
  );
}
