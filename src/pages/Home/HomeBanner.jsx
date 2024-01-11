import { Link } from 'react-router-dom';
import { useGetGenresForMovieQuery, useGetTrandingSliderQuery } from '../../store/dataSlice.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation } from 'swiper/modules';
import { APIbackdrop } from '../../API/API.js';
import FadeIn from '../../Components/FadeIn/FadeIn.jsx';
import Loading from '../../Components/Loading/Loading.jsx';
import playBtn from '../../img/play.png';
import ProgressBar from '../../Components/ProgressBar/ProgressBar.jsx';

import './Home.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function HomeBanner() {
  const { data, isLoading } = useGetTrandingSliderQuery();
  const { data: dataGenres, isLoading: loadingGenres } = useGetGenresForMovieQuery();

  if (isLoading || loadingGenres) return <Loading />;

  const getGenresNames = (genreIds) => {
    const genreNames = genreIds?.map((genreId) => {
      const foundGenre = dataGenres?.genres?.find((g) => g.id === genreId);
      return foundGenre?.name;
    });
    console.log(genreNames);
    return genreNames;
  };

  return (
    <FadeIn loading={isLoading}>
      <Swiper
      // spaceBetween={50}
      // slidesPerView={1}
      // autoplay={{
      //   delay: 3500,
      //   disableOnInteraction: false,
      // }}
      // modules={[EffectFade, Autoplay, Navigation]}
      // effect='fade'>
      >
        {data &&
          data?.results?.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className='swiper-slider__image'
                style={{ backgroundImage: `url(${APIbackdrop}${item?.backdrop_path})` }}>
                <div className='swiper-slider__content container'>
                  <h2 className='swiper-slider__title'>{item?.original_title}</h2>
                  <div className='swiper-slider__genres'>
                    <div className='swiper__progress'>
                      <ProgressBar data={item} />
                    </div>
                    <div className='swiper-genres__item'>
                      {getGenresNames(item?.genre_ids, dataGenres).map((genre, index) => (
                        <span key={index} className='swiper-genres__name'>
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className='swiper-slider__text'>{item.overview}</p>
                  <Link className='watchNow__btn' to={`movie/${item.id}`}>
                    Watch Now
                    <img className='watchNow-play__btn' src={playBtn} alt='play' />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </FadeIn>
  );
}
