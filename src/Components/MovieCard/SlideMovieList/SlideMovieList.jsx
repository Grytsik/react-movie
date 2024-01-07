import { useGetTrandingTvOrMovieQuery } from '../../../store/dataSlice';
import FadeIn from '../../FadeIn/FadeIn';
import { Link } from 'react-router-dom';
import { APIposter300 } from '../../../API/API';
import youtubeImg from '../../../img/youtube-icon.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './SlideMovieList.scss';

export default function SlideMovieList({ category, value, categoryRoute, title }) {
  const { data, isLoading } = useGetTrandingTvOrMovieQuery({ category, value });

  const movieFind = data?.results.filter(
    (item) => item?.poster_path && item?.backdrop_path !== null
  );

  return (
    <>
      <FadeIn loading={isLoading}>
        <div className='container'>
          <h1 className='slideMovie-title__main'>{title}</h1>

          <Swiper
            spaceBetween={10}
            slidesPerView={4}
            navigation={false}
            className='slideMovie-slider__wrapper'
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              320: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 20,
              },

              640: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}>
            {movieFind &&
              movieFind?.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className='slideMovie__item'>
                    <Link
                      to={category ? `/${category}/${item?.id}` : `/${categoryRoute}/${item?.id}`}>
                      <img
                        className='slideMovie__img'
                        src={APIposter300 + item?.poster_path}
                        alt='poster'
                      />
                    </Link>
                    <div className='slideMovie__content'>
                      <h2 className='slideMovie__title'>
                        {item?.original_title || item?.original_name}
                      </h2>
                      <img className='slideMovie__content-img' src={youtubeImg} alt='img' />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </FadeIn>
    </>
  );
}
