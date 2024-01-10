import { useForm } from 'react-hook-form';
import googleIcon from '../../../img/google.png';
import useRipple from 'use-ripple-hook';
import LoadingInButton from '../../LoadingInButton/LoadingInButton';

export default function SignIn({ props }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [ripple, event] = useRipple();

  return (
    <>
      <form className='login-form' onSubmit={handleSubmit(props.loginFunc)}>
        <input
          placeholder='Email'
          {...register('email', {
            onChange: (e) => props.setLoginEmail(e.target.value),
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
            onChange: (e) => props.setLoginPassword(e.target.value),
            required: 'Password is required',
            minLength: { value: 6, message: 'Password should be at least 6 characters' },
          })}
        />
        <p className='error'>{errors.password?.message}</p>
        <button ref={ripple} onPointerDown={event} className='form-btn' type='submit'>
          {props.loading ? <LoadingInButton /> : 'Login'}
        </button>

        <button className='form-btn' onClick={props.signWithGoogle}>
          Continue with google
          <img className='google-img' src={googleIcon} alt='google' />
        </button>
        <p className='message'>
          Not registered?{' '}
          <span className='message-click' onClick={props.toggleForm}>
            Create an account
          </span>
        </p>
        <button onClick={props.closeModal} className='close-button'>
          Х
        </button>
      </form>
    </>
  );
}
