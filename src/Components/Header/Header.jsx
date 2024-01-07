import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../API/firebase';

import Login from '../Login/Login';
import { toastAlert } from '../../helpers/helpers';
import notPhotoImg from '../../img/anonymous.png';
import heartWhite from '../../img/heart-white.png';
import logoutImg from '../../img/logout.png';
import HeaderBurger from './HeaderBurger/HeaderBurger';

import './Header.scss';
import LoginModal from '../LoginModal/LoginModal';

export default function Header() {
  const [modalOpen, setIsModalOpen] = useState(false);
  const [navigationKey, setNavigationKey] = useState('');
  const [scrollingDown, setScrollingDown] = useState(false);
  const [user, setUser] = useState(null);
  const [activeDropDown, setActiveDropDown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setNavigationKey(location.pathname);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollingDown(scrollPosition > 60);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const headerNav = [
    {
      display: 'Home',
      path: '/',
    },
    {
      display: 'Movies',
      path: '/movie',
    },
    {
      display: 'TV Series',
      path: '/tv',
    },
    {
      display: 'Search',
      path: '/search',
    },
  ];

  const handleLogOut = async () => {
    await signOut(auth);
    localStorage.removeItem('user');
    closeModal();
    setUser(null);
    toastAlert('success', 'Goodbye! See you again!');
    navigate('/');
    setActiveDropDown(false);
  };

  const handleLinksClick = () => {
    setActiveDropDown(false);
  };

  const loginAccess = () => {
    const userData = auth.currentUser;
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const dropDownHandler = () => {
    setActiveDropDown(!activeDropDown);
  };

  return (
    <div className={`header ${scrollingDown ? 'scrolled' : ''}`}>
      <div className='container header__container'>
        <div className='header__item'>
          <h1 className='header__logo'>
            <Link to='/'>
              Movie<span className='span-red'>Nut</span>
            </Link>
          </h1>
          <nav className='nav'>
            <ul className='nav__list'>
              {headerNav.map((e, i) => (
                <div key={i}>
                  <li className='nav__item'>
                    <Link className='nav__link' to={e.path}>
                      {e.display}
                    </Link>
                  </li>
                </div>
              ))}
            </ul>
          </nav>

          {/* Burger Menu */}
          <HeaderBurger headerNav={headerNav} navigationKey={navigationKey} />
        </div>
        {user ? (
          <>
            <div className='header__profile' onClick={dropDownHandler}>
              <div className='header__profile-content'>
                <img className='header__login-img' src={user?.photoURL || notPhotoImg} alt='user' />
                <p className='header__login-profile'>{user?.displayName || 'Guest'}</p>
              </div>
            </div>
            <div className={`dropdown ${activeDropDown ? 'active' : ''}`}>
              <div className='dropdown__items'>
                <div className='dropdown-items__favourites'>
                  <img className='dropdown__heart logout' src={logoutImg} alt='logout' />
                  <button className='header__logOut' onClick={handleLogOut}>
                    Log out
                  </button>
                </div>
                <div className='dropdown-items__favourites' onClick={handleLinksClick}>
                  <img className='dropdown__heart' src={heartWhite} alt='heart' />
                  <Link to={'/profile'}>Favourites</Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <button className='header__login' onClick={openModal}>
            Login
          </button>
        )}
        <LoginModal
          loginAccess={loginAccess}
          modalOpen={modalOpen}
          closeModal={closeModal}
          user={user}
        />
      </div>
    </div>
  );
}
