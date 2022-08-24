import React, { useEffect,useState } from 'react'
import { Success } from '../../shared/components/Notification/Success'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import '../AssetItem/AssetItem.css'
import { useDeps } from "../../shared/context/DependencyContext";
import { Failed } from '../../shared/components/Notification/Failed';
import moment from 'moment'

export const AssetItem = () => {
  const [data, setData] = useState({});

  const [selectedImage, setSelectedImage] = useState();

  const[subProductName, setSubProductName] = useState([])
  const {assetItemService,vendorService,locationService,userService} = useDeps();
  

  useEffect(() => {
    onGetAllSubProduct();
    onGetAllVendor();
    onGetAllLocation();
  }, []);
  // GET ALL SUBPRODUCT NAME
  const onGetAllSubProduct = async () => {
    
    try {
      const response = await assetItemService.getAllAsset();
      console.log(response);
      setSubProductName(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      
    }
  };

  // GET ALL VENDOR
  const [vendor, setVendor] = useState([]);

  const onGetAllVendor = async () => {
    
    try {
      const response = await vendorService.getAllVendor();
      console.log(response);
      setVendor(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      
    }
  };

  // GET ALL LOCATIONS
  const [locations, setLocations] = useState([]);
  const onGetAllLocation = async () => {
    
    try {
      const response = await locationService.getAllLocation();
      console.log(response);
      setLocations(response.data);
      
    } catch (e) {
      console.log(e);
    } finally {
      
    }
  };

  // GET ALL USER
  const [user, setUser] = useState([]);
  const onGetUser = async()=>{
    try {
      const response = await userService.getUserByEmail();
      console.log('ini response email',response.data);
      setUser(response.data)
      
    } catch (error) {
    
    } finally {
      
    }
  }


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      data['Tahun'] = Number(data['Tahun'])
      data['Harga Perolehan'] = Number(data['Harga Perolehan'])
      data['Total Harga Perolehan'] = Number(data['Total Harga Perolehan'])
      data['Kode Wilayah'] = Number(data['Kode Wilayah'])
      data['Tahun Pembelian'] = Number(data['Tahun Pembelian'])
      data['Kode Urut barang'] = Number(data['Kode Urut barang'])
      data['Biaya Lain-Lain'] = Number(data['Biaya Lain-Lain'])
      data['BAST Output'] = moment((data['BAST Output'])).format()
      data['Tanggal Output'] = moment((data['Tanggal Output'])).format()
      const response = await assetItemService.createAsset(data);
      setData(response.data);
      console.log(response);
      Success('added')
      e.target.reset()
    } catch (error) {
      console.log(error.response);
      Failed();
      
    } finally {
      
    }
    
  }

  const handleCancel = (e) => {
    e.target.reset()
  }

  const clearForm = () => {
      setSelectedImage()
  }

  return (
    <>
        <Sidebar/>
        <form onSubmit={handleSubmit}>
          <div className='asset-form-container'>
            <div className='asset-form-box'>
              <label>Add Single Asset</label>
              <div className='asset-form'>
                <div className='asset-box-left'>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Asset Name</label>
                    <input type='text' className='form-control' required name='Nama Barang' value={data["Nama Barang"]} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Subproduct Name</label>
                    <select className='form-control' required name='Jenis Produk' value={data['Jenis Produk']} onChange={handleChange}>
                      <option value="" >Select Subproduct</option> 
                      {
                        subProductName.map((item)=>(
                          <option key={item.subproduct_name} value={item.subproduct_name} >{item.subproduct_name}</option>
                        ))
                      }
      
                    </select>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Vendor</label>
                    <select className='form-control' required name='Vendor' value={data.Vendor} onChange={handleChange}>
                    <option value="">Select Vendor</option>
                      
                      {
                        vendor.map((item)=>(
                          <option key={item.name} value={item.name} >{item.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Location</label>
                    <select className='form-control' required name='Kode Wilayah' value={data['Kode Wilayah']} onChange={handleChange}>
                    <option value="">Select Location</option>
                      {
                        locations.map((item,index)=>(
                          <option key={item.ID} value={item.ID} >{item.location}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Condition</label>
                    <select className='form-control' required name='Kondisi' value={data.Kondisi} onChange={handleChange}>
                    <option value="">Select Condition</option>
                      <option>Baik</option> 
                      <option>Rusak</option>
                      <option>Other</option>                 
                    </select>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>PO Number</label>
                    <input type='text' className='form-control' required name='No. PO / Dokumenen Pendukung' value={data['No. PO / Dokumenen Pendukung']} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Purchase Date</label>
                    <input type='datetime-local' className='form-control' required name='Tanggal Output' value={data['Tanggal Output']} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>BAST</label>
                    <input type='datetime-local' className='form-control' required name='BAST Output' value={data['BAST Output']} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Purchase Price</label>
                    <input type='text' className='form-control' required name='Harga Perolehan' value={data['Harga Perolehan']} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Additional Cost</label>
                    <input type='text' className='form-control' required name='Biaya Lain-Lain' value={data['Biaya Lain-Lain']} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Total Acquisition Cost</label>
                    <input type='text' className='form-control' required name='Total Harga Perolehan' value={data['Total Harga Perolehan']} onChange={handleChange}/>
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
                    <label className='label-tabel'>Purchase Year</label>
                    <input type='year' className='form-control' required name='Tahun Pembelian' value={data['Tahun Pembelian']} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>User</label>
                    <input type='text' className='form-control' required name='User' value={data.User} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Initial</label>
                    <input type='text' className='form-control' required name='Initisal' value={data['Initisal']} onChange={handleChange}/>
                  </div>
                  
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Asset Code</label>
                    <select className='form-control' required name='Kode Asset' value={data['Kode Asset']} onChange={handleChange}>
                      <option value="" >Select Asset Code</option> 
                      {
                        subProductName.map((item)=>(
                          <option key={item.subproduct_name} value={item.product_code} >{item.subproduct_name}-{item.product_code}</option>
                        ))
                      }
      
                    </select>
  
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Year</label>
                    <input type='year' className='form-control' required name='Tahun' value={data.Tahun} onChange={handleChange}/>
                  </div>
                  <div className='asset-form-input'>
                    <label className='label-tabel'>Item Order Code</label>
                    <input type='text' className='form-control' required name='Kode Urut barang' value={data['Kode Urut barang']} onChange={handleChange}/>
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