import './UploadLoading.css';
import gif from '../../../assets/images/loadinggif.gif'

function UploadLoading() {
  return (
    <div className='App'>
        <div className=''>
      <div className='uploadloadingScreen'>
        <div className='uploadloadingContainer'>
          <img className='gif' width="250px" height="250px" src={gif}></img>
          <p>Loading...</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default UploadLoading;