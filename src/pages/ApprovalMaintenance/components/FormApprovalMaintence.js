import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeps } from "../../../shared/context/DependencyContext";
import { UseApprovalMaintenance } from "../UseApprovalMaintenance";
import Swal from "sweetalert2";
import { Failed } from "../../../shared/components/Notification/Failed";
import { NOTIF, PUSHNOTIF, STATUS } from "../../../shared/constants";
import * as MdIcons from "react-icons/md";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import { firebaseConfig } from "../../../shared/firebaseClient";
import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

export const FormApprovalMaintence = () => {
  const { user, setpoDetail, setPOHeader } = UseApprovalMaintenance();
  const {
    vendorService,
    notificationService,
    purchaseOrderService,
    generalSettingService,
    userService,
  } = useDeps();

  const handleFormChange = (event, index) => {
    const newArray = location.state.detail.map((item, i) => {
      if (index === i) {
        if (event.target.value == 1) {
          item.vendor_selected = item.vendor_1;
          item.item_price_selected = item.item_price_1;
        } else if (event.target.value == 2) {
          item.vendor_selected = item.vendor_2;
          item.item_price_selected = item.item_price_2;
        } else {
          item.vendor_selected = item.vendor_3;
          item.item_price_selected = Number(item.item_price_3);
        }

        return { ...item, [event.target.name]: event.target.value };
      } else {
        return item;
      }
    });
    setpoDetail(newArray);
    setPOHeader(location.state.header);
  };

  const [vendor, setVendor] = useState([]);
  const onGetAllVendor = async () => {
    try {
      const response = await vendorService.getAllVendor();
      setVendor(response.data);
    } catch (e) {
      console.log(e);
    } 
  };
  const location = useLocation();

  useEffect(() => {
    onGetAllVendor();
  }, []);

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate("/approval-data/maintenance", { replace: true });
  };

  //Reject
  const onRejectPO = async (e, id) => {
    e.preventDefault(e);
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
              await purchaseOrderService.deletePO(id);
              
              const userMobile = await userService.getUserByName(
                location.state.header.requester
              );
              let pushNotifObj = {
                to: userMobile.data.token,
                title: `${PUSHNOTIF.REJECTED.TITLE} ${location.state.header.requester}`,
                body: PUSHNOTIF.REJECTED.BODY,
              };
              createPushNotification(pushNotifObj);

              let myApp = initializeApp(firebaseConfig);
              const firestore = getFirestore(myApp);
              await setDoc(doc(firestore, "notifications", String(Date.now())), {
                to: userMobile.data.name,
                user_token: userMobile.data.token,
                title: PUSHNOTIF.REJECTED.TITLE + userMobile.data.name,
                body: PUSHNOTIF.REJECTED.BODY + user.name,
              });

              let notifObj = {
                to: location.state.header.requester,
                title: NOTIF.REJECTED.TITLE,
                body: NOTIF.REJECTED.BODY,
                type : NOTIF.TYPE.PURCHASE_MAINTENANCE,
                resource_id : location.state.header.po_id,
              };
              createNotification(notifObj);
              Swal.fire("Reject!", "This request has been rejected.", "success");
              navigate("/approval-data/maintenance", { replace: true });
            } catch (e) {
              console.log(e.response);
              Failed("Failed to reject");;
          } 
        }
        reject(); 
      }
    });
  };

  useEffect(() => {
    onApproved();
    onGetGeneralSetting();
  }, []);

  //Edit Status
  const updateStatus = async (id, status) => {
    try {
      const response = await purchaseOrderService.updatePO(id, status);
      setPOHeader(response.data);
    } catch (e) {
      console.log(e.response);
      Failed("Failed to approved");
    }
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

  //Approval
  const onApproved = async (e, id) => {
    e.preventDefault(e);
    try {
      for (let i in location.state.detail) {
        location.state.detail[i].ppn = Number(location.state.detail[i].ppn);
        location.state.detail[i].ppn = Boolean(location.state.detail[i].ppn);
        location.state.detail[i].is_asset = Number(
          location.state.detail[i].is_asset
        );
        location.state.detail[i].is_asset = Boolean(
          location.state.detail[i].is_asset
        );
        location.state.detail[i].item_price_selected = Number(
          location.state.detail[i].item_price_selected
        );
        if (
          location.state.detail[i].item_price_selected >= setting.minimum_asset
        ) {
          location.state.detail[i].is_asset = true;
        }
        location.state.detail[i].item_price_3 = Number(
          location.state.detail[i].item_price_3
        );

        const response = await purchaseOrderService.updatePODetail(
          location.state.detail[i].po_id_detail,
          location.state.detail[i]
        );
      }
    } catch (e) {
      console.log(e.response);
      Failed("Failed to approved");
    } finally {
      let myApp = initializeApp(firebaseConfig);
      const firestore = getFirestore(myApp);
      if (location.state.header.approverLevel3 == "-") {
        try {
          const response = await purchaseOrderService.approvedByLevel2(id);
          location.state.header.status = STATUS.APPROVE_GA_IT;

          setPOHeader(location.state.header);
          updateStatus(id, { status: STATUS.APPROVE_GA_IT });

          const userMobile = await userService.getUserByName(
            location.state.header.requester
          );
          let pushNotifObj = {
            to: userMobile.data.token,
            title: `${PUSHNOTIF.APPROVED.TITLE} ${location.state.header.requester}`,
            body: PUSHNOTIF.APPROVED.BODY,
          };
          createPushNotification(pushNotifObj);

          await setDoc(doc(firestore, "notifications", String(Date.now())), {
            to: userMobile.data.name,
            user_token: userMobile.data.token,
            title: PUSHNOTIF.APPROVED.TITLE + userMobile.data.name,
            body: PUSHNOTIF.APPROVED.BODY + user.name,
          });

          let notifObj = {
            to: location.state.header.requester,
            title: NOTIF.APPROVED.TITLE,
            body: NOTIF.APPROVED.BODY,
            type : NOTIF.TYPE.PURCHASE_MAINTENANCE,
            resource_id : location.state.header.po_id,
          };

          createNotification(notifObj);
          Swal.fire("Success!", "This request has been approved.", "success");
          navigate("/approval-data/maintenance", { replace: true });
        } catch (e) {
          console.log(e.response);
          Failed("Failed to approved");
        }
      } else {
        try {
          const response = await purchaseOrderService.approvedByLevel3(id);
          updateStatus(id, { status: STATUS.APPROVE_GA_IT });

          const userMobile = await userService.getUserByName(
            location.state.header.requester
          );

          let pushNotifObj = {
            to: userMobile.data.token,
            title:PUSHNOTIF.APPROVED.TITLE + `${location.state.header.requester}`,
            body: PUSHNOTIF.APPROVED.BODY,
          };
          createPushNotification(pushNotifObj);

          await setDoc(doc(firestore, "notifications", String(Date.now())), {
            to: userMobile.data.name,
            user_token: userMobile.data.token,
            title: PUSHNOTIF.APPROVED.TITLE + userMobile.data.name,
            body: PUSHNOTIF.APPROVED.BODY + user.name,
          });

          let notifObj = {
            to: location.state.header.requester,
            title: NOTIF.APPROVED.TITLE,
            body: NOTIF.APPROVED.BODY,
            type : NOTIF.TYPE.PURCHASE_MAINTENANCE,
            resource_id : location.state.header.po_id,
          };
          createNotification(notifObj);

          Swal.fire("Success!", "This request has been approved.", "success");
          navigate("/approval-data/maintenance", { replace: true });
        } catch (e) {
          console.log(e.response);
          Failed("Failed to approved");
        }
      }
    }
  };

  //Setting
  const [setting, setSetting] = useState({});
  const onGetGeneralSetting = async () => {
    try {
      const response = await generalSettingService.getGeneralSetting();
      setSetting(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Sidebar>
        <div className="po-app-form-container">
          <div className="po-app-form-card">
            <form onSubmit={(e) => onApproved(e, location.state.header.id)}>
              <h4 className="mb-5 text-danger">
                {" "}
                <MdIcons.MdOutlineArrowBackIosNew
                  color="black"
                  onClick={onClickBack}
                  style={{ cursor: "pointer" }}
                />{" "}
                Purchase Order Detail
              </h4>
              <div className="formPOInput">
                <div className="row">
                  <div className="mb-3 col-md-4">
                    <label>
                      Area Code<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.header.kodeWilayah}
                      readOnly
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
                      type="text"
                      name="ToUser"
                      className="form-control"
                      value={location.state.header.toUser}
                    />
                  </div>
                  <div className="mb-3 col-md-4">
                    <label>
                      Position<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="Jabatan"
                      className="form-control"
                      value={location.state.header.jabatan}
                    />
                  </div>
                  <div className="inputBoxPO mb-3 col-md-6 ">
                    <label>Subproduct Name</label>
                    <input
                      value={location.state.header.jenisProduk}
                      type="text"
                      name="Jenis Produk"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6 ">
                    <label>Type</label>
                    <input
                      readOnly
                      value={location.state.header.tipe}
                      type="text"
                      name="tipe"
                      className="form-control"
                    />
                  </div>
                  {location.state.detail.map((form, index) => {
                    return (
                      <div key={form.po_id_detail}>
                        <div className="row">
                          <div className="inputBoxPO mb-3">
                            <label>Item Name</label>
                            <input
                              readOnly
                              name="Nama Barang"
                              placeholder="Item Name"
                              value={form["Nama Barang"]}
                            />
                          </div>
                          <div className="inputBoxPO mb-3">
                            <label>PO ID Detail</label>
                            <input
                              readOnly
                              name="po_id_detail"
                              placeholder="PO ID Detail"
                              value={form.po_id_detail}
                            />
                          </div>
                          <label
                            style={{ marginBottom: "10px", color: "gray" }}
                          >
                            Select your option
                          </label>
                          <div className="checkBox col-md-1">
                            <input
                              required
                              type="radio"
                              name={`vendor_selected${index}`}
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={1}
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-6 ">
                            <label>
                              1<span className="subscript">st</span> Vendor
                              <span className="text-danger">*</span>
                            </label>

                            <input
                              readOnly
                              defaultValue={form.vendor_1}
                              type="text"
                              name="vendor_1"
                              className="form-control"
                            />
                          </div>

                          <div className="inputBoxPO  mb-3 col-md-5">
                            <label>
                              1<span className="subscript">st</span> Item Price
                              <span className="text-danger">*</span>
                            </label>

                            <input
                              readOnly
                              type="number"
                              name="item_price_1"
                              placeholder="item_price_1"
                              value={form.item_price_1}
                            />
                          </div>
                          <div className="checkBox col-md-1">
                            <input
                              required
                              type="radio"
                              name={`vendor_selected${index}`}
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={2}
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-6 ">
                            <label>
                              2<span className="subscript">nd</span> Vendor
                              <span className="text-danger">*</span>
                            </label>

                            <input
                              readOnly
                              defaultValue={form.vendor_2}
                              type="text"
                              name="vendor_2"
                              className="form-control"
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-5">
                            <label>
                              2<span className="subscript">nd</span> Item Price
                              <span className="text-danger">*</span>
                            </label>

                            <input
                              readOnly
                              type="number"
                              name="item_price_2"
                              placeholder="item_price_2"
                              value={form.item_price_2}
                            />
                          </div>
                          <div className="checkBox col-md-1">
                            <input
                              required
                              type="radio"
                              name={`vendor_selected${index}`}
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={3}
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-6 ">
                            <label>
                              3<span className="subscript">st</span> Vendor
                            </label>

                            <select
                              name="vendor_3"
                              value={form.vendor_3}
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
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
                          <div className="inputBoxPO mb-3 col-md-5">
                            <label>
                              3<span className="subscript">rd</span> Item Price
                            </label>
                            <input
                              type="number"
                              min="0"
                              name="item_price_3"
                              placeholder="item_price_3"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={Number(form.item_price_3)}
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-4">
                            <label>
                              Quantity
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              readOnly
                              type="number"
                              name="quantity"
                              placeholder="Quantity"
                              value={form.quantity}
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-4">
                            <label>
                              PPN
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              disabled
                              readOnly
                              required
                              name="ppn"
                              defaultValue={form.ppn}
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
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
                              readOnly
                              type="number"
                              name="Biaya Lain-Lain"
                              placeholder="Additional Cost"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
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
                      Approve
                    </button>
                    <button
                      className="btn btn-warning float-end"
                      onClick={(e) => onRejectPO(e, location.state.header.id)}
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
