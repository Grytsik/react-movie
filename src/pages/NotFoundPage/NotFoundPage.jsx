import { useParams } from "react-router-dom";

import './NotFoundPage.scss';

function NotFoundPage() {

  return <div className="notFoundPage">
    <h1 className="notFoundPage__title">We not found this page</h1>
    <span className='notFoundPage-error_span'>¯\_(ツ)_/¯</span>
  </div>;
}

export default NotFoundPage;
