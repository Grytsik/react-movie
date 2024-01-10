import { auth, db } from '../../API/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toastAlert } from '../../helpers/helpers';
import ProfileFavourite from './ProfileFavourite';

import './Profile.scss';

export default function Profile() {
  const [filteredMovie, setFilteredMovie] = useState([]);
  const collectionRef = collection(db, 'like');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getDocs(collectionRef);
        const profileArray = profileData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        if (auth.currentUser) {
          setFilteredMovie(
            profileArray.filter(
              (item) => item.user_id === auth.currentUser.uid && item.is_liked === true
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [auth.currentUser]);

  const deleteMovie = async (id) => {
    try {
      const delDoc = doc(db, 'like', id);
      await deleteDoc(delDoc);

      const deleteFavourite = filteredMovie.filter((item) => item.movie_id !== id);
      setFilteredMovie(deleteFavourite);

      toastAlert('success', 'Movie removed from your favourites!');
    } catch (error) {
      console.log(error);
      toastAlert('error', 'Failed to delete movie!');
    }
  };

  return (
    <div className='profile'>
      <div className='container'>
        <h1 className='profile__title'>Favourites: {filteredMovie.length}</h1>
      </div>

      <div className='profile__container'>
        {filteredMovie &&
          filteredMovie.map((item, index) => (
            <ProfileFavourite
              deleteMovie={deleteMovie}
              key={index}
              category={item.category}
              id={item.movie_id}
            />
          ))}
      </div>
    </div>
  );
}
