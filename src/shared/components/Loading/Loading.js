import './Loading.css';
import gif from '../../../assets/images/loadinggif.gif'

function Loading() {
  return (
    <div className='App'>
      <div className='loadingScreen'>
        <div className='loadingContainer'>
          <img className='gif' width="250px" height="250px" src={gif}></img>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;