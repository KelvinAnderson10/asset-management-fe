import React, { useEffect, useState } from "react";
import { MdImportContacts } from "react-icons/md";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import * as MdIcons from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeps } from "../../../shared/context/DependencyContext";

export const FormApprovalRent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fileKtp,setFileKtp] = useState([])
  const [fileNpwp,setFileNpwp] = useState([])
  const [fileBukuTabungan, setFileBukuTabungan] = useState([])
  const [fileSertifikat, setFileSertifikat] = useState([])
  const [fileFotoLokasi, setFileFotoLokasi] = useState([])
  const {rentService} = useDeps()

  const onClickBack = () => {
    navigate("/approval-data/rent", { replace: true });
  };

  const viewImg = async() => {
    for (let i = 0; i <= location.state.detail.attachment.length ; i++) {
      if (location.state.detail.attachment[i].category === "KTP") {
        try {
          const response = await rentService.getImgUrl(location.state.detail.po_id, location.state.detail.attachment[i].category);
          console.log('ini ktp', response.message);
          setFileKtp(response.message)
        } catch (e) {
          throw e;
        }
      } else if (location.state.detail.attachment[i].category === "NPWP") {
        try {
          const resp1 = await rentService.getImgUrl(location.state.detail.po_id, location.state.detail.attachment[i].category);
          console.log('ini npwp', resp1.message);
          setFileNpwp(resp1.message)
        } catch (e) {
          throw e;
        }
      } else if (location.state.detail.attachment[i].category === "Buku Tabungan") {
        try {
          const resp2 = await rentService.getImgUrl(location.state.detail.po_id, location.state.detail.attachment[i].category);
          console.log('ini buku tabungan', resp2.message);
          setFileBukuTabungan(resp2.message)
        } catch (e) {
          throw e;
        }
      } else if (location.state.detail.attachment[i].category === "Foto Lokasi") {
        try {
          const resp3 = await rentService.getImgUrl(location.state.detail.po_id, location.state.detail.attachment[i].category);
          console.log('ini foto lokasi', resp3.message);
          setFileFotoLokasi(resp3.message)
        } catch (e) {
          throw e;
        }
      } else if (location.state.detail.attachment[i].category === "Sertifikat") {
        try {
          const resp4 = await rentService.getImgUrl(location.state.detail.po_id, location.state.detail.attachment[i].category);
          console.log('ini sertif', resp4.message);
          setFileSertifikat(resp4.message)
        } catch (e) {
          throw e;
        }
      }
    }
  }

  useEffect(() => {
    viewImg();
  }, []);

  const onRejectRent = async (e, id) => {
    e.preventDefault(e)
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to reject this request",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, decline it!",
    }).then((result) => {
      
    })
  }

  return (
    <>
      <Sidebar>
        <div className="po-mtnc-form-container">
          <div className="po-mtnc-form-card">
            <form
            // onSubmit={}
            >
              <h4 className="mb-5 text-danger">
                <MdIcons.MdOutlineArrowBackIosNew
                  color="black"
                  onClick={onClickBack}
                  style={{ cursor: "pointer" }}
                />
                Purchase Order Detail
              </h4>
              <div className="formPOInput">
                <div className="row">
                  <div className="mb-3 col-md-4">
                    <label>
                      Area Code<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail["Kode Wilayah"]}
                      readOnly
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3 col-md-4">
                    <label>
                      Cluster<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.Cluster}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      TAP<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.TAP}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      User<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.User}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Position<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.Jabatan}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label>
                      Address<span className="text-danger">*</span>
                    </label>
                    <textarea
                      value={location.state.detail.alamat_lokasi}
                      className="form-control"
                      rows="3"
                      readOnly
                    ></textarea>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Item Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail["Nama Barang"]}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Type of Place<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.jenis_tempat}
                      readOnly
                      className="form-control"
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
                      value={location.state.detail.TLP}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      PLN<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.PLN}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      PAM<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.PAM}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Additional Info<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.lain_lain}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Rent Period (Month/Year)
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.masa_sewa_bulan_tahun}
                      readOnly
                      className="form-control"
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
                      value={location.state.detail.periode_sewa_awal}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Until<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.periode_sewa_akhir}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Owner's Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.nama_pemilik}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      NPWP<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.NPWP}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label>
                      Owner's Address<span className="text-danger">*</span>
                    </label>
                    <textarea
                      value={location.state.detail.alamat_pemilik}
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
                      value={location.state.detail.no_telepon_pemilik}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Rent Price/Year (Old Price if Extend)
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      value={
                        location.state.detail.harga_sewa_per_tahun_harga_lama
                      }
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Rent Price/Year (New Price)
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      value={
                        location.state.detail.harga_sewa_per_tahun_harga_baru
                      }
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Tax (10%)<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.pajak}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Amount transferred to Owner
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.nominal_transfer_ke_pemilik}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Notary<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.notaris}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Notary Services<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.jasa_notaris}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      NPWP Notary<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.NPWP_notaris}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Destination Account Name
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.nama_rekening_tujuan}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Destination Account Number
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.nomor_rekening_tujuan}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Bank Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.bank}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Branch Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.cabang_bank}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Payment Method<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.cara_pembayaran}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Due Date<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.cara_pembayaran}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <label style={{fontWeight:'500'}}>Attachment File</label>
                <div style={{minHeight:'200px', marginTop:'3vh'}} className="card">
                    <div className="card-header bg-transparent">
                      KTP
                    </div>
                    <div class="card-body">
                        
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileKtp).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  // src={item ? URL.createObjectURL(item) : null} 
                                />
                              </span>
                            )
                          })
                        }
                        </div>  
                    </div>
                  </div>
                  <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                    <div className="card-header bg-transparent">
                      NPWP
                    </div>
                    <div class="card-body">
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileNpwp).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  // src={item ? URL.createObjectURL(item) : null} 
                                  />
                              </span>
                            )
                          })
                        }
                        </div>  
                    </div>
                  </div>
                  <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                    <div className="card-header bg-transparent">
                      Savings Account
                    </div>
                    <div class="card-body">
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileBukuTabungan).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  // src={item ? URL.createObjectURL(item) : null} 
                                />
                              </span>
                            )
                          })
                        }
                        </div>  
                    </div>
                  </div>
                  <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                    <div className="card-header bg-transparent">
                      Location Photo
                    </div>
                    <div class="card-body">
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileFotoLokasi).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  // src={item ? URL.createObjectURL(item) : null} 
                                />
                              </span>
                            )
                          })
                        }
                        </div>  
                    </div>
                  </div>
                  <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                    <div className="card-header bg-transparent">
                      Certificate
                    </div>
                    <div class="card-body">
                        <div className="form-group multi-preview"> 
                        {
                          Array.from(fileSertifikat).map(item => {
                            return (
                              <span>
                                <img
                                  style={{ padding: '10px' }}
                                  width={150} height={100}
                                  // src={item ? URL.createObjectURL(item) : null} 
                                />
                              </span>
                            )
                          })
                        }
                        </div>  
                    </div>
                  </div>
                  <br/>
                  <div className="col-md-12">
                    <button
                      className="btn btn-primary float-end"
                      style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}
                    >
                      Approved
                    </button>
                    <button type="reset" className="btn btn-warning float-end"
                      style={{ marginTop: "20px" }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Sidebar>
    </>
  );
};
