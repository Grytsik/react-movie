import { useParams } from 'react-router-dom';
import { useGetSearchQuery } from '../../store/dataSlice';
import MovieCard from '../../Components/MovieCard/MovieCard';
import Loading from '../../Components/Loading/Loading';

export default function Search() {
  const { value, category } = useParams();
  const { data, isLoading } = useGetSearchQuery({ category, value });

  if (isLoading) return <Loading />;

  return <MovieCard data={data?.results} isLoading={isLoading} />;
}
