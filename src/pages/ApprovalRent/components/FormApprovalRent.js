import React, { useEffect, useState } from "react";
import { MdImportContacts } from "react-icons/md";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import * as MdIcons from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeps } from "../../../shared/context/DependencyContext";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { firebaseConfig } from "../../../shared/firebaseClient";
import { Failed } from "../../../shared/components/Notification/Failed";
import { NOTIF, PUSHNOTIF, STATUS } from "../../../shared/constants";
import { UseApprovalRent } from "../UseApprovalRent";

export const FormApprovalRent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [fileKtp,setFileKtp] = useState([])
  const [fileNpwp,setFileNpwp] = useState([])
  const [fileBukuTabungan, setFileBukuTabungan] = useState([])
  const [fileSertifikat, setFileSertifikat] = useState([])
  const [fileFotoLokasi, setFileFotoLokasi] = useState([])
  const [background,setBackground] = useState([])
  const {rentService, notificationService} = useDeps();
  const {user} = UseApprovalRent()

  const onClickBack = () => {
    navigate("/approval-data/rent", { replace: true });
  };

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

  useEffect(() => {
    viewImg();
    getBackground()
  }, []);

  const [notifData, setNotifData] = useState({});
  const createNotification = async (notifPO) => {
    try {
      const response = await notificationService.createNotif(notifPO);
      setNotifData(response.data);
    } catch (e) {
      console.log(e);
    } 
  };

  // UPDATE Status PO 

  const updateStatus = async (id,status)=>{
    try {
      const response = await rentService.updateStatusRent(id,{status : status});
    } catch (e) {
      console.log(e.response);
      Failed("Failed to approved");
    }

  }

  // Approval
  const onApprovalRent = async(e, id) => {
    e.preventDefault(e);
    let myApp = initializeApp(firebaseConfig);
    const firestore = getFirestore(myApp);
    if (location.state.detail.approved_level1 === false) {
      try {
        const resp = await rentService.approvedByLevel1(id)
        let notifObj = {
          to: location.state.detail.requester,
          title: NOTIF.APPROVED.TITLE,
          body: NOTIF.APPROVED.BODY,
        };
       

        createNotification(notifObj);
        Swal.fire("Success!", "This request has been approved.", "success");
        navigate("/approval-data/rent", { replace: true });
      } catch (e) {
        console.log(e.response);
        Failed("Failed to approved");
      }
    } else if (location.state.detail.approved_level1 === true && location.state.detail.approved_level2 === false) {
      try {

        const resp = await rentService.approvedByLevel2(id)
        let notifObj = {
          to: location.state.detail.requester,
          title: NOTIF.APPROVED.TITLE,
          body: NOTIF.APPROVED.BODY,
        };

        createNotification(notifObj);
        Swal.fire("Success!", "This request has been approved.", "success");
        navigate("/approval-data/rent", { replace: true });
      } catch (e) {
        console.log(e.response);
        Failed("Failed to approved");
      }
    } else if (location.state.detail.approved_level1 === true && location.state.detail.approved_level2 === true && location.state.detail.approved_level3 === false) {
      try {
        const resp = await rentService.approvedByLevel3(id)
        let notifObj = {
          to: location.state.detail.requester,
          title: NOTIF.APPROVED.TITLE,
          body: NOTIF.APPROVED.BODY,
        };
        location.state.detail.status = STATUS.APPROVE_GA_IT
        updateStatus(location.state.detail.po_id,location.state.detail.status)

        createNotification(notifObj);
        Swal.fire("Success!", "This request has been approved.", "success");
        navigate("/approval-data/rent", { replace: true });
      } catch (e) {
        console.log(e.response);
        Failed("Failed to approved");
      }
    }
  }

  // Reject
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
      if (result.isConfirmed) {
        const reject = async () => {
          try {
            await rentService.deleteRent(id);

            let notifObj = {
              to: location.state.detail.requester,
              title: NOTIF.REJECTED.TITLE,
              body: NOTIF.REJECTED.BODY,
            };
            createNotification(notifObj);
            Swal.fire("Reject!", "This request has been rejected.", "success");
            navigate("/approval-data/rent", { replace: true });
          } catch (e) {
            console.log(e.response);
            Failed("Failed to reject");;
        } 
      }
      reject(); 
    }
    });
  }

  const moveToPDF = () => {
    navigate("/approval-data/rent/pdf", { state: { detail: location.state.detail}})
  }

  return (
    <>
      <Sidebar>
        <div className="po-mtnc-form-container">
          <div className="po-mtnc-form-card">
            <form
            onSubmit={(e)=>{onApprovalRent(e,location.state.detail.po_id)}}
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
                    <input
                      value={location.state.detail.Cluster}
                      readOnly
                      className="form-control"
                    />
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
                      readOnly
                    ></textarea>
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
                    <label> Existing Facilities : </label>
                  </div>
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                      TLP<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.TLP}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                      PLN<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.PLN}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
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
                      Additional Info<span className="text-danger">*</span>
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
                    <label> Rent Period: </label>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      From<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.periode_sewa_awal}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
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
                      name="alamat_pemilik"
                    ></textarea>
                  </div>
                  
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Rent Price (Old Price if Extend)
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
                  <div className="mb-3 col-md-6">
                    <label style={{fontWeight:'500'}}>
                      Rent Price (New Price)
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
                      Amount transferred to Owner
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.nominal_transfer_ke_pemilik}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  {/* <div className="mb-3 col-md-4">
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
                    <label style={{fontWeight:'500'}}>
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
                    <label style={{fontWeight:'500'}} >
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
                                  src={item} 
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
                                  src={item} 
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
                                  src={item} 
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
                                  src={item} 
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
                                  src={item} 
                                />
                              </span>
                            )
                          })
                        }
                        </div>  
                    </div>
                  </div>
                  <br/>
                  {((location.state.detail.approved_level1 === false && location.state.detail.approved_level2 === false && location.state.detail.approved_level3 === false && location.state.userApprov === 'GM') 
                    || (location.state.detail.approved_level1 === true && location.state.detail.approved_level2 === false && location.state.detail.approved_level3 === false && location.state.userApprov === 'VP_TRAD') 
                    || (location.state.detail.approved_level1 === true && location.state.detail.approved_level2 === true && location.state.detail.approved_level3 === false && location.state.userApprov === 'GA')) ?
                    (
                      <div className="col-md-12">
                        <button
                          className="btn btn-primary float-end"
                          style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}
                          
                        >
                          Approve
                        </button>
                        <button type="reset" className="btn btn-warning float-end"
                          style={{ marginTop: "20px" }}
                          onClick={(e) => onRejectRent(e, location.state.detail.po_id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : ( <div> 
                  </div>)
                  } 
                  {(user.role=="GA" && location.state.detail.approved_level3 === true &&
                   <div>
                   <button style={{ marginTop: "20px", width:'200px'}}  className="btn btn-danger float-end" onClick={moveToPDF}>
                     View PDF
                   </button>
                   </div> 
                  )}
                                
                </div>
              </div>
            </form>
          </div>
        </div>
      </Sidebar>
    </>
  );
};
