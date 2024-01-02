import { Routes, Route, Link } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import SelectMovieCard from '../../pages/SelectMovie/SelectMovieCard';
import Header from '../Header/Header';
import Search from '../../pages/Search/Search';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import MovieCard from '../MovieCard/MovieCard';
import MovieList from '../MovieCard/MovieList';
import SearchBar from '../SearchBar/SearchBar';
import Profile from '../../pages/Profile/Profile';

export default function RouteComponent() {
  return (
    <>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/:category' element={<MovieList/>}/>
        <Route path='/:category/:id' element={<SelectMovieCard />} />
        <Route path='/search' element={<SearchBar/>}/>
        <Route path='/search/:category/:value' element={<Search/>} />
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </>
  );
}
