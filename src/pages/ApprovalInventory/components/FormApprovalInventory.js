import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import Sidebar from "../../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../../shared/context/DependencyContext";
import { UseApprovalInventory } from "../UseApprovalInventory";
import "./FormApprovalInventory.css";
import * as MdIcons from 'react-icons/md'
import Swal from "sweetalert2";
import { Failed } from "../../../shared/components/Notification/Failed";

export const FormApprovalInventory = () => {
  const {handleClickApproval, onGetPOListByApproval,poDetail,appData} = UseApprovalInventory()
  const [POdata, setPOData] = useState([
    {
      ["Nama Barang"]: "",
      vendor_1: "",
      vendor_2: "",
      vendor_3: "",
      item_price_1: "",
      item_price_2: "",
      item_price_3: "",
      quantity: "",
      ppn: "",

      ["Biaya Lain-Lain"]: "",
    },
  ]);
  const [POHeader, setPOHeader] = useState({
    PurchaseOrderDetail: [],
    tipe: "Inventory",
  });

  const { vendorService, userService, purchaseOrderService } =
    useDeps();
  const handleFormChange = (event, index) => {
    let data = [...POdata];
    data[index][event.target.name] = event.target.value;
    setPOData(data);
    console.log(POdata);
  };

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
  const location = useLocation()

  useEffect(() => {
    onGetAllVendor();
  }, []);

  const navigate = useNavigate()
  const onClickBack = () => {
    navigate('/approval-data/inventory', {replace: true})
  } 

  console.log('ini state', location.state.header);

  //Reject
  const onRejectPO = async (e, id) =>{
    e.preventDefault(e)
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to reject this request",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, decline it!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = purchaseOrderService.deletePO(id);
          Swal.fire("Reject!", "This request has been rejected.", "success");
          navigate('/approval-data/inventory', {replace: true})
        } catch (e) {
          console.log(e.response)
          Failed('Failed to reject')
        } 
      }
    })
  }

  return (
    <>
      <Sidebar>
        <div className="po-app-form-container">
          <div className="po-app-form-card">
            <form>
              <h4 className="mb-5 text-danger"> <MdIcons.MdOutlineArrowBackIosNew color='black' onClick={onClickBack} style={{cursor:'pointer'}}/> Purchase Order Detail</h4>
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
                    <input type="text" name="ToUser" className="form-control" value={location.state.header.toUser} />
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
                      <div key={index}>
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
                            <input name="Nama Barang" placeholder="Item Name" value={form['Nama Barang']} />
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
                          <div className="inputBoxPO mb-3 col-md-6">
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
                          <div className="inputBoxPO mb-3 col-md-6">
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
                          <div className="inputBoxPO mb-3 col-md-6">
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
                            <label>
                              Additional Cost
                              <span className="text-danger">*</span>
                            </label>
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
                    <button className="btn btn-warning float-end" onClick={(e)=> onRejectPO(e, location.state.header.id)}>
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
