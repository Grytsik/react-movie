import { Link, useLocation } from 'react-router-dom';
import './Header.scss';
import { useState, useEffect } from 'react';
import { fallDown as Menu } from 'react-burger-menu';
import Loading from '../Loading/Loading';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [navigationKey, setNavigationKey] = useState('');

  const location = useLocation();

  useEffect(() => {
   const timeoutId = setTimeout(() => {
    setNavigationKey(location.pathname);
    setLoading(false);
    }, 1500)
    

    return () => {
      clearTimeout(timeoutId);
    }
  }, [location]);

  const toggleBurgerMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeBurgerMenu = () => {
    setMenuOpen(false);
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

  if(loading) return <Loading/>

  return (
    <div className='header'>
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
                <>
                  <li key={i} className='nav__item'>
                    <Link className='nav__link' to={e.path}>
                      {e.display}
                    </Link>
                  </li>
                </>
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
      </div>
    </div>
  );
}
