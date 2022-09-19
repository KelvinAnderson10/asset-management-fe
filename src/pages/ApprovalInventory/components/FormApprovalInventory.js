import React, { useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../../shared/context/DependencyContext";
import { UseApprovalInventory } from "../UseApprovalInventory";
import "./FormApprovalInventory.css";

export const FormApprovalInventory = () => {
  const {poDetail,setpoDetail} = UseApprovalInventory();
  // const [POdata, setPOData] = useState([
  //   {
  //     ["Nama Barang"]: "",
  //     vendor_1: "",
  //     vendor_2: "",
  //     vendor_3: "",
  //     item_price_1: "",
  //     item_price_2: "",
  //     item_price_3: "",
  //     vendor_selected: "",
  //     item_price_selected: "",
  //     quantity: "",
  //     ppn: "",
  //     is_asset: "",

  //     ["Biaya Lain-Lain"]: "",
  //   },
  // ]);
  // const [POHeader, setPOHeader] = useState({
  //   PurchaseOrderDetail: [],
  //   tipe: "Inventory",
  // });

  const { vendorService, userService, purchaseOrderService } = useDeps();

  const handleFormChange = (event,index) => {
    const newArray = location.state.detail.map((item,i)=>{
      if (index === i){
        return {...item, [event.target.name]:event.target.value}
      }else{
        return item
      }
    })
    setpoDetail(newArray)
    // let data = [...poDetail];
    // data[idx][event.target.name] = event.target.value;
    // setpoDetail(data);
    // console.log(poDetail);
  };

  const [vendor, setVendor] = useState([]);
  const onGetAllVendor = async () => {
    try {
      const response = await vendorService.getAllVendor();
      setVendor(response.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };
  const location = useLocation();
  //  console.log('detail po form page',poDetail)

  useEffect(() => {
    onGetAllVendor();
  }, []);

  const handleSubmitPO = async (e) => {
    e.preventDefault();
    try {
      const updateDetail = location.state.detail.map((obj) => {
        for (let i in location.state.detail) {
          location.state.detail[i].ppn = Number(location.state.detail[i].ppn);
          location.state.detail[i].ppn = Boolean(location.state.detail[i].ppn);
          location.state.detail[i].item_price_selected = Number(
            location.state.detail[i].item_price_selected
          );
        }

        console.log("ini yg di submit", location.state.detail);

        const response = purchaseOrderService.updatePODetail(
          obj.po_id_detail,
          poDetail
        );

        console.log("ini response submit", response);
      });
      console.log("ini detail update", updateDetail);
    } catch (e) {
      console.log(e);
    }
  };

  // const handleChangeVendorSelected = (event,index)=>{
  //   let data = [...POdata];
  //   data[index][event.target.name] = event.target.value;
  //   setPOData(data);
  //   console.log(POdata);
  // }

  return (
    <>
      <Sidebar>
        <div className="po-app-form-container">
          <div className="po-app-form-card">
            <form onSubmit={handleSubmitPO}>
              <h4 className="mb-5 text-danger">Purchase Order Detail</h4>
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
                  {/* <div className="mb-3 col-md-4">
                    <label>
                     PO ID<span className="text-danger">*</span>
                    </label>
                    <input
                      value={location.state.header.id}
                      readOnly
                      type="text"
                      name="po_id"
                      className="form-control"
                    />
                  </div> */}
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

                          <div
                            className="inputBoxPO mb-3 col-md-5 "
                            style={{ width: "45%" }}
                          >
                            <label>
                              1<span className="subscript">st</span> Vendor
                              <span className="text-danger">*</span>
                            </label>
                            <div
                              className="checkBox col-sm-1"
                              style={{ width: "2%" }}
                            >
                              <input
                                type="checkbox"
                                name="vendor_selected"
                                onChange={(event) => handleFormChange(event,index)}
                                value={form.vendor_1}
                              />
                            </div>
                            <input
                              defaultValue={form.vendor_1}
                              type="text"
                              name="vendor_1"
                              className="form-control"
                            />
                          </div>

                          <div
                            className="inputBoxPO  mb-3 col-md-5"
                            style={{ width: "45%" }}
                          >
                            <label>
                              1<span className="subscript">st</span> Item Price
                              <span className="text-danger">*</span>
                            </label>
                            <div
                              className="checkBox col-sm-1 "
                              style={{ width: "2%" }}
                            >
                              <input
                                type="checkbox"
                                name="item_price_selected"
                                onChange={(event) => handleFormChange(event,index)}
                                value={form.item_price_1}
                              />
                            </div>
                            <input
                              type="number"
                              name="item_price_1"
                              placeholder="item_price_1"
                              value={form.item_price_1}
                            />
                          </div>

                          <div className="inputBoxPO mb-3 col-md-6 ">
                            <label>
                              2<span className="subscript">nd</span> Vendor
                              <span className="text-danger">*</span>
                            </label>
                            <div
                              className="checkBox col-sm-1"
                              style={{ width: "2%" }}
                            >
                              <input
                                type="checkbox"
                                name="vendor_selected"
                                onChange={(event) => handleFormChange(event,index)}
                                value={form.vendor_2}
                              />
                            </div>
                            <input
                              defaultValue={form.vendor_2}
                              type="text"
                              name="vendor_2"
                              className="form-control"
                            />
                          </div>
                          <div className="inputBoxPO mb-3 col-md-6">
                            <label>
                              2<span className="subscript">nd</span> Item Price
                              <span className="text-danger">*</span>
                            </label>
                            <div
                              className="checkBox col-sm-1 "
                              style={{ width: "2%" }}
                            >
                              <input
                                type="checkbox"
                                name="item_price_selected"
                                onChange={(event) => handleFormChange(event,index)}
                                value={form.item_price_2}
                              />
                            </div>
                            <input
                              type="number"
                              name="item_price_2"
                              placeholder="item_price_2"
                              value={form.item_price_2}
                            />
                          </div>

                          <div className="inputBoxPO mb-3 col-md-6 ">
                            <label>
                              3<span className="subscript">st</span> Vendor
                            </label>
                            <div
                              className="checkBox col-sm-1"
                              style={{ width: "2%" }}
                            >
                              <input
                                type="checkbox"
                                name="vendor_selected"
                                onChange={(event) => handleFormChange(event,index)}
                                value={form.vendor_3}
                              />
                            </div>
                            <select
                              name="vendor_3"
                              value={form.vendor_3}
                              onChange={(event) => handleFormChange(event)}
                            >
                              <option value="">Select Vendor</option>

                              {vendor.map((item) => (
                                <option key={item.name} value={item.name}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="inputBoxPO mb-3 col-md-6">
                            <label>
                              3<span className="subscript">rd</span> Item Price
                            </label>
                            <div
                              className="checkBox col-sm-1 "
                              style={{ width: "2%" }}
                            >
                              <input
                                type="checkbox"
                                name="item_price_selected"
                                onChange={(event) => handleFormChange(event,index)}
                                value={form.item_price_3}
                              />
                            </div>
                            <input
                              type="number"
                              name="item_price_3"
                              placeholder="item_price_3"
                              onChange={(event) => handleFormChange(event)}
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
                              value={form.quantity}
                              onChange={(event) => handleFormChange(event)}
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
                              onChange={(event) => handleFormChange(event)}
                              style={{ width: "95%" }}
                            >
                              <option value="">Select Condition</option>
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </div>
                          <div className="inputBoxPO mb-3 col-md-4">
                            <label>
                              Additional Cost
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="number"
                              name="Biaya Lain-Lain"
                              placeholder="Additional Cost"
                              onChange={(event) => handleFormChange(event)}
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
                      Accept
                    </button>
                    <button className="btn btn-warning float-end">
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
