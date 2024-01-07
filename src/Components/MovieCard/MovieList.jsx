import { useEffect, useState } from 'react';
import { useGetCategoryQuery } from '../../store/dataSlice';
import MovieCard from './MovieCard';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading';

import 'swiper/css';

export default function MovieList() {
  const { category } = useParams();
  const [pageCount, setPageCount] = useState(1);
  const { data, isLoading, isFetching } = useGetCategoryQuery({ category, pageCount });
  const [movies, setMovies] = useState([]);
  const [TvShows, setTvShows] = useState([]);

  useEffect(() => {
    if (data && data?.results) {
      if (category === 'movie') {
        setMovies((prev) => [...prev, ...data.results]);
        setTvShows([]);
      } else if (category === 'tv') {
        setTvShows((prev) => [...prev, ...data.results]);
        setMovies([]);
      }
    } else {
      setMovies([]);
      setTvShows([]);
    }
  }, [data]);

  useEffect(() => {
    setPageCount(1);
  }, [category]);

  if (isFetching) return <Loading />;

  return (
    <MovieCard
      data={category === 'movie' ? movies : TvShows}
      isLoading={isLoading}
      setPageCount={setPageCount}
      category={category}
    />
  );
}
