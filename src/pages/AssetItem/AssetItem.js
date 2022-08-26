import React, { useEffect,useState } from 'react'
import { Success } from '../../shared/components/Notification/Success'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { useDeps } from "../../shared/context/DependencyContext";
import { Failed } from '../../shared/components/Notification/Failed';
import moment from 'moment'
import './AssetItem.css'

export const AssetItem= () => {
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
      clearForm();
    } catch (error) {
      console.log(error.response);
      Failed();
    } finally {
      e.target.reset();
    }
    
  }

  const handleCancel = (e) => {
    e.target.reset()
  }

  const clearForm = () => {
    setData({})
      setSelectedImage()
  }

  return (
    <div>
        <Sidebar/>
        <div className='main-container'>
        <div className="asset-container">

<form onSubmit={handleSubmit}>

    <div className="row">

        <div className="col">

            <h3 className="title">Add Asset Item</h3>

            <div className="inputBox">
                <span>Asset Name :</span>
                <input type='text' required name='Nama Barang' value={data["Nama Barang"]} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                <span>Subproduct Name :</span>
                <select required name='Jenis Produk' value={data['Jenis Produk']} onChange={handleChange}>
                      <option value="" >Select Subproduct</option> 
                      {
                        subProductName.map((item)=>(
                          <option key={item.subproduct_name} value={item.subproduct_name} >{item.subproduct_name}</option>
                        ))
                      }
      
                    </select>
            </div>
            <div className="inputBox">
                <span>Vendor :</span>
                <select required name='Vendor' value={data.Vendor} onChange={handleChange}>
                    <option value="">Select Vendor</option>
                      
                      {
                        vendor.map((item)=>(
                          <option key={item.name} value={item.name} >{item.name}</option>
                        ))
                      }
                    </select>
            </div>
            <div className="inputBox">
                <span>Location :</span>
                <select required name='Kode Wilayah' value={data['Kode Wilayah']} onChange={handleChange}>
                    <option value="">Select Location</option>
                      {
                        locations.map((item,index)=>(
                          <option key={item.ID} value={item.ID} >{item.location}</option>
                        ))
                      }
                    </select>
            </div>
            <div className="inputBox">
                <span>Condition :</span>
                <select  required name='Kondisi' value={data.Kondisi} onChange={handleChange}>
                    <option value="">Select Condition</option>
                      <option>Baik</option> 
                      <option>Rusak</option>
                      <option>Other</option>                 
                    </select>
            </div>
            <div className="inputBox">
                <span>PO Number :</span>
                <input type='text' required name='No. PO / Dokumenen Pendukung' value={data['No. PO / Dokumenen Pendukung']} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                <span>Purchase Date :</span>
                <input type='datetime-local' required name='Tanggal Output' value={data['Tanggal Output']} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                <span>BAST :</span>
                <input type='datetime-local'  required name='BAST Output' value={data['BAST Output']} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                <span>Purchase Price :</span>
                <input type='number' required name='Harga Perolehan' value={data['Harga Perolehan']} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                <span>Additional Cost :</span>
                <input type='number'  required name='Biaya Lain-Lain' value={data['Biaya Lain-Lain']} onChange={handleChange}/>
            </div>
            
            
        </div>
        <div className="col">
        <div className='asset-image-container'>
                    <div className='image-box'>
                        {selectedImage && (<div className='image'> <img src={URL.createObjectURL(selectedImage)}
                          className='image' alt='Thumb'/>
                          <button onClick={removeSelectedImage} className='cancel'>Remove the image</button>
                          </div>
                        )}
                    </div>
                    <input id="upload"  accept='image/*' type='file' onChange={imageChange}/>
                   
        </div>
        <div className="inputBox">
                <span>Total Acquisition Cost :</span>
                <input type='text'required name='Total Harga Perolehan' value={data['Total Harga Perolehan']} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                <span>Insurance</span>
                <select  required name='Insurance' value={data.Insurance} onChange={handleChange}>
                    <option value="">Select</option>
                      <option>Sudah</option> 
                      <option>Belum</option>                 
                    </select>
            </div>
            
            <div className="inputBox">
                <span>Purchase Year :</span>
                <input type='number' required name='Tahun Pembelian' value={data['Tahun Pembelian']} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                <span>User :</span>
                <input type='text' required name='User' value={data.User} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                <span>Initisal :</span>
                <input type='text' required name='Initisal' value={data['Initisal']} onChange={handleChange}/>
            </div>
            <div className="inputBox">
                {/* <span>Asset Code :</span>
                <select required name='Kode Asset' value={data['Kode Asset']} onChange={handleChange}>
                      <option value="" >Select Asset Code</option> 
                      {
                        subProductName.map((item)=>(
                          <option key={item.subproduct_name} value={item.product_code} >{item.subproduct_name}-{item.product_code}</option>
                        ))
                      }
                      </select> */}
                <div className="inputBox">
                <span>Year :</span>
                <input type='number'  required name='Tahun' value={data.Tahun} onChange={handleChange}/>
            </div>

            <div className="inputBox">
                <span>Item Order Code :</span>
                <input type='text'  required name='Kode Urut barang' value={data['Kode Urut barang']} onChange={handleChange}/>
            </div>
            </div>
            <div className='button-asset'>
                  <button type='submit' className='btn btn-danger button-cancel' onClick={handleCancel}>Cancel</button>
                  <button type='submit' className='btn btn-primary button-submit'>Submit</button>
                </div>      
        </div>
        
    </div>

    
                  
  
</form>

</div> 
</div>
</div>
  )
}