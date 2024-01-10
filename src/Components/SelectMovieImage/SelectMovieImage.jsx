import { APIbackdrop780 } from '../../API/API';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import './SelectMovieImage.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';

export default function SelectMovieImage({ movieImageEn }) {
  return (
    <div className='selectMovieImage'>
      <div className='container'>
        <h3 className='selectMovieImage__title'>Backdrops</h3>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={false}
          className='backdrops__slider'
          style={{ height: '100%' }}
          modules={[Navigation]}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },

            480: {
              slidesPerView: 1,
              spaceBetween: 20,
            },

            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          }}>
          {movieImageEn?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                className='selectMovieImage__img'
                src={APIbackdrop780 + item?.file_path}
                alt='actor'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
