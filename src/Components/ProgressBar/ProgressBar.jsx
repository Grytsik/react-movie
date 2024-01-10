import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProgressBar.scss';

export default function ProgressBar({ data }) {
  return (
    <CircularProgressbar
      className='progress-bar select-progress-bar'
      value={data?.vote_average}
      text={data?.vote_average?.toFixed(1)}
      maxValue={10}
      styles={buildStyles({
        pathColor: '#7FD18C',
        textSize: '30px',
        trailColor: '#fff',
        textColor: '#fff',
        width: '10%',
      })}
    />
  );
}
