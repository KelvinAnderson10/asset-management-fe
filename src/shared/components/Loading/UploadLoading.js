import './UploadLoading.css';
import Lottie from "lottie-react"
import loadingLottie from '../../../assets/images/loading.json'

function UploadLoading() {
  return (
    <div className='App'>
        <div className=''>
      <div className='uploadloadingScreen'>
        <div className='uploadloadingContainer'>
        <Lottie animationData={loadingLottie} loop={true} style={{width:'250px',height:'250px'}} />
          <p>Loading...</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default UploadLoading;