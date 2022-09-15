import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import "./formpo.css";
import { FiPlus } from "react-icons/fi";
import "./addformpo.css";
import { useAuth } from "../../services/UseAuth";

export const FormPO = () => {
  const [POdata, setPOData] = useState(
    [    
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
    PurchaseOrderDetail :[],
    tipe:"Inventory",
  });

  const [data, setData] = useState([]);
  const [subProductName, setSubProductName] = useState([]);
  const { assetItemService, vendorService, locationService, userService, purchaseOrderService } =
    useDeps();

  // ADD Purchase Request
  const [addShow, setAddShow] = useState(false);

  const handleAddClose = () => {
    setAddShow(false);
  };

  const handleAddShow = () => {
    setAddShow(true);
  };

  useEffect(() => {
    onGetAllSubProduct();
    onGetAllVendor();
    onGetCookie();
    
  }, []);

  const handleChange = (e) => {
    const newData = { ...POHeader };
    newData[e.target.name] = e.target.value;
    setPOHeader(newData);
    console.log(newData);
  };
  const handleFormChange = (event, index) => {
    let data = [...POdata];
    data[index][event.target.name] = event.target.value;
    setPOData(data);
    console.log(POdata);
  };

  const addFields = (e) => {
    e.preventDefault();
    let object = {
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
    };
    setPOData([...POdata, object]);
  };

  const removeFields = (index) => {
    let data = [...POdata];
    data.splice(index, 1);
    setPOData(data);
  };

  // GET GM Cluster

  // const[gM,setGM] = useState()
  // const onGetGMByCluster = async (cluster)=>{
  //   try{
  //   const response = await userService.findGMByCluster(cluster)
  //   console.log('ini resp',response)
  //   setGM(response.data)
  //   console.log(gM)
  //   }catch(e){
  //     console.log(e)
  //   }
  // }

  const onSubmitPO = async (e) => {
    e.preventDefault()
    try {
      POHeader['Kode Wilayah'] = user.location_id
      POHeader['requester']= user.name
      for (let i in POdata) {
      POdata[i].item_price_1= Number(POdata[i].item_price_1)
      POdata[i].item_price_2= Number(POdata[i].item_price_2)
      POdata[i].item_price_3= Number(POdata[i].item_price_3)
      POdata[i].quantity= Number(POdata[i].quantity)
      POdata[i].ppn= Number(POdata[i].ppn)
      POdata[i].ppn= Boolean(POdata[i].ppn)
      POdata[i]["Biaya Lain-Lain"]= Number(POdata[i]["Biaya Lain-Lain"])
      }


      POHeader.PurchaseOrderDetail= [...POdata]
      console.log('ini merge',POHeader)
      const response = await purchaseOrderService.createPO(POHeader)
      console.log('ini response',response)
    } catch (error) {
      console.log(error)
    }
  };

  // GET ALL SUBPRODUCT NAME
  const onGetAllSubProduct = async () => {
    try {
      const response = await assetItemService.getAllAsset();

      setSubProductName(response.data);
    } catch (e) {
      console.log(e);
    } finally {
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
    } finally {
    }
  };

  // PAGINATION

  // For Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);
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
  // console.log(user)
  // useEffect(() => {
  //   onGetGMByCluster(user.cluster);
  // }, [user]);

  return (
    <div>
      <Sidebar>
        <div className="body">
          <div className="po-list-container">
            <div className="po-list-card">
              <div className="title-po-list">
                <p>List of Purchase Request</p>
                <div className="button-add-po">
                  <Button onClick={handleAddShow} variant="primary">
                    <FiPlus />
                    Add Purchase Request
                  </Button>
                </div>
              </div>
              <div className="table-container">
                <div className="table-box">
                  <table className="table table-bordered table-striped table-responsive table-hover">
                    <thead className="table-header">
                      <tr>
                        <th>No</th>
                        <th>Area Code</th>
                        <th>Employee ID</th>
                        <th>Subproduct Name</th>
                        <th>Item Name</th>
                        <th>1st Vendor</th>
                        <th>Price</th>
                        <th>2nd Vendor</th>
                        <th>Price</th>
                        <th>3rd Vendor</th>
                        <th>Price</th>
                        <th>Quantity </th>
                        <th>PPN</th>
                        <th>Additional Cost </th>
                        <th>Supervisor Approval</th>
                        <th>IT Approval </th>
                        <th>GA Approval</th>
                        <th>Asset</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.length === 0 ? (
                        <tr>
                          <th colSpan="31">Data is not found</th>
                        </tr>
                      ) : (
                        data.map((data, index) => (
                          <tr key={data["Nomor Asset"]}>
                            <th>{index + 1}</th>

                            <td>{data["Tanggal Output"]}</td>
                            <td>{data["Tahun"]}</td>
                            <td>{data["No. PO / Dokumenen Pendukung"]}</td>
                            <td>{data["Vendor"]}</td>
                            <td>{data["Nama Barang"]}</td>
                            <td>{data["Harga Perolehan"]}</td>
                            <td>{data["PPN"]}</td>
                            <td>{data["Biaya Lain-Lain"]}</td>
                            <td>{data["Total Harga Perolehan"]}</td>
                            <td>{data["Jenis Produk"]}</td>
                            <td>{data["Kategori Jenis Produk"]}</td>
                            <td>{data["Kategori Aset Tetap"]}</td>
                            <td>{data["BAST Output"]}</td>
                            <td>{data["Kondisi"]}</td>
                            <td>{data["Insurance"]}</td>
                            <td>{data["Lokasi"]}</td>
                            <td>{data["User"]}</td>
                            <td>{data["Jabatan"]}</td>
                            <td>{data["Initisal"]}</td>
                            <td>{data["Kode Wilayah"]}</td>
                            <td>{data["Kode Asset"]}</td>
                            <td>{data["Tahun Pembelian"]}</td>
                            <td>{data["Kode Urut barang"]}</td>
                            <td>{data["Nomor Asset"]}</td>
                            <td>{data["Masa Manfaat (Bulan)"]}</td>
                            <td>{data["Penyusutan Perbulan"]}</td>
                            <td>{data["Total Bulan Penyusutan"]}</td>
                            <td>{data["Total Penyusutan"]}</td>
                            <td>{data["Nilai Asset saat ini"]}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <div className="clearfix" style={{marginRight:'2vw'}}>
            <div className="hint-text">
              Showing <b> {currentItems.length} </b> out of <b>{datas.length}</b>{" "}
              enteries
            </div>
          </div>
          <ul className="pageNumbers">
            <li>
            <a style={{marginRight:'10px'}}
                onClick={handleFirstBtn}
                disabled={currentPage == pages[0] ? true : false}
              >
                &laquo;
              </a>
              <a
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
              >
                Prev
              </a>
            </li>
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
            <li>
              <a
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
              >
                Next
              </a>
              <a
              style={{marginLeft:'10px'}}
                onClick={handleLastBtn}
                // disabled={currentPage == pages[0] ? true : false}
              >
                &raquo;
              </a>
            </li>
          </ul> */}
            </div>
            {addShow && (
              <div className="add-po-form-container">
                <div className="formPO">
                  <form  onSubmit={onSubmitPO} >
                    <h4 className="mb-5 text-danger">
                      Purchase Order Request Form
                    </h4>
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
                            type="text"
                            name="Jabatan"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-4 ">
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
                        <div className="mb-3 col-md-4 ">
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
                        <h3>Item</h3>
                        {POdata.map((form, index) => {
                          return (
                            <div key={index}>
                              <div className="row">
                                <div className="inputBoxPO mb-3">
                                  <input
                                    name="Nama Barang"
                                    placeholder="Item Name"
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                    value={form["Nama Barang"]}
                                  />
                                </div>

                                <div className="inputBoxPO mb-3 col-md-6 ">
                                  <label>
                                    1<span className="subscript">st</span>{" "}
                                    Vendor
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    required
                                    name="vendor_1"
                                    value={form.vendor_1}
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
                                    1<span className="subscript">st</span> Item
                                    Price
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                  type='number'
                                    name="item_price_1"
                                    placeholder="item_price_1"
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                    value={form.item_price_1}
                                  />
                                </div>

                                <div className="inputBoxPO mb-3 col-md-6 ">
                                  <label>
                                    2<span className="subscript">nd</span>{" "}
                                    Vendor
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    required
                                    name="vendor_2"
                                    value={form.vendor_2}
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
                                    2<span className="subscript">nd</span> Item
                                    Price
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                  type='number'
                                    name="item_price_2"
                                    placeholder="item_price_2"
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                    value={form.item_price_2}
                                  />
                                </div>

                                <div className="inputBoxPO mb-3 col-md-6 ">
                                  <label>
                                    3<span className="subscript">st</span>{" "}
                                    Vendor
                                    <span className="text-danger">*</span>
                                  </label>
                                  <select
                                    required
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
                                    3<span className="subscript">rd</span> Item
                                    Price
                                    <span className="text-danger">*</span>
                                  </label>
                                  <input
                                  type='number'
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
                                  type='number'
                                    name="quantity"
                                    placeholder="Quantity"
                                    onChange={(event) =>
                                      handleFormChange(event, index)
                                    }
                                    value={form.quantity}
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
                                  onChange={(event) =>
                                    handleFormChange(event, index)
                                  }
                                  style={{ width: "95%" }}
                                >
                                  <option value="">Select Condition</option>
                                  <option value='1'>Yes</option>
                                  <option value='0'>No</option>
                                </select>
                                </div>
                                <div className="inputBoxPO mb-3 col-md-4">
                                <label>
                                    Additional Cost
                                    <span className="text-danger">*</span>
                                  </label>
                                <input
                                  type='number'
                                  name="Biaya Lain-Lain"
                                  placeholder="Additional Cost"
                                  onChange={(event) =>
                                    handleFormChange(event, index)
                                  }
                                  value={form["Biaya Lain-Lain"]}
                                />
                                </div>
                                <button onClick={() => removeFields(index)}>
                                  Remove
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        <button onClick={addFields}>Add More..</button>
                        <div class="col-md-12">
                          <button className="btn btn-primary float-end">
                            Submit
                          </button>
                          <button
                            onClick={handleAddClose}
                            className="btn btn-warning float-end"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};
