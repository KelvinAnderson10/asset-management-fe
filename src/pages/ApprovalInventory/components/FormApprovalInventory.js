import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../../shared/context/DependencyContext";
import { UseApprovalInventory } from "../UseApprovalInventory";
import "./FormApprovalInventory.css";
import * as MdIcons from "react-icons/md";
import Swal from "sweetalert2";
import { Failed } from "../../../shared/components/Notification/Failed";

export const FormApprovalInventory = () => {
  const { user, setpoDetail, setPOHeader } = UseApprovalInventory();
  const { vendorService, userService, purchaseOrderService } = useDeps();

  const handleFormChange = (event, index) => {
    const newArray = location.state.detail.map((item, i) => {
      if (index === i) {
        if (event.target.value == 1) {
          item.vendor_selected = item.vendor_1;
          item.item_price_selected = item.item_price_1;
        } else if (event.target.value == 2) {
          item.vendor_selected = item.vendor_2;
          item.item_price_selected = item.item_price_2;
        } else{
          item.vendor_selected = item.vendor_3;
          item.item_price_selected = item.item_price_3;
        }
        console.log("ini item", item);
        return { ...item, [event.target.name]:event.target.value };
      } else {
        return item;
      }
    });
    setpoDetail(newArray);
    setPOHeader(location.state.header);
  };

  const handleFormChange2 = (event, index) => {
    const newArray2 = location.state.detail.map((item, i) => {
      if (index === i) {
        return { ...item, [event.target.name]: event.target.value };
      } else {
        return item;
      }
    });
    setpoDetail(newArray2);
  };
  // const handleFormChange3 = (event, index) => {
  //   const newArray2 = location.state.detail.map((item, i) => {
  //     if (index === i) {
  //       if(event.target.value ==3){
  //         item.vendor_selected = item.vendor_3;
  //         item.item_price_selected = item.item_price_3;
  //       }
  //       return { ...item, [event.target.name]: event.target.value };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setpoDetail(newArray2);
  // };
  const [vendor, setVendor] = useState([]);
  const onGetAllVendor = async () => {
    try {
      const response = await vendorService.getAllVendor();
      setVendor(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const location = useLocation();

  useEffect(() => {
    onGetAllVendor();
  }, []);

  const navigate = useNavigate();
  const onClickBack = () => {
    navigate("/approval-data/inventory", { replace: true });
  };

  // console.log("ini state", location.state.header);

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
        try {
          const response = purchaseOrderService.deletePO(id);
          Swal.fire("Reject!", "This request has been rejected.", "success");
          navigate("/approval-data/inventory", { replace: true });
        } catch (e) {
          console.log(e.response);
          Failed("Failed to reject");
        }
      }
    });
  };

  useEffect(() => {
    onApproved();
  }, []);

  //Approval
  const onApproved = async (e, id) => {
    e.preventDefault(e);
    try {
      for (let i in location.state.detail) {
        location.state.detail[i].ppn = Number(location.state.detail[i].ppn);
        location.state.detail[i].ppn = Boolean(location.state.detail[i].ppn);
        location.state.detail[i].is_asset = Number(location.state.detail[i].is_asset);
        location.state.detail[i].is_asset = Boolean(location.state.detail[i].is_asset);
        location.state.detail[i].item_price_selected = Number(location.state.detail[i].item_price_selected);
        location.state.detail[i].item_price_3 = Number(location.state.detail[i].item_price_3)
        console.log("ini yg akan di submit", location.state.detail);
        const response = await purchaseOrderService.updatePODetail(
          location.state.detail[i].po_id_detail,
          location.state.detail[i]
        );
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    } finally {
      if (location.state.header.approverLevel3 == "-") {
        try {
          const response = await purchaseOrderService.approvedByLevel2(id);
          Swal.fire("Success!", "This request has been approved.", "success");
          navigate("/approval-data/inventory", { replace: true });
        } catch (e) {
          console.log(e.response);
          Failed("Failed to approved");
        }
      } else {
        try {
          const response = await purchaseOrderService.approvedByLevel3(id);
          Swal.fire("Success!", "This request has been approved.", "success");
          navigate("/approval-data/inventory", { replace: true });
        } catch (e) {
          console.log(e.response);
          Failed("Failed to approved");
        }
      }
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
                    <label>
                      Subproduct Name
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      value={location.state.header.jenisProduk}
                      type="text"
                      name="Jenis Produk"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-md-6 ">
                    <label>
                      Type
                      <span className="text-danger">*</span>{" "}
                    </label>
                    <input
                      readOnly
                      value="Inventory"
                      type="text"
                      name="tipe"
                      className="form-control"
                    />
                  </div>
                  {location.state.detail.map((form, index) => {
                    return (
                      <div key={form.po_id_detail}>
                        <div className="header-item-add">
                          <h3 style={{ textAlign: "center" }}>
                            Item {index + 1}{" "}
                          </h3>
                        </div>
                        <div className="row">
                          <div className="inputBoxPO mb-3">
                            <label>
                              Item Name
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <input
                              name="Nama Barang"
                              placeholder="Item Name"
                              value={form["Nama Barang"]}
                            />
                          </div>
                          <div className="inputBoxPO mb-3">
                            <label>
                              PO ID Detail
                              <span className="text-danger">*</span>{" "}
                            </label>
                            <input
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
                              type="number"
                              name="item_price_1"
                              placeholder="item_price_1"
                              value={form.item_price_1}
                            />
                          </div>
                          <div className="checkBox col-md-1">
                            <input
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
                              type="number"
                              name="item_price_2"
                              placeholder="item_price_2"
                              value={form.item_price_2}
                            />
                          </div>
                          <div className="checkBox col-md-1">
                            <input
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

                              {vendor.map((item) => (
                                <option key={item.name} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="inputBoxPO mb-3 col-md-5">
                            <label>
                              3<span className="subscript">rd</span> Item Price
                            </label>

                            <input
                              type="number"
                              name="item_price_3"
                              placeholder="item_price_3"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form.item_price_3}
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-3">
                            <label>
                              Quantity
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              placeholder="Quantity"
                              value={form.quantity}
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-3">
                            <label>
                              PPN
                              <span className="text-danger">*</span>
                            </label>
                            <select
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
                          <div className="inputBoxPO mb-3 col-md-3">
                            <label>Additional Cost</label>
                            <input
                              type="number"
                              name="Biaya Lain-Lain"
                              placeholder="Additional Cost"
                              onChange={(event) =>
                                handleFormChange(event, index)
                              }
                              value={form["Biaya Lain-Lain"]}
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-3">
                            <label>
                              Is Asset
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              required
                              name="is_asset"
                              value={form.is_asset}
                              onChange={(event) =>
                                handleFormChange2(event, index)
                              }
                              style={{ width: "95%" }}
                            >
                              <option value="">Select</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
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
                      Accept
                    </button>
                    <button
                      className="btn btn-warning float-end"
                      onClick={(e) => onRejectPO(e, location.state.header.id)}
                    >
                      Decline
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
