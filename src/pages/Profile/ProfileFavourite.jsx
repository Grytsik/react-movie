import Loading from '../../Components/Loading/Loading';
import { useGetSelectMovieQuery } from '../../store/dataSlice';
import { APIposter300 } from '../../API/API';
import youtubeImg from '../../img/youtube-icon.png';
import { Link } from 'react-router-dom';

export default function ProfileFavourite({ category, id }) {
  const { data, isLoading } = useGetSelectMovieQuery({ category, id });

  if (isLoading) return <Loading />;

  console.log(data);

  const alertFunc = () => {
    alert('click');
  }

  return (
    <>
      <div className='favouriteMovie__container'>
        <div className='favourite__link'>
          <Link to={`/${category}/${id}`}>
            <img src={APIposter300 + data?.poster_path} alt='poster' />
          </Link>
        </div>

        <div className='favouriteMovie__content'>
          <h2 className='favouriteMovie__title'>{data?.original_title || data?.original_name}</h2>
          <img className='favouriteMovie__content-img' src={youtubeImg} alt='img' />
        </div>
        <button onClick={alertFunc} className='favouriteMovie__remove'>REMOVE</button>
      </div>
      
    </>
  );
}
