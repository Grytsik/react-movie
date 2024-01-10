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

export default function Login({ closeModal, loginAccess}) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

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
    setLoading(true)
    signInWithPopup(auth, provider)
      .then(() => {
        setLoading(false);
        loginAccess();
        closeModal();
        toastAlert('success', `Hi, glad to see you!`);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const loginFunc = async () => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        setLoading(false)
        loginAccess();
        closeModal();
        toastAlert('success', 'Hello, welcome back!');
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        toastAlert('error', 'Check the correctness of the entered data');
      });
  };

  const createLogin = async (e) => {
    if (createEmail && createPassword === createPasswordAgain) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, createEmail, createPassword)
        .then(() => {
          setLoading(false);
          loginAccess();
          closeModal();
          toastAlert('success', `Hi, glad to see you!`);
          navigate('/');
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          toastAlert('error', error.message);
        });
    }
  };

  return (
    <div className='login-page'>
      <div className='form'>
        {isLogin ? (
          <SignIn
            props={{
              loginFunc,
              setLoginEmail,
              setLoginPassword,
              signWithGoogle,
              closeModal,
              toggleForm,
              loading,
            }}
          />
        ) : (
          <SignUp
            props={{
              createLogin,
              setCreateEmail,
              setCreatePassword,
              setCreatePasswordAgain,
              toggleForm,
              closeModal,
              loading,
            }}
          />
        )}
      </div>
    </div>
  );
}
