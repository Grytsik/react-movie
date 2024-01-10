import { useEffect, useState } from 'react';
import { useGetCategoryQuery } from '../../store/dataSlice';
import MovieCard from './MovieCard';
import { useParams } from 'react-router-dom';

import 'swiper/css';

export default function MovieList() {
  const { category } = useParams();
  const [pageCount, setPageCount] = useState(1);
  const { data, isFetching } = useGetCategoryQuery({ category, pageCount });
  const [movies, setMovies] = useState([]);
  const [TvShows, setTvShows] = useState([]);

  useEffect(() => {
    setMovies([]);
    setTvShows([]);
    setPageCount(1);
  }, [category]);

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

  return (
    <MovieCard
      data={category === 'movie' ? movies : TvShows}
      isFetching={isFetching}
      setPageCount={setPageCount}
      category={category}
    />
  );
}
