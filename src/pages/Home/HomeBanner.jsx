import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';
import { useGetTrandingSliderQuery } from '../../store/dataSlice.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';

import './Home.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import { APIbackdrop } from '../../API/API.js';
import FadeIn from '../../Components/FadeIn/FadeIn.jsx';
import Loading from '../../Components/Loading/Loading.jsx';

export default function HomeBanner() {
  const { data, isLoading } = useGetTrandingSliderQuery();

  console.log(data);

  if (isLoading) return <Loading />;

  return (
    <FadeIn loading={isLoading}>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay, Navigation]}
        effect='fade'>
        {data &&
          data?.results?.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className='swiper-slider__image'
                style={{ backgroundImage: `url(${APIbackdrop}${item?.backdrop_path})` }}>
                <div className='swiper-slider__content container'>
                  <h2 className='swiper-slider__title'>{item?.original_title}</h2>
                  <div className='swiper-slider__genres'>
                    <CircularProgressbar
                      className='progress-bar'
                      value={item?.vote_average}
                      text={item?.vote_average?.toFixed(1)}
                      maxValue={10}
                      styles={buildStyles({
                        pathColor: '#7FD18C',
                        textSize: '30px',
                        trailColor: '#fff',
                        textColor: '#fff',
                      })}
                    />
                  </div>
                  <p className='swiper-slider__text'>{item.overview}</p>
                  <Link className='watchNow__btn' to={`movie/${item.id}`}>
                    Watch Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </FadeIn>
  );
}
