import React, { useEffect, useState } from "react";
import { useAuth } from "../../../services/UseAuth";
import { useDeps } from "../../../shared/context/DependencyContext";
import "./FormPORent.css";
import swal from "sweetalert";
import { NOTIF, PUSHNOTIF, STATUS } from "../../../shared/constants";
import { Failed } from "../../../shared/components/Notification/Failed";
import { firebaseConfig } from "../../../shared/firebaseClient";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export const FormPORent = () => {
  const [POdata, setPOData] = useState([
    {
      ["Nama Barang"]: "",
      vendor_1: "",
      vendor_2: "",
      vendor_3: "",
      item_price_1: "",
      item_price_2: "",
      item_price_3: "",
      quantity: 1,
      ppn: "",

      ["Biaya Lain-Lain"]: "",
    },
  ]);

  const [POHeader, setPOHeader] = useState({
    PurchaseOrderDetail: [],
    tipe: "Maintenance",
  });

  const [data, setData] = useState([]);
  const [subProductName, setSubProductName] = useState([]);
  const {
    assetItemService,
    vendorService,
    notificationService,
    purchaseOrderService,
    userService,
  } = useDeps();

  useEffect(() => {
    onGetAllSubProduct();
    onGetAllVendor();
    onGetCookie();
  }, []);

  const handleChange = (e) => {
    const newData = { ...POHeader };
    newData[e.target.name] = e.target.value;
    setPOHeader(newData);
  };

  const handleFormChange = (event, index) => {
    let data = [...POdata];
    data[index][event.target.name] = event.target.value;
    setPOData(data);
  };
  const [notifData, setNotifData] = useState({});

  const createNotification = async (notifPO) => {
    try {
      const response = await notificationService.createNotif(notifPO);
      setNotifData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const createPushNotification = async (notifPO) => {
    try {
      const response = await notificationService.createPushNotif(notifPO);
      setNotifData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitPO = async (e) => {
    e.preventDefault();
    try {
      POHeader["Kode Wilayah"] = user.location_id;
      POHeader["requester"] = user.name;
      POHeader["tipe"] = "Maintenance";
      POHeader.status = STATUS.CREATE_PO;
      for (let i in POdata) {
        POdata[i].item_price_1 = Number(POdata[i].item_price_1);
        POdata[i].item_price_2 = Number(POdata[i].item_price_2);
        POdata[i].item_price_3 = Number(POdata[i].item_price_3);
        POdata[i].quantity = Number(POdata[i].quantity);
        POdata[i].ppn = Number(POdata[i].ppn);
        POdata[i].ppn = Boolean(POdata[i].ppn);
        POdata[i]["Biaya Lain-Lain"] = Number(POdata[i]["Biaya Lain-Lain"]);
      }
      POHeader.PurchaseOrderDetail = [...POdata];
      const response = await purchaseOrderService.createPO(POHeader);
      handleClearForm();
      let myApp = initializeApp(firebaseConfig);
      const firestore = getFirestore(myApp);
      if (response.status === "SUCCESS") {
        swal({
          title: "Success!",
          text: "Your request has been made!",
          icon: "success",
          button: "OK!",
        });
      }
      const userMobile = await userService.getUserByName(
        response.data.approver_level1
      );

      let pushNotifObj = {
        to: userMobile.data.token,
        title: `${PUSHNOTIF.REQUEST.TITLE} ${response.data.approver_level1}`,
        body: `${PUSHNOTIF.REQUEST.BODY} ${user.name}`,
      };
      createPushNotification(pushNotifObj);

      await setDoc(doc(firestore, "notifications", String(Date.now())), {
        to: userMobile.data.name,
        user_token: userMobile.data.token,
        title: PUSHNOTIF.REQUEST.TITLE + userMobile.data.name,
        body: PUSHNOTIF.REQUEST.BODY + user.name,
      });

      let notifObj = {
        to: response.data.approver_level1,
        title: NOTIF.REQUEST.TITLE,
        body: `${NOTIF.REQUEST.BODY} ${user.name}`,
      };
      createNotification(notifObj);
      e.target.reset();
    } catch (error) {
      console.log(error);
      Failed("Your request failed to made");
    }
  };

  // GET ALL SUBPRODUCT NAME
  const onGetAllSubProduct = async () => {
    try {
      const response = await assetItemService.getAllAsset();
      setSubProductName(response.data);
    } catch (e) {
      console.log(e);
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
    }
  };

  //Get User
  const { getCookie } = useAuth();
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

  const handleClearForm = () => {
    setPOHeader({});
    setPOData([{}]);
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
                    type="text"
                    name="Kode Wilayah"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    Cluster<span className="text-danger">*</span>
                  </label>
                  <input type="text" name="Cluster" className="form-control" />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    TAP<span className="text-danger">*</span>
                  </label>
                  <input
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
                  <textarea className="form-control" rows="3"></textarea>
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
                    Additional Info<span className="text-danger">*</span>
                  </label>
                  <input
                    required
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
                    name="periode_sewa"
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
                    name="periode_sewa"
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
                    name="cara_pembayaran"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>


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
