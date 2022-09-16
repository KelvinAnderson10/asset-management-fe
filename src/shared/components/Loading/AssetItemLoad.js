import './AssetItemLoading.css';
import gif from '../../../assets/images/loadinggif.gif'

function AssetLoading() {
  return (
    <div className='App'>
      <div className='assetloadingScreen'>
        <div className='assetloadingContainer'>
          <img className='gif' width="250px" height="250px" src={gif}></img>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default AssetLoading;