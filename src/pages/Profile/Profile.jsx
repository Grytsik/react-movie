import { auth, db } from '../../API/firebase';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useGetSelectMovieQuery } from '../../store/dataSlice';
import ProfileFavourite from './ProfileFavourite';

import './Profile.scss';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [filteredMovie, setFilteredMovie] = useState([]);
  const collectionRef = collection(db, 'like');

  useEffect(() => {
    const getFavouriteData = async () => {
      const profileData = await getDocs(collectionRef);
      setProfile(profileData.docs.map((doc) => ({ ...doc.data() })));
    };

    getFavouriteData();
  }, []);

  useEffect(() => {
    const filterMovie = () => {
      if (auth.currentUser) {
        const filtered = profile.filter(
          (item) => item.user_id === auth.currentUser.uid && item.is_liked === true
        );
        setFilteredMovie(filtered);
      }
    };
    filterMovie();
  }, [profile]);

  console.log(filteredMovie);

  return (
    <div className='profile'>
      <div className='container'>
        <h1 className='profile__title'>Favourites: {filteredMovie.length}</h1>
      </div>

      <div className='profile__container'>
        {filteredMovie &&
          filteredMovie.map((item, index) => (
            <ProfileFavourite key={index} category={item.category} id={item.movie_id} />
          ))}
      </div>
    </div>
  );
}
