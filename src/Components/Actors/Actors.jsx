import { Swiper, SwiperSlide } from 'swiper/react';
import { APIposterProfile } from '../../API/API';
import { Navigation } from 'swiper/modules';

import './Actors.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

export default function Actors({ actors }) {
  return (
    <div className='actors'>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        loop={false}
        navigation={true}
        modules={[Navigation]}
        autoHeight={true}
        className='backdrops__slider'
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}>
        {actors?.slice(0, 10).map((actor) => (
          <SwiperSlide key={actor?.id || actor?.cast_id}>
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
  );
}
