import { useGetCategoryQuery } from '../../store/dataSlice';
import MovieCard from './MovieCard';
import 'swiper/css';
import { useParams } from 'react-router-dom';

export default function MovieList({ props }) {
  const { category } = useParams();
  const { data, isLoading, isError } = useGetCategoryQuery(category);

  return <MovieCard data={data} isLoading={isLoading} isError={isError} />;
}
