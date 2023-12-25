import Header from './Components/Header/Header';

import './App.scss';
import Footer from './Components/Footer/Footer';
import RouteComponent from './Components/RouteComponent/RouteComponent';
import { useGetTrandingSliderQuery } from './store/dataSlice';
import Loading from './Components/Loading/Loading';
export default function App() {
  // const loading = useSelector((state) => state.data.loading);

  return (
    <div className='app'>
      <Header />
      <div className='content-wrapper'>
        <RouteComponent />
      </div>
      <Footer />
    </div>
  );
}
