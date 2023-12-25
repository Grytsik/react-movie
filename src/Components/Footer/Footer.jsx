import telega from '../../img/telegram.png';
import gitHub from '../../img/github.png';

import './Footer.scss';
import '../../App.scss';

export default function Footer() {
  return (
    <footer>
      <div className='container footer__container'>
        <div className='footer__item'>
          <div className='header__logo'>
            Movie<span className='span-red'>Nut</span>
          </div>
        </div>
        <div className='footer__item'>
          <p className='footer__copyright'>copyright © 2023 all rights reserved.</p>
        </div>
        <div className='footer__item'>
          <div className='footer__social'>

            <a href='https://t.me/gritsyk' target='_blank'>
              <img className='footer__social-link' src={telega} alt='telegram' />
            </a>
            <a href='https://github.com/Grytsik' target='_blank'>
              <img className='footer__social-link' src={gitHub} alt='github' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
