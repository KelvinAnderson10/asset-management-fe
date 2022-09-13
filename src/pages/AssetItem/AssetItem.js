import React, { useEffect, useRef, useState } from "react";
import { Success } from "../../shared/components/Notification/Success";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import { Failed } from "../../shared/components/Notification/Failed";
import moment from "moment";
import "./AssetItem.css";
import Loading from "../../shared/components/Loading/Loading";
import UploadLoading from "../../shared/components/Loading/UploadLoading";
import AssetLoading from "../../shared/components/Loading/AssetItemLoad";
import { EVENT } from "../../shared/constants";
import { useAuth } from "../../services/UseAuth";

export const AssetItem = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState();
  const [imageBase64, setImageBase64] = useState("")
  let reader = new FileReader();
  const [subProductName, setSubProductName] = useState([]);
  const { assetItemService, vendorService, locationService, eventLogService } =
    useDeps();
  const ref = useRef(null)

  useEffect(() => {
    onGetAllSubProduct();
    onGetAllVendor();
    onGetAllLocation();
    onGetCookie()
  }, []);
  // GET ALL SUBPRODUCT NAME
  const onGetAllSubProduct = async () => {
    try {
      const response = await assetItemService.getAllAsset();
     
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
     
      setLocations(response.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {setImageBase64(reader.result)}
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
    ref.current.value = '';
  };

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
    console.log(newData)
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      data["Harga Perolehan"] = Number(data["Harga Perolehan"]);
      data["Kode Wilayah"] = Number(data["Kode Wilayah"]);
      data["Kode Urut barang"] = Number(data["Kode Urut barang"]);
      data["Biaya Lain-Lain"] = Number(data["Biaya Lain-Lain"]);
      data["BAST Output"] = moment(data["BAST Output"]).format();
      data["Tanggal Output"] = moment(data["Tanggal Output"]).format();
      data["Asset Image"] = imageBase64;
      data["PPN"] = Number(data["PPN"]);

      const response = await assetItemService.createAsset(data);
      setData(response.data);
      
      Success("added");
      let event = {
        event: EVENT.CREATE_ASSET,
        user: userEvent.name
      }
      createEventLogAssetItem(event)
      console.log('lala',event);
      clearForm();
    } catch (error) {
      console.log(error.response);
      Failed(error.response.data.error.Detail);
    } finally {
      e.target.reset();
      setIsLoading(false)
    }
  };

  const handleCancel = (e) => {
    clearForm();
  };

  const clearForm = () => {
    setData({});
    setSelectedImage();
  };

  // EVENT LOG
  const [event, setEvent] = useState({})
  const createEventLogAssetItem = async (eventLoc) => {
    try {
      const response = await eventLogService.createEventLog(eventLoc)
      setEvent(response.data)
    } catch (e) {
      console.log(e);
    }
  }

  //Get User
  const { getCookie } = useAuth();
  const[userEvent,setUserEvent]= useState({
    name:'',
    position:'',
    role:'',
  })
  const onGetCookie = ()=>{
  
    let savedUserJsonString = getCookie("user")
    let savedUser = JSON.parse(savedUserJsonString)
    setUserEvent(prevObj=>({...prevObj,name:(savedUser.name),position:(savedUser.position), role:(savedUser.role)}))
  
    console.log(userEvent.name)
  }

  return (
    <>
      <Sidebar>
        <div className="asset-container">
          <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className="row">
              <div className="col">
                <h3 className="title">Add Asset Item</h3>

                <div className="inputBox">
                  <span>Asset Name :</span>
                  <input
                    type="text"
                    required
                    name="Nama Barang"
                    value={data["Nama Barang"]}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  />
                </div>
                <div className="inputBox">
                  <span>Subproduct Name :</span>
                  <select
                    required
                    name="Jenis Produk"
                    value={data["Jenis Produk"]}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  >
                    <option value="">Select Subproduct</option>
                    {subProductName.map((item) => (
                      <option
                        key={item.subproduct_name}
                        value={item.subproduct_name}
                      >
                        {item.subproduct_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="inputBox">
                  <span>Vendor :</span>
                  <select
                    required
                    name="Vendor"
                    value={data.Vendor}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  >
                    <option value="">Select Vendor</option>

                    {vendor.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="inputBox">
                  <span>Location :</span>
                  <select
                    required
                    name="Kode Wilayah"
                    value={data["Kode Wilayah"]}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  >
                    <option value="">Select Location</option>
                    {locations.map((item, index) => (
                      <option key={item['kode wilayah']} value={item["kode wilayah"]}>
                        {item.location}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="inputBox">
                  <span>Condition :</span>
                  <select
                    required
                    name="Kondisi"
                    value={data.Kondisi}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  >
                    <option value="">Select Condition</option>
                    <option>Baik</option>
                    <option>Rusak</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="inputBox">
                  <span>PO Number :</span>
                  <input
                    type="text"
                    required
                    name="No. PO / Dokumenen Pendukung"
                    value={data["No. PO / Dokumenen Pendukung"]}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  />
                </div>
                <div className="inputBox">
                  <span>Purchase Date (mm/dd/yyyy, hh:mm AM/PM) :</span>
                  <input
                    type="datetime-local"
                    required
                    name="Tanggal Output"
                    value={data["Tanggal Output"]}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  />
                </div>
                <div className="inputBox">
                  <span>BAST (mm/dd/yyyy, hh:mm AM/PM)  :</span>
                  <input
                    type="datetime-local"
                    required
                    name="BAST Output"
                    value={data["BAST Output"]}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  />
                </div>
                <div className="inputBox">
                  <span>Purchase Price :</span>
                  <input
                    type="number"
                    required
                    name="Harga Perolehan"
                    value={data["Harga Perolehan"]}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  />
                </div>
             
              </div>
              <div className="col">
                <div className="asset-image-container">
                  <div className="image-box">
                    {selectedImage && (
                      <div className="image">
                        {" "}
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          className="image"
                          alt="Thumb"
                          style={{width:'200px', height:'140px'}}
                        />
                        <button
                          onClick={removeSelectedImage}
                          className="cancel"
                        >
                          Remove the image
                        </button>
                      </div>
                    )}
                  </div>
                  <input 
                    ref={ref}
                    id="upload"
                    accept="image/*"
                    type="file"
                    name="Asset Image"
                    onChange={imageChange}
                  />
                </div>
                <div className="inputBox">
                  <span>Additional Cost :</span>
                  <input
                    type="number"
                    required
                    name="Biaya Lain-Lain"
                    value={data["Biaya Lain-Lain"]}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  />
                </div>
                <div className="inputBox">
                  <span>Insurance</span>
                  <select
                    required
                    name="Insurance"
                    value={data.Insurance}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  >
                    <option value="">Select</option>
                    <option>Sudah</option>
                    <option>Belum</option>
                  </select>
                </div>
                <div className="inputBox">
                  <span>User :</span>
                  <input
                      type="text"
                      required
                      name="User"
                      value={data.User}
                      onChange={handleChange}
                      style={{width:'95%'}}
                    />
                  {/* <select
                    required
                    name="User"
                    value={data.user}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  >
                    <option value="" >Select User</option>
                    {user.map((item) => (
                      <option
                        key={item.name}
                        value={item.name}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select> */}
                </div>
                  <div className="inputBox">
                    <span>Position :</span>
                    <input
                      type="text"
                      required
                      name="Jabatan"
                      value={data.Jabatan}
                      onChange={handleChange}
                      style={{width:'95%'}}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Tracking Number:</span>
                    <input
                      type="string"
                      required
                      name="Nomor Resi"
                      value={data['Nomor Resi']}
                      onChange={handleChange}
                      style={{width:'95%'}}
                    />
                  </div>
                  <div className="inputBox">
                    <span>PPN :</span>
                    <select
                    required
                    name="PPN"
                    value={data.PPN}
                    onChange={handleChange}
                    style={{width:'95%'}}
                  >
                    <option value="">Select Condition</option>
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                  </select>
                  </div>
                <div className="button-asset">
                  <button
                    type="submit"
                    className="btn btn-primary button-submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      {isLoading && <AssetLoading/>}
      </Sidebar>
    </>
  );
};
