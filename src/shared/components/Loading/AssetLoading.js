import './AssetLoading.css';
import gif from '../../../assets/images/loadinggif.gif'

function AssetLoading() {
  return (
    <div className='App'>
      <div className='assetloadingoverviewScreen'>
        <div className='assetloadingoverviewContainer'>
          <img className='gif' width="250px" height="250px" src={gif}></img>
          <p>Loading...</p>
        </div>
      </div>
    </div>
  );
}

export default AssetLoading;