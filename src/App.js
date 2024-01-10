import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import RouteComponent from './Components/RouteComponent/RouteComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.scss';

export default function App() {
  return (
    <div className='app'>
      <ToastContainer/>
      <Header />
      <div className='content-wrapper'>
        <RouteComponent />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
