import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../services/UseAuth";
import "./FormPORent.css";
import { useDeps } from "../../../shared/context/DependencyContext";
import moment from "moment";
import { async } from "@firebase/util";

export const FormPORent = () => {
  const {purchaseOrderRentService} = useDeps();
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



  const [fileKtp,setFileKtp] = useState([])
  const [fileNpwp,setFileNpwp] = useState([])
  const [fileBukuTabungan, setFileBukuTabungan] = useState([])
  const [fileSertifikat, setFileSertifikat] = useState([])
  const [fileFotoLokasi, setFileFotoLokasi] = useState([])


   const onSubmitPO = async (e)=>{
    e.preventDefault();
    // const newRent = {
    //   "Kode Wilayah": user.location_id,
    //   "requester": user.name,
    //   "User": toUser,
    //   "Jabatan": position,
    //   "alamat_lokasi": alamatLokasi,
    //   "Nama Barang": namaBarang,
    //   "status": status,
    //   "jenis_tempat": jenisTempat,
    //   "TLP": tlp,
    //   "PLN":pln,
    //   "PAM":pam,
    //   "lain_lain":lainLain,
    //   "masa_sewa_bulan_tahun": masaSewa,
    //   "periode_sewa_awal": periodeSewaAwal,
    //   "periode_sewa_akhir": periodeSewaAkhir,
    //   "nama_pemilik": namaPemilik,
    //   "NPWP": NPWP,
    //   "alamat_pemilik":alamatPemilik,
    //   "no_telepon_pemilik": tlpPemilik,
    //   "harga_sewa_per_tahun_harga_lama":sewaHargaLama,
    //   "harga_sewa_per_tahun_harga_baru": sewaHargaBaru,
    //   "pajak":pajak,
    //   "nominal_transfer_ke_pemilik":nominalTransfer,
    //   "notaris": notaris,
    //   "jasa_notaris": jasaNotaris,
    //   "NPWP_notaris": NPWPNotaris,
    //   "nama_rekening_tujuan": namaRekeningTujuan,
    //   "nomor_rekening_tujuan": norekTujuan,
    //   "bank":bank,
    //   "cabang_bank": cabangBank,
    //   "cara_pembayaran": caraPembayaran,
    //   "tanggal_jatuh_tempo": jatuhTempo,
    //   "ktp": fileKtp
    // }
    const rentFormData = new FormData();
    rentFormData.append("Kode Wilayah", user.location_id)
    rentFormData.append("requester", user.name)
    rentFormData.append("User", toUser)
    rentFormData.append("Jabatan", position)
    rentFormData.append("alamat_lokasi", alamatLokasi)
    rentFormData.append("Nama Barang", namaBarang)
    rentFormData.append("status", status)
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
    rentFormData.append("notaris", notaris)
    rentFormData.append("jasa_notaris", jasaNotaris)
    rentFormData.append("NPWP_notaris", NPWPNotaris)
    rentFormData.append("nama_rekening_tujuan", namaRekeningTujuan)
    rentFormData.append("nomor_rekening_tujuan", norekTujuan)
    rentFormData.append("bank",bank)
    rentFormData.append("cabang_bank", cabangBank)
    rentFormData.append("cara_pembayaran", caraPembayaran)
    rentFormData.append("tanggal_jatuh_tempo", jatuhTempo)

    for (let i = 0; i < fileKtp.length; i++) {
        rentFormData.append("ktp", fileKtp[i])
    }
    

    // for (let i = 0; i < fileNpwp.length; i++) {
    //   rentFormData.append("npwp", fileNpwp[i])
    // }

    // for (let i = 0; i < fileBukuTabungan.length; i++) {
    //   rentFormData.append("bukuTabungan", fileBukuTabungan[i])
    // }

    // for (let i = 0; i < fileFotoLokasi.length; i++) {
    //   rentFormData.append("fotoLokasi", fileFotoLokasi[i])
    // }

    // for (let i = 0; i < fileSertifikat.length; i++) {
    //   rentFormData.append("sertifikat", fileSertifikat[i])
    // }

    console.log(rentFormData);
    try {
      const response = await purchaseOrderRentService.createPO(rentFormData)
      console.log(response)
    } catch (e) {
      console.log(e)
    }
   }

   useEffect(()=>{
    onGetCookie();
   },[]);

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
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label>
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
                  <label>
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
                  <label>
                    Address<span className="text-danger">*</span>
                  </label>
                  <textarea value={alamatLokasi}  name="alamat_lokasi" onChange={(e)=>setAlamatLokasi(e.target.value)} required className="form-control" rows="3"></textarea>
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
                    value={namaBarang}
                    onChange={(e)=>setNamaBarang(e.target.value)}
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
                    value={jenisTempat}
                    onChange={(e)=>setJenisTempat(e.target.value)}
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
                  <label>
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
                  <label>
                    Rent Period (Month/Year)
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
                <div className="mb-3 col-md-6">
                  <label>
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
                <div className="mb-3 col-md-6">
                  <label>
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
                <div className="mb-3 col-md-12">
                  <label>
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
                  <label>
                    Owner's Phone<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="number"
                    name="no_telepon_pemilik"
                    className="form-control"
                    onChange={(e)=>setTlpPemilik(e.target.value)}
                    value={tlpPemilik}
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
                    value={sewaHargaLama}
                    onChange={(e)=>setSewaHargaLama(e.target.value)}
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
                    value={sewaHargaBaru}
                    onChange={(e)=>setSewaHargaBaru(e.target.value)}
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
                    value={pajak}
                    onChange={(e)=>setPajak(e.target.value)}
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
                    onChange={(e)=>setNominalTransfer(e.target.value)}
                    value={nominalTransfer}
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
                    onChange={(e)=>setNotaris(e.target.value)}
                    value={notaris}
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
                    value={jasaNotaris}
                    onChange={(e)=>setJasaNotaris(e.target.value)}
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
                    value={NPWPNotaris}
                    onChange={(e)=>setNPWPNotaris(e.target.value)}
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
                    onChange={(e)=>setNamaRekeningTujuan(e.target.value)}
                    value={namaRekeningTujuan}
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
                    value={norekTujuan}
                    onChange={(e)=>setNorekTujuan(e.target.value)}
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
                    value={bank}
                    onChange={(e)=>setBank(e.target.value)}
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
                    value={cabangBank}
                    onChange={(e)=>setCabangBank(e.target.value)}
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
                    value={caraPembayaran}
                    onChange={(e)=>setCaraPembayaran(e.target.value)}
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
                    value={jatuhTempo}
                    onChange={(e)=>setJatuhTempo(e.target.value)}
                  />
                </div>
                <label>Attachment File</label>
                <div>
                  <input
                    onChange={(e) => {
                    setFileKtp(e.target.files)
                    }}
                    multiple
                    type="file"
                    accept='.png, .jpeg, .jpg'
                    />
                </div>
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
