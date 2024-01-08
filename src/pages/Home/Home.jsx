import './Home.scss';

import HomeBanner from './HomeBanner.jsx';
import SlideMovieList from '../../Components/MovieCard/SlideMovieList/SlideMovieList.jsx';

function Home() {
  return (
    <>
      <HomeBanner />
      <SlideMovieList
        category={'movie'}
        value={'top_rated'}
        title={'Movie Top Rated'}
      />
      <SlideMovieList
        category={'movie'}
        value={'popular'}
        title={'Movie Popular'}
      />
      <SlideMovieList
        category={'tv'}
        value={'top_rated'}
        title={'TV Top Rated'}
      />
      <SlideMovieList 
      category={'tv'} 
      value={'popular'} 
      title={'TV Popular'} />
    </>
  );
}

export default Home;
