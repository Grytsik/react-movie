import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fallDown as Menu } from 'react-burger-menu';
import { signOut } from 'firebase/auth';
import { auth } from '../../API/firebase';
import Loading from '../Loading/Loading';
import Modal from 'react-modal';
import Login from '../Login/Login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Header.scss';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [navigationKey, setNavigationKey] = useState('');
  const [scrollingDown, setScrollingDown] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  console.log(user);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setNavigationKey(location.pathname);
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollingDown(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [auth.currentUser]);

  const toggleBurgerMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeBurgerMenu = () => {
    setMenuOpen(false);
  };

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

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
    toast.success('Goodbye! See you again!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const loginAccess = () => {
    const userData = auth.currentUser;
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  Modal.setAppElement('#root');

  if (loading) return <Loading />;

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
          <Menu
            width={300}
            isOpen={menuOpen}
            onOpen={toggleBurgerMenu}
            onClose={toggleBurgerMenu}
            key={navigationKey}
            onStateChange={({ isOpen }) =>
              isOpen
                ? document.body.classList.add('no-scroll')
                : document.body.classList.remove('no-scroll')
            }
            className='burger-menu'>
            <div className='burger-menu--content'>
              <div className='burger-menu--title'>
                Movie<span className='span-red'>Nut</span>
              </div>
              <h3 className='burger-menu--subtitle'>Menu</h3>
              <ul className='nav__list burger-list'>
                {headerNav.map((e, i) => (
                  <li key={i} className='nav__item burger-item'>
                    <Link onClick={closeBurgerMenu} className='nav__link burger-link' to={e.path}>
                      {e.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Menu>
        </div>
        {user ? (
          <>
            <Link to={'/profile'}>
              <p className='header__login-profile'>{user?.displayName || user?.email}</p>
            </Link>
            <button className='header__login' onClick={handleLogOut}>
              Log out
            </button>
          </>
        ) : (
          <button className='header__login' onClick={openModal}>
            Login
          </button>
        )}
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Example Modal'>
          <Login closeModal={closeModal} loginAccess={loginAccess} />
        </Modal>
      </div>
    </div>
  );
}
