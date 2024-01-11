import { useForm } from 'react-hook-form';
import LoadingInButton from '../../LoadingInButton/LoadingInButton';
import useRipple from 'use-ripple-hook';

export default function SignUp({ props }) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [ripple, event] = useRipple();

  return (
    <>
      <form className='login-form' onSubmit={handleSubmit(props.createLogin)}>
        <input
          type='email'
          placeholder='email address'
          {...register('email', {
            onChange: (e) => props.setCreateEmail(e.target.value),
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
            onChange: (e) => props.setCreatePassword(e.target.value),
            required: 'Password is required',
            minLength: { value: 6, message: 'Password should be at least 6 characters' },
          })}
        />
        <p className='error'>{errors.password?.message}</p>

        <input
          type='password'
          placeholder='Password again'
          {...register('passwordAgain', {
            onChange: (e) => {
              props.setCreatePasswordAgain(e.target.value);
            },
            validate: (value) => value === props.createPassword || 'Password must be confirmed',
            required: 'Password is required',
          })}
        />
        <p className='error'>{errors.passwordAgain?.message}</p>

        <button ref={ripple} onPointerDown={event} className='form-btn' type='submit'>
          {props.loading ? <LoadingInButton /> : 'create'}
        </button>
        <p className='message'>
          Already registered?{' '}
          <span className='message-click' onClick={props.toggleForm}>
            Sign In
          </span>
        </p>
        <button onClick={props.closeModal} className='close-button'>
          Х
        </button>
      </form>
    </>
  );
}
