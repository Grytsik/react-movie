import { Link } from 'react-scroll';
import { auth } from '../../API/firebase';
import playBtn from '../../img/play.png';
import heartWhite from '../../img/heart-white.png';
import heartRed from '../../img/heart-red.png';
import LoadingInButton from '../../Components/LoadingInButton/LoadingInButton';

export default function SelectMovieLike({ addLikeMovie, isLiked, id, loading }) {
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
      <Link to='trailer' offset={-250} smooth={true} duration={500} className='watch-selectMovie'>
        Watch Now
        <img className='selectMovie-btn__play' src={playBtn} alt='play' />
      </Link>
    </div>
  );
}
