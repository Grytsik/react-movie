import { useState } from 'react';
import { auth, provider } from '../../API/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { toastAlert } from '../../helpers/helpers';
import googleIcon from '../../img/google.png';
import { useNavigate } from 'react-router-dom';

import './Login.scss';

export default function Login({ closeModal, loginAccess, user }) {
  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [createPassword, setCreatePassword] = useState('');
  const [createPasswordAgain, setCreatePasswordAgain] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const signWithGoogle = async (e) => {
    signInWithPopup(auth, provider)
      .then(() => {
        loginAccess();
        closeModal();
        toastAlert('success', `Hi, glad to see you!`);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginFunc = async (e) => {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        loginAccess();
        closeModal();
        toastAlert('success', 'Hello, welcome back!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        toastAlert('warning', 'Check the correctness of the entered data');
      });
  };

  const createLogin = async (e) => {
    if (createEmail && createPassword === createPasswordAgain) {
      createUserWithEmailAndPassword(auth, createEmail, createPassword)
        .then(() => {
          loginAccess();
          closeModal();
          toastAlert('success', `Hi, glad to see you!`);
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          toastAlert('warning', error.message);
        });
    }
  };

  return (
    <div className='login-page'>
      <div className='form'>
        {isLogin ? (
          <form className='login-form' onSubmit={handleSubmit(loginFunc)}>
            <input
              placeholder='Email'
              {...register('email', {
                onChange: (e) => setLoginEmail(e.target.value),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <p className='error'>{errors.email?.message}</p>

            <input
              type='password'
              placeholder='password'
              {...register('password', {
                onChange: (e) => setLoginPassword(e.target.value),
                minLength: { value: 6, message: 'Password should be at least 6 characters' },
              })}
            />
            <p className='error'>{errors.password?.message}</p>
            <button type='submit'>login</button>
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
          <form className='login-form' onSubmit={handleSubmit(createLogin)}>
            <input
              type='email'
              placeholder='email address'
              {...register('email', {
                onChange: (e) => setCreateEmail(e.target.value),
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            <p className='error'>{errors.email?.message}</p>

            <input
              type='password'
              placeholder='password'
              {...register('password', {
                onChange: (e) => setCreatePassword(e.target.value),
                required: 'Password is required',
                minLength: { value: 6, message: 'Password should be at least 6 characters' },
              })}
            />
            <p className='error'>{errors.password?.message}</p>

            <input
              type='passwordAgain'
              placeholder='password again'
              {...register('passwordAgain', {
                onChange: (e) => setCreatePasswordAgain(e.target.value),
                required: 'Password is required',
                minLength: { value: 6, message: 'Password should be at least 6 characters' },
              })}
            />
            <p className='error'>{errors.passwordAgain?.message}</p>

            <button type='submit'>Create</button>
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
