import { useParams } from 'react-router-dom';

import {
  useGetSelectMovieQuery,
  useGetActorsQuery,
  useGetVideoQuery,
  useGetImageForMovieQuery,
  useGetSimilarQuery,
} from '../../store/dataSlice';
import { APIposter500, APIbackdrop } from '../../API/API';
import { useEffect, useState } from 'react';
import { toastAlert } from '../../helpers/helpers';
import { auth, db } from '../../API/firebase';
import { collection, setDoc, getDocs, doc } from 'firebase/firestore';
import FadeIn from '../../Components/FadeIn/FadeIn';
import Loading from '../../Components/Loading/Loading';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import TrailerVideo from '../../Components/TrailerVideo/TrailerVideo';
import SelectMovieImage from '../../Components/SelectMovieImage/SelectMovieImage';
import Actors from '../../Components/Actors/Actors';
import SelectMovieLike from './SelectMovieLike';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import SlideMovieList from '../../Components/MovieCard/SlideMovieList/SlideMovieList';

import './SelectMovieCard.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';


function SelectMovieCard() {
  const { category, id } = useParams();
  const { data: selectData, isLoading: selectLoad } = useGetSelectMovieQuery({ category, id });
  const { data: videoData, isLoading: videoLoad } = useGetVideoQuery({ category, id });
  const { data: movieImageData } = useGetImageForMovieQuery({ category, id });
  const { data: actorsData, isLoading: actorsLoad } = useGetActorsQuery({ category, id });
  const { data: similarData, isFetching } = useGetSimilarQuery({ category, id });

  const [userLike, setUserLike] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [loading] = useState(false);
  const [similarClickLoad, setSimilarClickLoad] = useState(false);

  const collectionRef = collection(db, 'like');

  useEffect(() => {
    setSimilarClickLoad(true);
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
      setSimilarClickLoad(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    }
  },[selectData, id]);

  useEffect(() => {
    const getLike = async () => {
      const dataLike = await getDocs(collectionRef);
      setUserLike(dataLike.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLike();
  }, []);

  useEffect(() => {
    if (!loading) {
      const currentLike = userLike.find((like) => {
        return like.user_id === auth?.currentUser?.uid && like.movie_id === id;
      });
      setIsLiked(currentLike?.is_liked ?? false);
    }
  }, [userLike, loading, similarData]);

  const addLikeMovie = async (userId, likeMovieId) => {
    if (auth.currentUser) {
      const docRef = doc(collectionRef, likeMovieId);

      try {
        await setDoc(docRef, {
          user_id: userId,
          movie_id: likeMovieId,
          is_liked: !isLiked,
          category: category,
        });

        setIsLiked(!isLiked);
        toastAlert(
          'success',
          isLiked ? 'Movie removed from your favourites' : 'Movie added to your favourites'
        );
      } catch (error) {
        console.error('Error updating like:', error);
        toastAlert('error', 'Failed to update like');
      }
    } else {
      toastAlert('error', 'You need to login!');
    }
  };

  const officialTrailer = videoData?.results?.find(
    (video) => video?.name === 'Official Trailer' || video?.name === 'Trailer' || 'Main Trailer'
  );
  const videoKey = officialTrailer?.key;

  const actorsProfilePath = actorsData?.cast?.filter((item) => item?.profile_path !== null);
  const movieImageEn = movieImageData?.backdrops?.filter((item) => item?.iso_639_1 === null);

  if(similarClickLoad) return <Loading/>
  if (selectLoad && actorsLoad && videoLoad) return <Loading />;
  if (!selectData) {
    return <NotFoundPage />;
  }

  return (
    <>
      <FadeIn loading={selectLoad}>
        <div
          className='selectMovieCard'
          style={{ backgroundImage: `url(${APIbackdrop}${selectData?.backdrop_path})` }}></div>
        <div className='selectMovieCard__item container'>
          <img
            className='selectMovieCard-item__img'
            src={
              !selectData?.belongs_to_collection
                ? APIposter500 + selectData?.poster_path
                : APIposter500 + selectData?.belongs_to_collection.poster_path
            }
            alt='poster'
          />
          <div className='selectMovieCard__content'>
            <h2 className='selectMovieCard__title'>
              {selectData?.original_title || selectData?.original_name}
            </h2>
            <div className='selectMovieCard__genVote'>
              <div className='circular'>
                <ProgressBar data={selectData} />
              </div>
              <div className='selectMovieCard__genres'>
                {selectData?.genres?.map((item) => (
                  <p key={item?.id} className='selectMovieCard__genres-item'>
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
            <SelectMovieLike
              loading={loading}
              addLikeMovie={addLikeMovie}
              isLiked={isLiked}
              id={id}
            />
            <p className='selectMovieCard__overview'>{selectData?.overview}</p>
            <Actors actors={actorsProfilePath} />
          </div>
        </div>
        <TrailerVideo videoKey={videoKey} />
        <SelectMovieImage movieImageEn={movieImageEn} />
        <SlideMovieList
          title={'You may also like'}
          similarData={similarData}
          category={category}
          ifFetching={isFetching}
        />
      </FadeIn>
    </>
  );
}

export default SelectMovieCard;
