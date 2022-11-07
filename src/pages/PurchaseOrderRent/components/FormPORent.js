import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../services/UseAuth";
import "./FormPORent.css";
import imageCompression from "browser-image-compression";
import { useDeps } from "../../../shared/context/DependencyContext";
import moment from "moment";
import { async } from "@firebase/util";

export const FormPORent = () => {
  const {purchaseOrderRentService} = useDeps();
  const [attachmentRent, setAttachmentRent ] = useState([
    {
      category:'',
      picture:''
    }
  ])

  const [POHeader, setPOHeader] = useState({
    attachment:[]
  })

  const [selectedImage, setSelectedImage] = useState();
  const [imageBase64, setImageBase64] = useState("");
  let reader = new FileReader();
  const ref = useRef(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [file,setFile] = useState([])


   const handleChange = (e)=>{
    const newData = { ...POHeader };
    newData[e.target.name] = e.target.value;
    console.log(newData)
    setPOHeader(newData);
   }

   const handleAttachmentChange = async (e,index)=>{
    let data = [...attachmentRent];
    data[index][e.target.name]=e.target.value
    if (e.target.files && e.target.files.length > 0) {
      console.log('ini file', typeof e.target.files)
      console.log('ini file', e.target.files)
      const options = {
        maxSizeMB: 0.5,
        // maxWidthOrHeight: 200,
        useWebWorker: true,
      };
      let allFiles = []
      for (let i = 0; i<e.target.files.length; i++){
      allFiles.push( e.target.files[i]);
      console.log('ini imagefile',allFiles)
      if (allFiles.length>0){
        setFile(allFiles)
      }

      try{
        const compressedImage = await imageCompression(file, options);
        setSelectedImage(compressedImage);
        reader.readAsDataURL(compressedImage);
        reader.onload = () => {
          data[index]['picture'] =(reader.result)
        };
      } catch (error) {
        console.log(error);
      }
      }
      
    }
    console.log('ini attachment',data)
    setAttachmentRent(data)
    
   }

   const onSubmitPO = async (e)=>{
    e.preventDefault();
    try {
      POHeader['Kode Wilayah'] = user.location_id;
      POHeader.Cluster = user.cluster;
      POHeader.TAP = user.tap
      POHeader.periode_sewa_awal = moment(POHeader.periode_sewa_awal)
      POHeader.periode_sewa_akhir = moment(POHeader.periode_sewa_akhir)
      POHeader.attachment = [...attachmentRent]
      const response = await purchaseOrderRentService.createPO(POHeader)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
   }

   useEffect(()=>{
    onGetCookie();
   },[]);


  const addFields = (e)=>{
    e.preventDefault();
    let object = {
      category:'',
      picture:''
    }
    setAttachmentRent([...attachmentRent,object])
  }


   const {getCookie} = useAuth()
   const [user, setUser] = useState({
    name: "",
    role: "",
    level_approval: "",
    location_id: "",
    tap: "",
    cluster: "",
    department: "",
  });

  const onGetCookie = () => {
    let savedUserJsonString = getCookie("user");
    let savedUser = JSON.parse(savedUserJsonString);
    setUser((prevObj) => ({
      ...prevObj,
      name: savedUser.name,
      role: savedUser.role,
      level_approval: savedUser.level_approval,
      location_id: savedUser.location_id,
      tap: savedUser.tap,
      cluster: savedUser.cluster,
      department: savedUser.department,
    }));
  };


  return (
    <>
      <div className="po-mtnc-form-container">
        <div className="po-mtnc-form-card">
          <form onSubmit={onSubmitPO}>
            <h4 className="mb-4 text-danger">Purchase Order Request Form</h4>
            <div className="formPOInput">
              <div className="row">
                <div className="mb-3 col-md-4">
                  <label>
                    Area Code<span className="text-danger">*</span>
                  </label>
                  <input
                    readOnly
                    type="text"
                    name="Kode Wilayah"
                    className="form-control"
                    defaultValue={user.location_id}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    Cluster<span className="text-danger">*</span>
                  </label>
                  <input readOnly defaultValue={user.cluster} type="text" name="Cluster" className="form-control" />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    TAP<span className="text-danger">*</span>
                  </label>
                  <input
                    readOnly
                    defaultValue={user.tap}
                    required
                    type="text"
                    name="TAP"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    User<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="User"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    Position<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="Jabatan"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <label>
                    Address<span className="text-danger">*</span>
                  </label>
                  <textarea name="alamat_lokasi" onChange={handleChange} required className="form-control" rows="3"></textarea>
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    Item Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="Nama Barang"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    Type of Place<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="jenis_tempat"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <label> Existing Facilities : </label>
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    TLP<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="TLP"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    PLN<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="PLN"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    PAM<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="PAM"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    Additional Info
                  </label>
                  <input
                    
                    type="text"
                    name="lain_lain"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    Rent Period (Month/Year)
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="masa_sewa_bulan_tahun"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div></div>
                <div className="mb-1 col-md-12">
                  <label> Rent Period: </label>
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    From<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    name="periode_sewa_awal"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    Until<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    name="periode_sewa_akhir"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    Owner's Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="nama_pemilik"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    NPWP<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="NPWP"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <label>
                    Owner's Address<span className="text-danger">*</span>
                  </label>
                  <textarea
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    name="alamat_pemilik"
                  ></textarea>
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    Owner's Phone<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    name="no_telepon_pemilik"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                    Rent Price/Year (Old Price if Extend)<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    name="harga_sewa_per_tahun_harga_lama"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    Rent Price/Year (New Price)<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    name="harga_sewa_per_tahun_harga_baru"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    Tax (10%)<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    name="pajak"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                  Amount transferred to Owner<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    name="nominal_transfer_ke_pemilik"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    Notary<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="notaris"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    Notary Services<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="jasa_notaris"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                 NPWP Notary<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="NPWP_notaris"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                 Destination Account Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="nama_rekening_tujuan"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                 Destination Account Number<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="nomor_rekening_tujuan"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                 Bank Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="bank"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                 Branch Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="cabang_bank"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                  Payment Method<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="cara_pembayaran"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
                  Due Date<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    name="tanggal_jatuh_tempo"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <label>Attachment File</label>
                
                {attachmentRent.map((form,index)=>{
                  return(
                    <>
                    
                    {/* <div className="col-md-6 mb-2">
                      <label>File Category</label>
                      <select
                            className="form-select"
                            required
                            name="category"
                            value={form.category}
                            onChange={(event) => handleAttachmentChange(event, index)}
                            style={{ width: "95%" }}
                          >
                            <option value="">Select Category</option>
                            <option value="KTP">KTP</option>
                            <option value="NPWP">NPWP</option>
                            <option value="SAVINGS ACCOUNT">Savings Account</option>
                          </select>
                    </div> */}
                    <div className="col-md-6 mb-2">
                    <label>File Category</label>
                    <input 
                    className="form-control"
                    name="category"
                    value="KTP"
                    readOnly >
                    </input>
                    </div>
                    <div className="col-md-6 mt-4">
                      <input type="file" name='picture' multiple onChange={(event) => handleAttachmentChange(event, index)} ></input>
                    </div>
                    <div className="col-md-6 mb-2">
                    <label>File Category</label>
                    <input 
                    className="form-control"
                    name="category"
                    value="Location"
                    readOnly >
                    </input>
                    </div>
                    <div className="col-md-6 mt-4">
                      <input type="file" name='picture' multiple onChange={(event) => handleAttachmentChange(event, index)} ></input>
                    </div>
                    </>

                  )
                })}
                {/* <div className="col-md-12">
                  <button
                    className="btn btn-success float-start"
                    onClick={addFields}
                  >
                    Add More..
                  </button>
                </div> */}
        

                <div className="col-md-12">
                  <button
                    className="btn btn-primary float-end"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                  >
                    Submit
                  </button>
                  <button type="reset" className="btn btn-warning float-end">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
