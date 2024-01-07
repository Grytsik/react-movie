import { useState } from 'react';
import { auth, provider } from '../../API/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { toastAlert } from '../../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn/SignIn';
import SignUp from './signUp/SignUp';

import './Login.scss';

export default function Login({ closeModal, loginAccess, user }) {
  const [isLogin, setIsLogin] = useState(true);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [createPassword, setCreatePassword] = useState('');
  const [createPasswordAgain, setCreatePasswordAgain] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const navigate = useNavigate();

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
          <SignIn
            loginFunc={loginFunc}
            setLoginEmail={setLoginEmail}
            setLoginPassword={setLoginPassword}
            signWithGoogle={signWithGoogle}
            closeModal={closeModal}
            toggleForm={toggleForm}
          />
        ) : (
          <SignUp
            createLogin={createLogin}
            setCreateEmail={setCreateEmail}
            setCreatePassword={setCreatePassword}
            setCreatePasswordAgain={setCreatePasswordAgain}
            toggleForm={toggleForm}
            closeModal={closeModal}
          />
        )}
      </div>
    </div>
  );
}
