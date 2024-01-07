import { useForm } from 'react-hook-form';

export default function SignUp({
  createLogin,
  setCreateEmail,
  setCreatePassword,
  setCreatePasswordAgain,
  toggleForm,
  closeModal,
}) {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  return (
    <>
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

        <button className='form-btn' type='submit'>Create</button>
        <p className='message'>
          Already registered?{' '}
          <span className='message-click' onClick={toggleForm}>
            Sign In
          </span>
        </p>
        <button onClick={closeModal} className='close-button'>
          Х
        </button>
      </form>
    </>
  );
}
