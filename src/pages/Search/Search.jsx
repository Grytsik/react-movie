import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchData, useGetSearchQuery } from '../../store/dataSlice';
import MovieCard from '../../Components/MovieCard/MovieCard';
import Loading from '../../Components/Loading/Loading';

export default function Search() {
  const dispatch = useDispatch();
  const { value, category } = useParams();
  const { data, isLoading, isError } = useGetSearchQuery({ category, value });

  if (isLoading) return <Loading />;

  console.log(isError);

  return <MovieCard data={data} isLoading={isLoading} />;
}
