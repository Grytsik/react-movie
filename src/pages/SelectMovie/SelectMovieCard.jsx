import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {
  useGetSelectMovieQuery,
  useGetActorsQuery,
  useGetVideoQuery,
  useGetImageForMovieQuery,
} from '../../store/dataSlice';
import {
  APIbackdrop780,
  APIbackdrop,
  APIkey,
  APIposter,
  APIposter300,
  APIposterProfile,
} from '../../API/API';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import FadeIn from '../../Components/FadeIn/FadeIn';
import Loading from '../../Components/Loading/Loading';
import NotFoundPage from '../NotFoundPage';
import TrailerVideo from '../../Components/TrailerVideo/TrailerVideo';

import './SelectMovieCard.scss';
import 'react-circular-progressbar/dist/styles.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

function SelectMovieCard() {
  const { category, id } = useParams();
  const [trailerKey, setTrailerKey] = useState('');
  const { data: selectData, isLoading: selectLoad } = useGetSelectMovieQuery({ category, id });
  const { data: videoData, isLoading: videoLoad } = useGetVideoQuery({ category, id });
  const { data: movieImageData } = useGetImageForMovieQuery({ category, id });
  const { data: actorsData, isLoading: actorsLoad } = useGetActorsQuery(id);

  const videoKey = videoData?.results?.slice(0, 1)[0]?.key;

  const actorsProfilePath = actorsData?.cast?.filter((item) => item?.profile_path !== null);
  const movieImageEn = movieImageData?.backdrops?.filter((item) => item?.iso_639_1 === null);

  const [slidesPerView, setSlidesPerView] = useState(3);

  if (selectLoad || actorsLoad || videoLoad) return <Loading />;

  if (!selectData) {
    return <NotFoundPage />;
  }

  return (
    <>
      <FadeIn loading={selectLoad}>
        <div
          className='selectMovieCard'
          style={{ backgroundImage: `url(${APIbackdrop}${selectData?.backdrop_path})` }}></div>

        <div className='selectMovieCard__item container'>
          <img
            src={
              !selectData?.belongs_to_collection
                ? APIposter300 + selectData?.poster_path
                : APIposter300 + selectData?.belongs_to_collection.poster_path
            }
            alt='poster'
          />
          <div className='selectMovieCard__content'>
            <h2 className='selectMovieCard__title'>
              {selectData?.original_title || selectData?.original_name}
            </h2>
            <div className='selectMovieCard__genVote'>
              <div className='circular' style={{ width: '100px' }}>
                <CircularProgressbar
                  className='progress-bar select-progress-bar'
                  value={selectData?.vote_average}
                  text={selectData?.vote_average?.toFixed(1)}
                  maxValue={10}
                  styles={buildStyles({
                    pathColor: '#7FD18C',
                    textSize: '30px',
                    trailColor: '#fff',
                    textColor: '#fff',
                    width: '10%',
                  })}
                />
              </div>
              {selectData?.genres?.map((item) => (
                <p className='selectMovieCard__genres'>{item.name}</p>
              ))}
            </div>
            <p className='selectMovieCard__overview'>{selectData?.overview}</p>

            <div className='actors'>
              <Swiper
                slidesPerView={3}
                spaceBetween={10}
                loop={false}
                navigation={true}
                modules={[Navigation]}
                autoHeight={true}
                className='backdrops__slider'>
                {actorsProfilePath?.slice(0, 10).map((actor) => (
                  <SwiperSlide key={actor.id}>
                    <div className='actors__item'>
                      <img
                        className='actors__img'
                        src={APIposterProfile + actor.profile_path}
                        alt='profile'
                      />
                      <h3 className='actors__name'>{actor.original_name}</h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </FadeIn>
      <div className='container'>
        <h3 className='trailerVideo__title'>Trailer</h3>
        <TrailerVideo videoKey={videoKey} />
      </div>

      <div className='selectMovieImage'>
        <div className='container'>
          <h3 className='selectMovieImage__title'>Backdrops</h3>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            centeredSlides={false}
            className='backdrops__slider'
            modules={[Navigation]}
            breakpoints={{
              // when window width is <= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // when window width is <= 480px
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },

              // when window width is <= 640px
              640: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}>
            {movieImageEn?.map((item) => (
              <SwiperSlide>
                <img
                  className='selectMovieImage__img'
                  src={APIbackdrop780 + item?.file_path}
                  alt='picture'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default SelectMovieCard;
