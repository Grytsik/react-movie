import { useParams } from 'react-router-dom';
import { useGetSearchQuery } from '../../store/dataSlice';
import { useState, useEffect } from 'react';
import MovieCard from '../../Components/MovieCard/MovieCard';
import Loading from '../../Components/Loading/Loading';

export default function Search() {
  const { value, category } = useParams();
  const [pageCount, setPageCount] = useState(2);
  const { data, isFetching } = useGetSearchQuery({ category, value, pageCount });
  const [movies, setMovies] = useState([]);
  const [disableBtn, setDisableBtn] = useState(false);

  useEffect(() => {
    setMovies([]);
    setPageCount(1);
  }, [category, value]);

  useEffect(() => {
    if (data && data?.results) {
      setMovies((prev) => [...prev, ...data.results]);
      setDisableBtn(data?.results.length === 0);
    } else {
      setMovies([]);
      setDisableBtn(true);
    }
  }, [data]);

  if(isFetching) return <Loading/>

  return (
    <MovieCard
      disableBtn={disableBtn}
      data={movies}
      isLoading={isFetching}
      setPageCount={setPageCount}
    />
  );
}
