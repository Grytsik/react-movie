import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastAlert = (design, message) => {
    return toast[design](message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };