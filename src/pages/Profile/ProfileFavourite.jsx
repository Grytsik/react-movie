import Loading from '../../Components/Loading/Loading';
import { useGetSelectMovieQuery } from '../../store/dataSlice';
import { APIposter300 } from '../../API/API';
import youtubeImg from '../../img/youtube-icon.png';
import { Link } from 'react-router-dom';
import LoadingInButton from '../../Components/LoadingInButton/LoadingInButton';
import { useState } from 'react';

export default function ProfileFavourite({ category, id, deleteMovie }) {
  const { data, isLoading } = useGetSelectMovieQuery({ category, id });
  const [loading, setLoading] = useState(false);

  if (isLoading) return <Loading />;

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteMovie(id);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className='favourite'>
      <div className='favourite__item'>
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
        </div>
        <button onClick={() => handleDelete(id)} className='favouriteMovie__remove'>
          {loading ? <LoadingInButton /> : 'REMOVE'}
        </button>
      </div>
    </div>
  );
}
