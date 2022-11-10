import React, { useEffect, useState } from "react";
import { useAuth } from "../../../services/UseAuth";
import { useDeps } from "../../../shared/context/DependencyContext";
import "./FormPOMaintenance.css";
import swal from "sweetalert";
import { NOTIF, PUSHNOTIF, STATUS } from "../../../shared/constants";
import { Failed } from "../../../shared/components/Notification/Failed";
import { firebaseConfig } from "../../../shared/firebaseClient";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export const FormPOMaintenance = () => {
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
        type: NOTIF.TYPE.PURCHASE_MAINTENANCE,
        resource_id : response.data.po_id
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
                    readOnly
                    defaultValue={user.location_id}
                    type="text"
                    name="Kode Wilayah"
                    className="form-control"
                  />
                </div>
                <div className="mb-3 col-md-4">
                  <label>
                    To User<span className="text-danger">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="ToUser"
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3 col-md-4">
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
                <div className="inputBoxPO mb-3 col-md-6 ">
                  <label>
                    Subproduct Name
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <select
                    required
                    name="Jenis Produk"
                    value={data["Jenis Produk"]}
                    onChange={handleChange}
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
                <div className="mb-3 col-md-6 ">
                  <label>
                    Type
                    <span className="text-danger">*</span>{" "}
                  </label>
                  <input
                    readOnly
                    value="Maintenance"
                    type="text"
                    name="tipe"
                    className="form-control"
                  />
                </div>

                {POdata.map((form, index) => {
                  return (
                    <div key={index}>
                      <div className="row">
                        <div className="inputBoxPO mb-3">
                          <label>
                            Item Name
                            <span className="text-danger">*</span>{" "}
                          </label>
                          <input
                            required
                            type="text"
                            name="Nama Barang"
                            placeholder="Item Name"
                            onChange={(event) => handleFormChange(event, index)}
                            className="form-control"
                          />
                        </div>

                        <div className="inputBoxPO mb-3 col-md-6 ">
                          <label>
                            1<span className="subscript">st</span> Vendor
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            required
                            name="vendor_1"
                            value={form.vendor_1}
                            onChange={(event) => handleFormChange(event, index)}
                          >
                            <option value="">Select Vendor</option>
                            {vendor &&
                              vendor.map((item) => {
                                if (
                                  form.vendor_2 == item.name ||
                                  form.vendor_3 == item.name
                                ) {
                                  return null;
                                } else {
                                  return (
                                    <option key={item.name} value={item.name}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              })}
                          </select>
                        </div>
                        <div className="inputBoxPO mb-3 col-md-6">
                          <label>
                            1<span className="subscript">st</span> Item Price
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            required
                            type="number"
                            min="0"
                            name="item_price_1"
                            placeholder="Item Price 1"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.item_price_1}
                          />
                        </div>

                        <div className="inputBoxPO mb-3 col-md-6 ">
                          <label>
                            2<span className="subscript">nd</span> Vendor
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            required
                            name="vendor_2"
                            value={form.vendor_2}
                            onChange={(event) => handleFormChange(event, index)}
                          >
                            <option value="">Select Vendor</option>
                            {vendor &&
                              vendor.map((item) => {
                                if (
                                  form.vendor_1 == item.name ||
                                  form.vendor_3 == item.name
                                ) {
                                  return null;
                                } else {
                                  return (
                                    <option key={item.name} value={item.name}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              })}
                          </select>
                        </div>
                        <div className="inputBoxPO mb-3 col-md-6">
                          <label>
                            2<span className="subscript">nd</span> Item Price
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            required
                            type="number"
                            min="0"
                            name="item_price_2"
                            placeholder="Item Price 2"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.item_price_2}
                          />
                        </div>

                        <div className="inputBoxPO mb-3 col-md-6 ">
                          <label>
                            3<span className="subscript">st</span> Vendor
                          </label>
                          <select
                            name="vendor_3"
                            value={form.vendor_3}
                            onChange={(event) => handleFormChange(event, index)}
                          >
                            <option value="">Select Vendor</option>
                            {vendor &&
                              vendor.map((item) => {
                                if (
                                  form.vendor_2 == item.name ||
                                  form.vendor_1 == item.name
                                ) {
                                  return null;
                                } else {
                                  return (
                                    <option key={item.name} value={item.name}>
                                      {item.name}
                                    </option>
                                  );
                                }
                              })}
                          </select>
                        </div>
                        <div className="inputBoxPO mb-3 col-md-6">
                          <label>
                            3<span className="subscript">rd</span> Item Price
                          </label>
                          <input
                            type="number"
                            min="0"
                            name="item_price_3"
                            placeholder="Item Price 3"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form.item_price_3}
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-4">
                          <label>
                            Quantity
                            <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            placeholder="Quantity"
                            value={1}
                            readOnly
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-4">
                          <label>
                            PPN
                            <span className="text-danger">*</span>
                          </label>
                          <select
                            required
                            name="ppn"
                            value={form.ppn}
                            onChange={(event) => handleFormChange(event, index)}
                            style={{ width: "95%" }}
                          >
                            <option value="">Select Condition</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                          </select>
                        </div>
                        <div className="inputBoxPO mb-3 col-md-4">
                          <label>Additional Cost</label>
                          <input
                            type="number"
                            min="0"
                            name="Biaya Lain-Lain"
                            placeholder="Additional Cost"
                            onChange={(event) => handleFormChange(event, index)}
                            value={form["Biaya Lain-Lain"]}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
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
