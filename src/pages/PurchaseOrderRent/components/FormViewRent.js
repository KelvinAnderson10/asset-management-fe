import React from 'react'

export const FormViewRent = () => {
    return (    <>
        <div className="po-rent-view-form-container">
          <div className="po-rent-view-form-card">
            <form onSubmit={onSubmitPO}>
              <h4 className="mb-4 text-danger">Purchase Order Request Form</h4>
              <p><span className="text-danger">*</span> required fields</p>
              <div className="formPOInput">
                <div className="row">
                  <div className="mb-3 col-md-4">
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
                  <div className="mb-3 col-md-4">
                    <label style={{fontWeight:'500'}}>
                      Cluster<span className="text-danger">*</span>
                    </label>
                    <input readOnly defaultValue={user.cluster} type="text" name="Cluster" className="form-control" />
                  </div>
                  <div className="mb-3 col-md-4">
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
                    <textarea value={alamatLokasi}  name="alamat_lokasi" onChange={(e)=>setAlamatLokasi(e.target.value)} required className="form-control" rows="3"></textarea>
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
                  <div className="mb-3 col-md-6">
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
                  <div className="mb-3 col-md-6">
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
                    <label style={{fontWeight:'500'}}>
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
                    <label style={{fontWeight:'500'}}>
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
                    <label style={{fontWeight:'500'}}>
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
                    <label style={{fontWeight:'500'}}>
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
                  </div>
                  <div className="mb-3 col-md-4">
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
                  <div className="mb-3 col-md-6">
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
                  <div className="mb-3 col-md-6">
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
                  <div className="mb-3 col-md-6">
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
                  <label style={{fontWeight:'500'}}>Attachment File</label>
                  <div className="file-extension">
                      <p  style={{fontSize:'15px', color:'rgb(255, 178, 0)'}}>Allowed file types : <b>png, jpg, jpeg</b><br></br> Maximum size of each attachment is 2MB</p>
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
}
