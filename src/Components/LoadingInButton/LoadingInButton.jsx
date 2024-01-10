import ReactLoading from 'react-loading';
import './LoadingInButton.scss';

export default function LoadingInButton() {
  return (
    <div className='ripple-container'>
      <ReactLoading type='spin' color='white' width={20} height={20} />
    </div>
  );
}
