import { APIposter300 } from '../../API/API';
import { Link, useParams } from 'react-router-dom';
import FadeIn from '../FadeIn/FadeIn';
import Loading from '../Loading/Loading';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import youtubeImg from '../../img/youtube-icon.png';
import useRipple from 'use-ripple-hook';
import LoadingInButton from '../LoadingInButton/LoadingInButton';

import './MovieCard.scss';

export default function MovieCard({ data, isFetching, categoryValue, setPageCount, disableBtn }) {
  const { category } = useParams();
  const [ripple, event] = useRipple();

  if (!data) {
    return <NotFoundPage />;
  }

  const movieFind = data
    ? data?.filter((item) => item?.poster_path && item?.backdrop_path !== null)
    : [];

  return (
    <>
      {movieFind && movieFind.length > 0 ? (
        <div className='moviecard'>
          <FadeIn loading={isFetching}>
            <div className='container moviecard__container'>
              {movieFind &&
                movieFind?.map((item) => (
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
            <button
              ref={ripple}
              onPointerDown={event}
              className='loadMore__btn'
              disabled={disableBtn}
              onClick={() => setPageCount((prev) => prev + 1)}>
              {isFetching ? <LoadingInButton /> : 'Load more'}
            </button>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}
