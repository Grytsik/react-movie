import { useState } from 'react';
import { auth, provider } from '../../API/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import googleIcon from '../../img/google.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './Login.scss';

export default function Login({ closeModal, loginAccess }) {
  const [isLogin, setIsLogin] = useState(true);

  const [loginUp, setLoginUp] = useState('');
  const [passwordUp, setPasswordUp] = useState('');

  const [createPassword, setCreatePassword] = useState('');
  const [createPasswordAgain, setCreatePasswordAgain] = useState('');
  const [createEmail, setCreateEmail] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  console.log(auth.currentUser);

  const signWithGoogle = async (e) => {
    signInWithPopup(auth, provider)
      .then(() => {
        loginAccess();
        closeModal();
        toast.success(`Hi, ${auth.displayName || 'User'}!`, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginFunc = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, loginUp, passwordUp)
      .then(() => {
        loginAccess();
        closeModal();
        toast.success(`Hi, ${auth.displayName || 'User'}!`, {
          position: 'top-right',
          autoClose: 3000, // Закроется через 3 секунды
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createLogin = async (e) => {
    e.preventDefault();
    if (createEmail && createPassword === createPasswordAgain) {
      createUserWithEmailAndPassword(auth, createEmail, createPassword)
        .then(() => {
          loginAccess();
          closeModal();
          toast.success(`Hi, ${auth.displayName || 'User'}!`, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className='login-page'>
      <div className='form'>
        {isLogin ? (
          <form className='login-form'>
            <input
              type='email'
              onChange={(e) => setLoginUp(e.target.value)}
              placeholder='email'
              required
            />
            <input
              type='password'
              onChange={(e) => setPasswordUp(e.target.value)}
              placeholder='password'
              required
            />
            <button onClick={loginFunc}>login</button>

            <button className='button-with-google' onClick={signWithGoogle}>
              Continue with google
              <img className='google-img' src={googleIcon} alt='google' />
            </button>
            <p className='message'>
              Not registered?{' '}
              <a href='#' onClick={toggleForm}>
                Create an account
              </a>
            </p>
            <a onClick={closeModal} className='close-button'>
              Х
            </a>
          </form>
        ) : (
          <form className='login-form'>
            <input
              type='email'
              placeholder='email address'
              required
              onChange={(e) => setCreateEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='password'
              required
              onChange={(e) => setCreatePassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='password again'
              required
              onChange={(e) => setCreatePasswordAgain(e.target.value)}
            />

            <button onClick={createLogin}>Create</button>
            <p className='message'>
              Already registered?{' '}
              <a href='#' onClick={toggleForm}>
                Sign In
              </a>
            </p>
            <a onClick={closeModal} className='close-button'>
              Х
            </a>
          </form>
        )}
      </div>
    </div>
  );
}
