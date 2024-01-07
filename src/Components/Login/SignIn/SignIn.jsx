import { useForm } from 'react-hook-form';
import googleIcon from '../../../img/google.png';

export default function SignIn({
  loginFunc,
  setLoginEmail,
  setLoginPassword,
  signWithGoogle,
  closeModal,
  toggleForm,
}) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  return (
    <>
      <form className='login-form' onSubmit={handleSubmit(loginFunc)}>
        <input
          placeholder='Email'
          {...register('email', {
            onChange: (e) => setLoginEmail(e.target.value),
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
            onChange: (e) => setLoginPassword(e.target.value),
            required: 'Password is required',
            minLength: { value: 6, message: 'Password should be at least 6 characters' },
          })}
        />
        <p className='error'>{errors.password?.message}</p>
        <button className='form-btn' type='submit'>
          login
        </button>
        <button className='form-btn' onClick={signWithGoogle}>
          Continue with google
          <img className='google-img' src={googleIcon} alt='google' />
        </button>
        <p className='message'>
          Not registered?{' '}
          <span className='message-click' onClick={toggleForm}>
            Create an account
          </span>
        </p>
        <button onClick={closeModal} className='close-button'>
          Х
        </button>
      </form>
    </>
  );
}
