import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const toastAlert = (design, message) => {
  return toast[design](message, {
    position: 'bottom-left',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
