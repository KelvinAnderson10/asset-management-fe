import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDeps } from '../../../shared/context/DependencyContext';
import * as MdIcons from "react-icons/md";
import "./FormViewRent.css"
import Sidebar from '../../../shared/components/Sidebar/Sidebar';

export const FormViewRent = () => {
  const location = useLocation();
  const {rentService} = useDeps();
  const navigate = useNavigate();
  const [fileKtp,setFileKtp] = useState([])
  const [fileNpwp,setFileNpwp] = useState([])
  const [fileBukuTabungan, setFileBukuTabungan] = useState([])
  const [fileSertifikat, setFileSertifikat] = useState([])
  const [fileFotoLokasi, setFileFotoLokasi] = useState([])
  const [background,setBackground] = useState([])
  const onClickBack = () => {
    navigate("/purchase-request/rent", { replace: true });
  };

  const getBackground = async ()=>{
    try {
      for(let i = 0; i <= location.state.detail.background.length ; i++){
        const response = await rentService.getBackground(location.state.detail.po_id)
        console.log('ini response bg', response);
        setBackground(response.data)
      }
      
    } catch (e) {
      console.log(e);
    }
  }
  const viewImg = async() => {
    try {
      for (let i = 0; i <= location.state.detail.attachment.length ; i++) {
        switch (location.state.detail.attachment[i].category) {
          case "KTP":
            const resp = await rentService.getImgUrl(location.state.detail.po_id, "KTP")
            setFileKtp(resp.message)
            break;
          case "NPWP" :
            const resp1 = await rentService.getImgUrl(location.state.detail.po_id, "NPWP")
            setFileNpwp(resp1.message)
            break;
          case "Buku Tabungan" :
            const resp2 = await rentService.getImgUrl(location.state.detail.po_id, "Buku Tabungan")
            setFileBukuTabungan(resp2.message)
            break;
          case "Foto Lokasi" :
            const resp3 = await rentService.getImgUrl(location.state.detail.po_id, "Foto Lokasi" )
            setFileFotoLokasi(resp3.message)
            break;
          case "Sertifikat":
            const resp4 = await rentService.getImgUrl(location.state.detail.po_id, "Sertifikat")
            setFileSertifikat(resp4.message)
          default:
            break;
        }
        
      }
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    viewImg();
    getBackground();
  }, []);
    return (    
    <>
    <Sidebar>

    
        <div className="po-rent-view-form-container">
          <div className="po-rent-view-form-card">
            <form >
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
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Area Code<span className="text-danger">*</span>
                    </label>
                    <input
                     value={location.state.detail["Kode Wilayah"]}
                     readOnly
                     className="form-control"
                      
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Cluster<span className="text-danger">*</span>
                    </label>
                    <input  value={location.state.detail.Cluster}
                      readOnly
                      className="form-control" />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      TAP<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.TAP}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Regional<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.regional}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className='mb-3'>
                  <label style={{fontWeight:'500'}}>
                      About<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.Perihal}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className='mb-3'>
                  <label style={{fontWeight:'500'}}>
                      Reason<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.Alasan}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      User<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.User}
                      readOnly
                      className="form-control"
                      
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Position<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.Jabatan}
                      readOnly
                      className="form-control"
                     
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label style={{fontWeight:'500'}}>
                      Address<span className="text-danger">*</span>
                    </label>
                    <textarea   
                    value={location.state.detail.alamat_lokasi}
                      className="form-control"
                      rows="3"
                      readOnly></textarea>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Item Name<span className="text-danger">*</span>
                    </label>
                    <input
                     value={location.state.detail["Nama Barang"]}
                     readOnly
                     className="form-control"
                     
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Type of Place<span className="text-danger">*</span>
                    </label>
                    <input
                     value={location.state.detail.jenis_tempat}
                     readOnly
                     className="form-control"
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
                    <label style={{fontWeight:'500'}}>
                      Additional Info
                    </label>
                    <input
                     value={location.state.detail.lain_lain}
                     readOnly
                     className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Rent Period (Month)
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
                    <label style={{fontWeight:'500'}}> Rent Period: </label>
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
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                      Owner's Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.nama_pemilik}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                      NPWP<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.NPWP}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                      Owner's Phone<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.no_telepon_pemilik}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-12">
                    <label style={{fontWeight:'500'}}>
                      Owner's Address<span className="text-danger">*</span>
                    </label>
                    <textarea
                      value={location.state.detail.alamat_pemilik}
                      className="form-control"
                      rows="3"
                      readOnly
                    ></textarea>
                  </div>
                  
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Rent Price (Old Price if Extend)<span className="text-danger">*</span>
                    </label>
                    <input
                      value={
                        location.state.detail.harga_sewa_per_tahun_harga_lama
                      }
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Rent Price (New Price)<span className="text-danger">*</span>
                    </label>
                    <input
                      value={
                        location.state.detail.harga_sewa_per_tahun_harga_baru
                      }
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Tax<span className="text-danger">*</span>
                    </label>
                    <input
                     value={location.state.detail.total_pajak}
                     readOnly
                     className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                    Amount transferred to Owner<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.nominal_transfer_ke_pemilik}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  {/* <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                      Notary<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.notaris}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                      Notary Services<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.jasa_notaris}
                      readOnly
                      className="form-control"
                    
                    />
                  </div> */}
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                   NPWP Notary<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.NPWP_notaris}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                   Destination Account Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.nama_rekening_tujuan}
                      readOnly
                      className="form-control"
                     
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                   Destination Account Number<span className="text-danger">*</span>
                    </label>
                    <input
                     value={location.state.detail.nomor_rekening_tujuan}
                     readOnly
                     className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                   Bank Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.bank}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                   Branch Name<span className="text-danger">*</span>
                    </label>
                    <input
                     value={location.state.detail.cabang_bank}
                     readOnly
                     className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                    Payment Method<span className="text-danger">*</span>
                    </label>
                    <input
                       value={location.state.detail.cara_pembayaran}
                       readOnly
                       className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                    Due Date<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.tanggal_jatuh_tempo}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="">
                  <label style={{fontWeight:'500'}} >
                      Background<span className="text-danger">*</span>
                    </label>
                  </div>
                  {background.map((form,index)=>{
                    return(
                      <div key={form.background_id}>
                        <div className="mb-3">
                        <input  readOnly
                      className="form-control" value={form.background_list}/>
                        </div>
                      
                      </div>
                      
                    )
                  })}
                  <label style={{fontWeight:'500'}}>Attachment File</label>
                          <div style={{minHeight:'200px'}} className="card">
                      <div className="card-header bg-transparent">
                        KTP <span className="text-danger">*</span>
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
                                    src={item} />
                                </span>
                              )
                            })
                          }
                          </div>
                      </div>
                    </div>
                    <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                      <div className="card-header bg-transparent">
                        NPWP <span className="text-danger">*</span>
                      </div>
                      <div class="card-body">
                          <div>
                          </div>
                          <div className="form-group multi-preview"> 
                          {
                            Array.from(fileNpwp).map(item => {
                              return (
                                <span>
                                  <img
                                    style={{ padding: '10px' }}
                                    width={150} height={100}
                                    src={item} />
                                </span>
                              )
                            })
                          }
                          </div>  
                      </div>
                    </div>
                    <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                      <div className="card-header bg-transparent">
                        Savings Account <span className="text-danger">*</span>
                      </div>
                      <div class="card-body">
                          <div>
                          </div>
                          <div className="form-group multi-preview"> 
                          {
                            Array.from(fileBukuTabungan).map(item => {
                              return (
                                <span>
                                  <img
                                    style={{ padding: '10px' }}
                                    width={150} height={100}
                                    src={item} />
                                </span>
                              )
                            })
                          }
                          </div>  
                         
                      </div>
                    </div>
                    <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                      <div className="card-header bg-transparent">
                        Location Photo <span className="text-danger">*</span>
                      </div>
                      <div class="card-body">
                          <div>
                          </div>
                          <div className="form-group multi-preview"> 
                          {
                            Array.from(fileFotoLokasi).map(item => {
                              return (
                                <span>
                                  <img
                                    style={{ padding: '10px' }}
                                    width={150} height={100}
                                    src={item} />
                                </span>
                              )
                            })
                          }
                          </div>  
                         
                      </div>
                    </div>
                    <div style={{minHeight:'200px', marginTop:'5vh'}} className="card">
                      <div className="card-header bg-transparent">
                        Certificate <span className="text-danger">*</span>
                      </div>
                      <div class="card-body">
                          <div>
                          </div>
                          <div className="form-group multi-preview"> 
                          {
                            Array.from(fileSertifikat).map(item => {
                              return (
                                <span>
                                  <img
                                    style={{ padding: '10px' }}
                                    width={150} height={100}
                                    src={item} />
                                </span>
                              )
                            })
                          }
                          </div>  
                         
                      </div>
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        </Sidebar>
      </>
    );
}
