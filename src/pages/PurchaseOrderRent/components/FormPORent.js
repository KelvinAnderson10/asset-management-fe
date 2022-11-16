import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../services/UseAuth";
import "./FormPORent.css";
import { useDeps } from "../../../shared/context/DependencyContext";
import moment from "moment";
import { async } from "@firebase/util";
import { Failed } from "../../../shared/components/Notification/Failed";
import swal from "sweetalert";
import { NOTIF, STATUS } from "../../../shared/constants";
import * as CgIcons from "react-icons/cg";
import * as BiIcons from "react-icons/bi"

export const FormPORent = () => {
  const {purchaseOrderRentService, notificationService} = useDeps();
  const [toUser,setToUser] = useState('');
  const [position,setPosition] = useState('');
  const [alamatLokasi, setAlamatLokasi] = useState('');
  const [namaBarang, setNamaBarang] = useState('');
  const [status,setStatus] = useState('');
  const [jenisTempat,setJenisTempat] = useState('');
  const [tlp,setTlp] = useState('');
  const [pln,setPln] = useState('');
  const [pam,setPam] = useState('');
  const [lainLain,setLainlain] = useState('');
  const [masaSewa, setMasaSewa] = useState('');
  const [periodeSewaAwal,setPeriodeSewaAwal] = useState();
  const [periodeSewaAkhir,setPeriodeSewaAkhir] = useState();
  const [namaPemilik,setNamaPemilik] = useState('');
  const [NPWP,setNPWP] = useState('');
  const [alamatPemilik,setAlamatPemilik] = useState('')
  const [tlpPemilik, setTlpPemilik] = useState('');
  const [sewaHargaLama, setSewaHargaLama] = useState('')
  const [sewaHargaBaru, setSewaHargaBaru] = useState('')
  const [pajak,setPajak] = useState('');
  const [nominalTransfer, setNominalTransfer] = useState('')
  const [notaris, setNotaris] = useState('')
  const [jasaNotaris,setJasaNotaris]= useState('')
  const [NPWPNotaris,setNPWPNotaris] = useState('')
  const [namaRekeningTujuan, setNamaRekeningTujuan] = useState('')
  const [norekTujuan, setNorekTujuan] = useState('')
  const [bank,setBank] = useState('')
  const [cabangBank,setCabangBank] = useState('')
  const [caraPembayaran,setCaraPembayaran] = useState('')
  const [jatuhTempo,setJatuhTempo] = useState()
  const [isLoading,setIsLoading] = useState(false)
  const [perihal, setPerihal] = useState('')
  const [alasan,setAlasan] = useState('')
  const [regional,setRegional] = useState('')
  const [background, setBackground] = useState([{
    background:''
  }])


  const [fileKtp,setFileKtp] = useState([])
  const [fileNpwp,setFileNpwp] = useState([])
  const [fileBukuTabungan, setFileBukuTabungan] = useState([])
  const [fileSertifikat, setFileSertifikat] = useState([])
  const [fileFotoLokasi, setFileFotoLokasi] = useState([])

  const addFields = (e)=>{
    let object = {
      background:''
    }
    setBackground([...background,object])
  }

  const handleBackgroundChange =(event,index)=>{
    let data = [...background]
    data[index][event.target.name] = event.target.value
    
  }
  const removeFields = (index) => {
    let data = [...background];
    data.splice(index, 1);
    setBackground(data);
  };
  const createNotification = async (notifPO) => {
    try {
      const response = await notificationService.createNotif(notifPO);
    } catch (e) {
      console.log(e);
    }
  };

   const onSubmitPO = async (e)=>{
    e.preventDefault();
    setIsLoading(true)
   
    const rentFormData = new FormData();
    rentFormData.append("Kode Wilayah", user.location_id)
    rentFormData.append("regional", regional)
    rentFormData.append("requester", user.name)
    rentFormData.append("User", toUser)
    rentFormData.append("Jabatan", position)
    rentFormData.append("about",perihal)
    rentFormData.append("reason",alasan)
    rentFormData.append("alamat_lokasi", alamatLokasi)
    rentFormData.append("Nama Barang", namaBarang)
    rentFormData.append("status", STATUS.CREATE_PO)
    rentFormData.append("jenis_tempat", jenisTempat)
    rentFormData.append("TLP", tlp)
    rentFormData.append("PLN",pln)
    rentFormData.append("PAM",pam)
    rentFormData.append("lain_lain",lainLain)
    rentFormData.append("masa_sewa_bulan_tahun", masaSewa)
    rentFormData.append("periode_sewa_awal", periodeSewaAwal)
    rentFormData.append("periode_sewa_akhir", periodeSewaAkhir)
    rentFormData.append("nama_pemilik", namaPemilik)
    rentFormData.append("NPWP", NPWP)
    rentFormData.append("alamat_pemilik",alamatPemilik)
    rentFormData.append("no_telepon_pemilik", tlpPemilik)
    rentFormData.append("harga_sewa_per_tahun_harga_lama",sewaHargaLama)
    rentFormData.append("harga_sewa_per_tahun_harga_baru", sewaHargaBaru)
    rentFormData.append("pajak",pajak)
    rentFormData.append("nominal_transfer_ke_pemilik",nominalTransfer)
    // rentFormData.append("notaris", notaris)
    // rentFormData.append("jasa_notaris", jasaNotaris)
    rentFormData.append("NPWP_notaris", NPWPNotaris)
    rentFormData.append("nama_rekening_tujuan", namaRekeningTujuan)
    rentFormData.append("nomor_rekening_tujuan", norekTujuan)
    rentFormData.append("bank",bank)
    rentFormData.append("cabang_bank", cabangBank)
    rentFormData.append("cara_pembayaran", caraPembayaran)
    rentFormData.append("tanggal_jatuh_tempo", jatuhTempo)

    for (let i = 0; i < background.length; i++) {
      rentFormData.append("background_list", background[i].background)
  }

    for (let i = 0; i < fileKtp.length; i++) {
        rentFormData.append("ktp", fileKtp[i])
    }
    
    for (let i = 0; i < fileNpwp.length; i++) {
      rentFormData.append("npwp", fileNpwp[i])
    }

    for (let i = 0; i < fileBukuTabungan.length; i++) {
      rentFormData.append("bukuTabungan", fileBukuTabungan[i])
    }

    for (let i = 0; i < fileFotoLokasi.length; i++) {
      rentFormData.append("fotoLokasi", fileFotoLokasi[i])
    }

    for (let i = 0; i < fileSertifikat.length; i++) {
      rentFormData.append("sertifikat", fileSertifikat[i])
    }

    console.log('ini rentform',rentFormData);
    try {
      const response = await purchaseOrderRentService.createPO(rentFormData)
      console.log(response)
      let notifObjGM = {
        to: response.data.approver_level1,
        title: NOTIF.REQUEST.TITLE,
        body: `${NOTIF.REQUEST.BODY} ${user.name}`,
      };
      let notifObjVpTrad = {
        to: response.data.approver_level2,
        title: NOTIF.REQUEST.TITLE,
        body: `${NOTIF.REQUEST.BODY} ${user.name}`,
      };
      let notifObjGA = {
        to: response.data.approver_level3,
        title: NOTIF.REQUEST.TITLE,
        body: `${NOTIF.REQUEST.BODY} ${user.name}`,
      };
      createNotification(notifObjGM);
      createNotification(notifObjVpTrad);
      createNotification(notifObjGA);
      clearForm()
      if (response.status === "SUCCESS"){
        swal({
          title: "Success!",
          text: "Your request has been made!",
          icon: "success",
          button: "OK!",
        }).then(result => {window.location.reload()});
      }
    } catch (error) {
      if (error.response.data.message === 'File extension is forbidden') {
        Failed('There is unsupported file extension in your attachment')
    } else if ( error.response.data.message === 'Each file should not exceed 2 MB'){
        Failed('Maximum size of each attachment is 2MB')
    }else{
      console.log(error.response.data);
      Failed("Your request failed to made");
    }

      console.log(e)
    } finally{
      e.target.reset()
      setIsLoading(false)
    }
   }

  const validateFileSizeKTP = () => {
    if (fileKtp.length === 0) {
        return true
    }

    for (let i = 0; i < fileKtp.length; i++) {
        if (fileKtp[i].size > 2000000){
            return false
        }
    }
    return true
  }

  const validateFileSizeNPWP = () => {
    if (fileNpwp.length === 0) {
        return true
    }

    for (let i = 0; i < fileNpwp.length; i++) {
        if (fileNpwp[i].size > 2000000){
            return false
        }
    }
    return true
  }

  const validateFileSizeBukuTabungan = () => {
    if (fileBukuTabungan.length === 0) {
        return true
    }

    for (let i = 0; i < fileBukuTabungan.length; i++) {
        if (fileBukuTabungan[i].size > 2000000){
            return false
        }
    }
    return true
  }

  const validateFileSizeSertifikat = () => {
    if (fileSertifikat.length === 0) {
        return true
    }

    for (let i = 0; i < fileSertifikat.length; i++) {
        if (fileSertifikat[i].size > 2000000){
            return false
        }
    }
    return true
  }

  const validateFileSizeFotoLokasi = () => {
    if (fileFotoLokasi.length === 0) {
        return true
    }

    for (let i = 0; i < fileFotoLokasi.length; i++) {
        if (fileFotoLokasi[i].size > 2000000){
            return false
        }
    }
    return true
  }


   useEffect(()=>{
    onGetCookie();
   },[]);

   const clearForm = () => {
    setToUser('');
    setPosition('')
    setAlamatLokasi('')
    setNamaBarang('')
    setJenisTempat('')
    setTlp('')
    setPln('')
    setPam('')
    setLainlain('')
    setMasaSewa('')
    setPeriodeSewaAwal('')
    setPeriodeSewaAkhir('')
    setNamaPemilik('')
    setNPWP('')
    setAlamatPemilik('')
    setTlpPemilik('')
    setSewaHargaLama('')
    setSewaHargaBaru('')
    setPajak('')
    setNominalTransfer('')
    setNotaris('')
    setJasaNotaris('')
    setNPWPNotaris('')
    setNamaRekeningTujuan('')
    setNorekTujuan('')
    setBank('')
    setCabangBank('')
    setCaraPembayaran('')
    setJatuhTempo('')
    setFileKtp('')
    setFileBukuTabungan('')
    setFileNpwp('')
    setFileSertifikat('')
    setFileFotoLokasi('')
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



  return (    <>
      <div className="po-rent-form-container">
        <div className="po-rent-form-card">
          <form onSubmit={onSubmitPO}>
            <h4 className="mb-4 text-danger">Purchase Order Request Form</h4>
            <p><span className="text-danger">*</span> required fields</p>
            <div className="formPOInput">
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
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
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    Cluster<span className="text-danger">*</span>
                  </label>
                  <input readOnly defaultValue={user.cluster} type="text" name="Cluster" className="form-control" />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    TAP<span className="text-danger">*</span>
                  </label>
                  <input
                    readOnly
                    defaultValue={user.tap}
                    required
                    type="text"
                    name="TAP"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    Regional<span className="text-danger">*</span>
                  </label>
                  <input
                    value={regional}
                    required
                    type="text"
                    name="regional"
                    className="form-control"
                    onChange={(e)=>setRegional(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                <label style={{fontWeight:'500'}}>
                    About<span className="text-danger">*</span>
                  </label>
                    <select
                      required
                      name="about"
                      value={perihal}
                      onChange={(e)=>setPerihal(e.target.value)}
                      className="form-select"
                     
                    >
                      <option value="">Select Option</option>
                      <option>Perpanjangan Sewa Ruko</option>
                      <option>Pengajuan Sewa Baru Ruko</option>
                      
                    </select>

                </div>
                <div className="mb-3">
                  <label style={{fontWeight:'500'}}>
                    Reason<span className="text-danger">*</span>
                  </label>
                  <input
                    value={alasan}
                    required
                    type="text"
                    name="reason"
                    className="form-control"
                    onChange={(e)=>setAlasan(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    User<span className="text-danger">*</span>
                  </label>
                  <input
                    value={toUser}
                    required
                    type="text"
                    name="User"
                    className="form-control"
                    onChange={(e)=>setToUser(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    Position<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="Jabatan"
                    className="form-control"
                    value={position}
                    onChange={(e)=> setPosition(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <label style={{fontWeight:'500'}}>
                    Address<span className="text-danger">*</span>
                  </label>
                  <textarea value={alamatLokasi} name="alamat_lokasi" onChange={(e)=>setAlamatLokasi(e.target.value)} required className="form-control" rows="3"></textarea>
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    Item Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="Nama Barang"
                    className="form-control"
                    value={namaBarang}
                    onChange={(e)=>setNamaBarang(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    Type of Place<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="jenis_tempat"
                    className="form-control"
                    value={jenisTempat}
                    onChange={(e)=>setJenisTempat(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <label style={{fontWeight:'500'}}> Existing Facilities : </label>
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
                    value={tlp}
                    onChange={(e)=>setTlp(e.target.value)}
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
                    value={pln}
                    onChange={(e)=>setPln(e.target.value)}
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
                    value={pam}
                    onChange={(e)=>setPam(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    Additional Info
                  </label>
                  <input
                    value={lainLain}
                    type="text"
                    name="lain_lain"
                    className="form-control"
                    onChange={(e)=>setLainlain(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    Rent Period (Month)
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="masa_sewa_bulan_tahun"
                    className="form-control"
                    value={masaSewa}
                    onChange={(e)=>setMasaSewa(e.target.value)}
                  />
                </div>
                <div></div>
                <div className="mb-1 col-md-12">
                  <label style={{fontWeight:'500'}}> Rent Period: </label>
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
                    value={periodeSewaAwal}
                    onChange={(e)=>setPeriodeSewaAwal(e.target.value)}
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
                    value={periodeSewaAkhir}
                    onChange={(e)=>setPeriodeSewaAkhir(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label style={{fontWeight:'500'}}>
                    Owner's Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="nama_pemilik"
                    className="form-control"
                    value={namaPemilik}
                    onChange={(e)=>setNamaPemilik(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label style={{fontWeight:'500'}}>
                    NPWP<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="NPWP"
                    className="form-control"
                    value={NPWP}
                    onChange={(e)=>setNPWP(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label style={{fontWeight:'500'}}>
                    Owner's Phone<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    name="no_telepon_pemilik"
                    className="form-control"
                    onChange={(e)=>setTlpPemilik(e.target.value)}
                    value={tlpPemilik}
                  />
                </div>
                <div className="mb-3 col-md-12">
                  <label style={{fontWeight:'500'}}>
                    Owner's Address<span className="text-danger">*</span>
                  </label>
                  <textarea
                    onChange={(e)=>setAlamatPemilik(e.target.value)}
                    value={alamatPemilik}
                    className="form-control"
                    rows="3"
                    name="alamat_pemilik"
                  ></textarea>
                </div>
                
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    Rent Price (Old Price if Extend)<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    min="0"
                    type="number"
                    name="harga_sewa_per_tahun_harga_lama"
                    className="form-control"
                    value={sewaHargaLama}
                    onChange={(e)=>setSewaHargaLama(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                    Rent Price (New Price)<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    name="harga_sewa_per_tahun_harga_baru"
                    className="form-control"
                    value={sewaHargaBaru}
                    onChange={(e)=>setSewaHargaBaru(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                <label style={{fontWeight:'500'}}>
                    Tax Options<span className="text-danger">*</span>
                  </label>
                    <select
                      required
                      name="pajak"
                      value={pajak}
                      onChange={(e)=>setPajak(e.target.value)}
                      className="form-select"
                     
                    >
                      <option value="">Select Option</option>
                      <option value="dibayar penyewa">Paid by Tenant</option>
                      <option value="dibayar pemilik">Paid by Owner</option>
                      
                    </select>

                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                  Amount transferred to Owner<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    name="nominal_transfer_ke_pemilik"
                    className="form-control"
                    onChange={(e)=>setNominalTransfer(e.target.value)}
                    value={nominalTransfer}
                  />
                </div>
                {/* <div className="mb-3 col-md-4">
                  <label style={{fontWeight:'500'}}>
                    Notary<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="notaris"
                    className="form-control"
                    onChange={(e)=>setNotaris(e.target.value)}
                    value={notaris}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label style={{fontWeight:'500'}}>
                    Notary Services<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="jasa_notaris"
                    className="form-control"
                    value={jasaNotaris}
                    onChange={(e)=>setJasaNotaris(e.target.value)}
                  />
                </div> */}
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                 NPWP Notary<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="NPWP_notaris"
                    className="form-control"
                    value={NPWPNotaris}
                    onChange={(e)=>setNPWPNotaris(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                 Destination Account Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="nama_rekening_tujuan"
                    className="form-control"
                    onChange={(e)=>setNamaRekeningTujuan(e.target.value)}
                    value={namaRekeningTujuan}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                 Destination Account Number<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="nomor_rekening_tujuan"
                    className="form-control"
                    value={norekTujuan}
                    onChange={(e)=>setNorekTujuan(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label style={{fontWeight:'500'}}>
                 Bank Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="bank"
                    className="form-control"
                    value={bank}
                    onChange={(e)=>setBank(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label style={{fontWeight:'500'}}>
                 Branch Name<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="cabang_bank"
                    className="form-control"
                    value={cabangBank}
                    onChange={(e)=>setCabangBank(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label style={{fontWeight:'500'}}>
                  Payment Method<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="cara_pembayaran"
                    className="form-control"
                    value={caraPembayaran}
                    onChange={(e)=>setCaraPembayaran(e.target.value)}
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label style={{fontWeight:'500'}}>
                  Due Date<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    name="tanggal_jatuh_tempo"
                    className="form-control"
                    value={jatuhTempo}
                    onChange={(e)=>setJatuhTempo(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                <label>Background<span className="text-danger">*</span>{" "}</label>
                  <a onClick={addFields}>
                    <BiIcons.BiListPlus size="2em" color="green"/>
                  </a>
                </div>
                {background.map((form,index)=>{
                  return(
                    <div key={index}>
                      <div className="row">
                        {/* <div className="col-1 center">
                          {index+1}
                          
                        </div> */}
                      <div className="mb-3 col-11">
                          <input
                            required
                            type="text"
                            name="background"
                            placeholder="background"
                            className="form-control"
                            onChange={(event) => handleBackgroundChange(event, index)}
                            />
                        </div>
                        <div className="col-1">
                        {index > 0 && (
                            <a onClick={() => removeFields(index)}>
                            <CgIcons.CgCloseR size="2em" color="red" />
                          </a>
                        )}
                        </div>
                        </div>
                      </div>
                  )
                })}
                
                <div>

                </div>
                <label style={{fontWeight:'500'}}>Attachment File</label>
                <div className="file-extension">
                    <p  style={{fontSize:'15px', color:'rgb(255, 178, 0)'}}>Allowed file types : <b>png, jpg, jpeg</b><br></br> Maximum size of each attachment is 2MB <br></br> You can choose more than 1 file</p>
                </div>
                <div style={{minHeight:'200px'}} className="card">
                    <div className="card-header bg-transparent">
                      KTP <span className="text-danger">*</span>
                    </div>
                    <div class="card-body">
                          <input
                            required
                            onChange={(e) => {
                            setFileKtp(e.target.files)
                            }}
                            multiple
                            type="file"
                            accept='.png, .jpeg, .jpg'
                            />     
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileKtp).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  src={item ? URL.createObjectURL(item) : null} />
                              </span>
                            )
                          })
                        }
                        </div>
                        { !validateFileSizeKTP() && <span className='text-danger' style={{fontSize:'15px'}}>*maximum size of each attachment is 2MB</span>}  
                    </div>
                  </div>
                  <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                    <div className="card-header bg-transparent">
                      NPWP <span className="text-danger">*</span>
                    </div>
                    <div class="card-body">
                        <div>
                          <input
                            required
                            onChange={(e) => {
                            setFileNpwp(e.target.files)
                            }}
                            multiple
                            type="file"
                            accept='.png, .jpeg, .jpg'
                            />
                        </div>
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileNpwp).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  src={item ? URL.createObjectURL(item) : null} />
                              </span>
                            )
                          })
                        }
                        </div>  
                        { !validateFileSizeNPWP() && <span className='text-danger' style={{fontSize:'15px'}}>*maximum size of each attachment is 2MB</span>} 
                    </div>
                  </div>
                  <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                    <div className="card-header bg-transparent">
                      Savings Account <span className="text-danger">*</span>
                    </div>
                    <div class="card-body">
                        <div>
                          <input
                            required
                            onChange={(e) => {
                            setFileBukuTabungan(e.target.files)
                            }}
                            multiple
                            type="file"
                            accept='.png, .jpeg, .jpg'
                            />
                        </div>
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileBukuTabungan).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  src={item ? URL.createObjectURL(item) : null} />
                              </span>
                            )
                          })
                        }
                        </div>  
                        { !validateFileSizeBukuTabungan() && <span className='text-danger' style={{fontSize:'15px'}}>*maximum size of each attachment is 2MB</span>} 
                    </div>
                  </div>
                  <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                    <div className="card-header bg-transparent">
                      Location Photo <span className="text-danger">*</span>
                    </div>
                    <div class="card-body">
                        <div>
                          <input
                            required
                            onChange={(e) => {
                            setFileFotoLokasi(e.target.files)
                            }}
                            multiple
                            type="file"
                            accept='.png, .jpeg, .jpg'
                            />
                        </div>
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileFotoLokasi).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  src={item ? URL.createObjectURL(item) : null} />
                              </span>
                            )
                          })
                        }
                        </div>  
                        { !validateFileSizeFotoLokasi() && <span className='text-danger' style={{fontSize:'15px'}}>*maximum size of each attachment is 2MB</span>} 
                    </div>
                  </div>
                  <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                    <div className="card-header bg-transparent">
                      Certificate <span className="text-danger">*</span>
                    </div>
                    <div class="card-body">
                        <div>
                          <input
                            required
                            onChange={(e) => {
                            setFileSertifikat(e.target.files)
                            }}
                            multiple
                            type="file"
                            accept='.png, .jpeg, .jpg'
                            />
                        </div>
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileSertifikat).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  src={item ? URL.createObjectURL(item) : null} />
                              </span>
                            )
                          })
                        }
                        </div>  
                        { !validateFileSizeSertifikat() && <span className='text-danger' style={{fontSize:'15px'}}>*maximum size of each attachment is 2MB</span>} 
                    </div>
                  </div>
                <div className="col-md-12 mt-4">
                  <button
                    className="btn btn-primary float-end"
                    style={{ marginLeft: "20px", marginRight: "20px" }}
                  >
                    Submit
                  </button>
                  <button onClick={clearForm} type="reset" className="btn btn-warning float-end">
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
