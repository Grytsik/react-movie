import './Home.scss';

import HomeBanner from './HomeBanner.jsx';
import SlideMovieList from '../../Components/MovieCard/SlideMovieList.jsx';

function Home() {
  return (
    <>
      <HomeBanner />
      <SlideMovieList category={'movie'} value={'top_rated'} categoryRoute={'movie'} title={'Movie Top Rated'} />
      {/* <SlideMovieList category={'movie'} value={'popular'} categoryValue={'movie'} />
      <SlideMovieList category={'tv'} value={'top_rated'} categoryValue={'tv'} />
      <SlideMovieList category={'tv'} value={'popular'} categoryValue={'tv'} /> */}
    </>
  );
}

export default Home;
