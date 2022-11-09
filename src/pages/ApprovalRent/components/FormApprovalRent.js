import React, { useEffect, useState } from "react";
import { MdImportContacts } from "react-icons/md";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import * as MdIcons from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { UseApprovalRent } from "../UseApprovalRent";
import { useDeps } from "../../../shared/context/DependencyContext";

export const FormApprovalRent = () => {
  const { user, rentDetail } = UseApprovalRent();
  // const [rentDetail, setrentDetail] = useState([])
  const { rentService } = useDeps();
  const navigate = useNavigate();
  const location = useLocation();

  const onClickBack = () => {
    navigate("/approval-data/rent", { replace: true });
  };

  // const handleGetRentDetail = async (id) => {
  //   try {
  //     const response = await rentService.getRentById(id);
  //     console.log("ini rent detail ya ges", response.data);
  //     setrentDetail(response.data);
  //   } catch (error) {
  //     alert("Oops")
  //   }
  // };

  useEffect(() => {
    console.log("ini rent detail", rentDetail);
    // handleGetRentDetail();
  }, []);

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
                      type="text"
                      name="Kode Wilayah"
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
                      type="text"
                      name="Cluster"
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
                      value={location.state.detail.User}
                      readOnly
                      type="text"
                      name="User"
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
                      type="text"
                      name="Jabatan"
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
                      type="text"
                      name="Nama Barang"
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
                      type="text"
                      name="jenis_tempat"
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
                      type="text"
                      name="TLP"
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
                      type="text"
                      name="PLN"
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
                      type="text"
                      name="PAM"
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
                      type="text"
                      name="lain_lain"
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
                      type="text"
                      name="masa_sewa_bulan_tahun"
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
                      // type="date"
                      name="periode_sewa"
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
                      // type="date"
                      name="periode_sewa"
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
                      type="text"
                      name="nama_pemilik"
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
                      type="text"
                      name="NPWP"
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
                      // type="number"
                      name="no_telepon_pemilik"
                      className="form-control"
                      />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Rent Price/Year (Old Price if Extend)
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.harga_sewa_per_tahun_harga_lama}
                      readOnly
                      // type="number"
                      name="harga_sewa_per_tahun_harga_lama"
                      className="form-control"
                      />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Rent Price/Year (New Price)
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.detail.harga_sewa_per_tahun_harga_baru}
                      readOnly
                      // type="number"
                      name="harga_sewa_per_tahun_harga_baru"
                      className="form-control"
                      />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Tax (10%)<span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.pajak}
                      readOnly
                      // type="number"
                      name="pajak"
                      className="form-control"
                      />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Amount transferred to Owner
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="number"
                      name="nominal_transfer_ke_pemilik"
                      className="form-control"
                      />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Notary<span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="text"
                      name="notaris"
                      className="form-control"
                      />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Notary Services<span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="text"
                      name="jasa_notaris"
                      className="form-control"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      NPWP Notary<span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="text"
                      name="NPWP_notaris"
                      className="form-control"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Destination Account Name
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="text"
                      name="nama_rekening_tujuan"
                      className="form-control"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Destination Account Number
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="text"
                      name="nomor_rekening_tujuan"
                      className="form-control"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Bank Name<span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="text"
                      name="bank"
                      className="form-control"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Branch Name<span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="text"
                      name="cabang_bank"
                      className="form-control"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Payment Method<span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="text"
                      name="cara_pembayaran"
                      className="form-control"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label>
                      Due Date<span className="text-danger">*</span>
                    </label>
                    <input
                      // value={location.state.detail.}
                      readOnly
                      type="date"
                      name="cara_pembayaran"
                      className="form-control"
                      // onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-12">
                    <button
                      className="btn btn-primary float-end"
                      style={{ marginLeft: "20px", marginRight: "20px" }}
                    >
                      Approved
                    </button>
                    <button type="reset" className="btn btn-warning float-end">
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
