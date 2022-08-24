import React, { useState } from 'react'
import { Success } from '../../shared/components/alert/Success'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import '../AssetItem/AssetItem.css'
export const AssetItem = () => {
  const [data, setData] = useState({
    name: '',
    assetCategory: '',
    productName: '',
    subproductName: '',
    vendor: '',
    location: '',
    condition: '',
    poNumber: '',
    purchasePrice:'',
    purchaseDate: '',
    otherExpenses: '',
    user: '',
    position: '',
    initial: '',
    locationCode:'',
    assetCode: '',
    year: '',
    itemOrderCode: ''
  });

  const [selectedImage, setSelectedImage] = useState();

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const handleChange = (e) => {
    const newData = {...data}
    newData[e.target.name] = e.target.value
    setData(newData)
    console.log(newData);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Success('added');
    clearForm();
  }

  const handleCancel = () => {
    clearForm();
  }

  const clearForm = () => {
      setData({
        name: '',
        assetCategory: '',
        productName: '',
        subproductName: '',
        vendor: '',
        location: '',
        condition: '',
        poNumber: '',
        purchasePrice:'',
        purchaseDate: '',
        otherExpenses: '',
        user: '',
        position: '',
        initial: '',
        locationCode:'',
        assetCode: '',
        year: '',
        itemOrderCode: ''
      });
      setSelectedImage()
  }

  return (
    <>
        <Sidebar/>
        <form onSubmit={handleSubmit}>
          <div className='App asset-form-container'>
            <div className='asset-form-box'>
              <label>Add Single Asset</label>
              <div className='asset-form'>
                <div className='asset-box-left'>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Asset Name</label>
                    <input type='text' className='form-control' required name='name' value={data.name} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Asset Category</label>
                    <select className='form-control' required name='assetCategory' value={data.assetCategory} onChange={handleChange}>
                      <option value='assetTetapBangunan'>Asset Tetap - Bangunan</option>
                      <option value='assetTetapKendaraan'>Asset Tetap - Kendaraan</option>
                      <option value='assetTetapFurniture'>Asset Tetap - Furniture</option>
                    </select>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Product Name</label>
                    <select className='form-control' required name='productName' value={data.productName} onChange={handleChange}>
                      <option value='a'>A</option>
                      <option value='b'>B</option>
                      <option value='c'>C</option>
                    </select>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Subproduct Name</label>
                    <select className='form-control' required name='subproductName' value={data.subproductName} onChange={handleChange}>
                      <option value='a'>A</option>
                      <option value='b'>B</option>
                      <option value='c'>C</option>
                    </select>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Vendor</label>
                    <select className='form-control' required name='vendor' value={data.vendor} onChange={handleChange}>
                      <option value='a'>A</option>
                      <option value='b'>B</option>
                      <option value='c'>C</option>
                    </select>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Location</label>
                    <select className='form-control' required name='location' value={data.location} onChange={handleChange}>
                      <option value='a'>A</option>
                      <option value='b'>B</option>
                      <option value='c'>C</option>
                    </select>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Condition</label>
                    <input type='text' className='form-control' required name='condition' value={data.condition} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>PO Number</label>
                    <input type='text' className='form-control' required name='poNumber' value={data.poNumber} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Purchase Price</label>
                    <input type='number' className='form-control' required name='purchasePrice' value={data.purchasePrice} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Purchase Date</label>
                    <input type='date' className='form-control' required name='purchaseDate' value={data.purchaseDate} onChange={handleChange}/>
                  </div>
                </div>
                <div className='asset-box-right'>
                  <div className='asset-image-container'>
                    <div className='image-box'>
                        {selectedImage && (<div className='image'> <img src={URL.createObjectURL(selectedImage)}
                          className='image' alt='Thumb'/>
                          <button onClick={removeSelectedImage} className='cancel'>Remove the image</button>
                          </div>
                        )}
                    </div>
                    <input accept='image/*' type='file' onChange={imageChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Other Expenses</label>
                    <input type='text' className='form-control' required name='otherExpenses' value={data.otherExpenses} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>User</label>
                    <input type='text' className='form-control' required name='user' value={data.user} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Position</label>
                    <input type='text' className='form-control' required name='position' value={data.position} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Initial</label>
                    <input type='text' className='form-control' required name='initial' value={data.initial} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Location Code</label>
                    <input type='text' className='form-control' required name='locationCode' value={data.locationCode} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Asset Code</label>
                    <input type='text' className='form-control' required name='assetCode' value={data.assetCode} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Year</label>
                    <input type='year' className='form-control' required name='year' value={data.year} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Item Order Code</label>
                    <input type='text' className='form-control' required name='itemOrderCode' value={data.itemOrderCode} onChange={handleChange}/>
                  </div>
                </div>
                </div>
                <div className='button-asset'>
                  <button type='submit' className='btn btn-danger button-cancel' onClick={handleCancel}>Cancel</button>
                  <button type='submit' className='btn btn-primary button-submit'>Submit</button>
                </div>
            </div>
          </div>
        </form>
        
    </>
    
  )
}