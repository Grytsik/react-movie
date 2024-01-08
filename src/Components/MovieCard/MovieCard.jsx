import { APIposter300 } from '../../API/API';
import { Link, useParams } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import Loading from '../Loading/Loading';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import youtubeImg from '../../img/youtube-icon.png';

import './MovieCard.scss';

export default function MovieCard({ data, isLoading, categoryValue, setPageCount }) {
  const { category } = useParams();

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <NotFoundPage />;
  }

  const movieBudget = data
    ? data?.filter((item) => item?.poster_path && item?.backdrop_path !== null)
    : [];

  return (
    <>
      {movieBudget.length > 0 ? (
        <div className='moviecard'>
          <FadeIn loading={isLoading}>
            <div className='container moviecard__container'>
              {movieBudget &&
                movieBudget?.map((item) => (
                  <div key={item.id} className='moviecard__item'>
                    <Link
                      className='moviecard__link'
                      to={category ? `/${category}/${item?.id}` : `/${categoryValue}/${item?.id}`}>
                      <img
                        className='moviecard__img'
                        src={APIposter300 + item?.poster_path}
                        alt='poster'
                      />
                    </Link>
                    <div className='moviecard__content'>
                      <h2 className='moviecard__title'>
                        {item?.original_title || item?.original_name}
                      </h2>
                      <img className='moviecard__content-img' src={youtubeImg} alt='img' />
                    </div>
                  </div>
                ))}
            </div>
          </FadeIn>
          <div className='container'>
            <button className='loadMore__btn' onClick={() => setPageCount((prev) => prev + 1)}>
              {isLoading ? 'Loading' : 'Load more'}
            </button>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
