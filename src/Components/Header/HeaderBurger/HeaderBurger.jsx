import { Link} from 'react-router-dom';
import { useState } from 'react';
import { fallDown as Menu } from 'react-burger-menu';

export default function HeaderBurger({ headerNav, navigationKey }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeBurgerMenu = () => {
    setMenuOpen(false);
  };
  return (
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
  );
}
