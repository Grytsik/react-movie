import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

import './SearchBar.scss';


export default function SearchBar() {
  const [value, setValue] = useState('');
  const [searchCategory, setSearchCategory] = useState('movie');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const timerId = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  if (loading) return <Loading />;

  const handleSearch = () => {
    if (value !== '') {
      navigate(`/search/${searchCategory}/${value.trim().replace(/\s{2,}/g, ' ')}`);
      setValue('');
    }
  };

  const handleCategory = (category) => {
    setSearchCategory(category === '' ? 'movie' : category);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <div className='searchBar'>
        <div className='container'>
          <div className='searchBar__categoryBtn'>
            <button
              className={`categoryBtn-item ${searchCategory === 'movie' ? 'active' : ''}`}
              onClick={() => handleCategory('movie')}>
              Movie
            </button>
            <button
              className={`categoryBtn-item ${searchCategory === 'tv' ? 'active' : ''}`}
              onClick={() => handleCategory('tv')}>
              Tv
            </button>
          </div>
          <input
            className='searchBar__input'
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder='Search MovieNut'
          />
          <button className='searchBar__btn' onClick={handleSearch}>SEARCH</button>
        </div>
      </div>
    </>
  );
}
