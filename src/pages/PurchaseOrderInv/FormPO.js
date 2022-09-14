import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import "./formpo.css";
import { FiPlus } from "react-icons/fi";
import "./addformpo.css"

export const FormPO = () => {
  const [POdata, setPOData] = useState({});
  const [data, setData] = useState([]);
  const [subProductName, setSubProductName] = useState([]);
  const { assetItemService, vendorService, locationService, userService } =useDeps();

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
  }, []);

  const handleChange = (e) => {
    const newData = { ...data };
    newData[e.target.name] = e.target.value;
    setPOData(newData);
    console.log(newData);
  };

  const onSubmitPO = ()=>{

  }

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
  document.querySelector("body").style.overflow = "auto";
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
                  <form>
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
                            type="text"
                            name="fname"
                            className="form-control"
                          />
                        </div>
  
                        <div className="mb-3 col-md-4">
                          <label>
                            Employee ID<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="Lname"
                            className="form-control"
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-4 ">
                          <label>
                            Subproduct Name<span className="text-danger">*</span>{" "}
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
                        <div className="mb-3">
                          <label>
                            Item Name<span className="text-danger">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            name="Nama Barang"
                            value={data["Nama Barang"]}
                            className="form-control"
                            onChange={handleChange}
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
                            value={data.vendor_1}
                            onChange={handleChange}
                          >
                            <option value="">Select Vendor</option>
  
                            {vendor.map((item) => (
                              <option key={item.name} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
  
                        <div className="mb-3 col-md-6">
                          <label>
                            Price<span className="text-danger">*</span>
                          </label>
                          <input
                            required
                            type="number"
                            name="item_price_1"
                            className="form-control"
                            value={data.item_price_1}
                            onChange={handleChange}
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
                            value={data.vendor_2}
                            onChange={handleChange}
                          >
                            <option value="">Select Vendor</option>
  
                            {vendor.map((item) => (
                              <option key={item.name} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
  
                        <div className="mb-3 col-md-6">
                          <label>
                            Price<span className="text-danger">*</span>
                          </label>
                          <input
                            required
                            type="number"
                            name="item_price_2"
                            className="form-control"
                            value={data.item_price_2}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="inputBoxPO mb-3 col-md-6 ">
                          <label>
                            3<span className="subscript">rd</span> Vendor
                            
                          </label>
                          <select
                            name="vendor_3"
                            value={data.vendor_3}
                            onChange={handleChange}
                          >
                            <option value="">Select Vendor</option>
  
                            {vendor.map((item) => (
                              <option key={item.name} value={item.name}>
                                {item.name}
                              </option>
                            ))}
                          </select>
                        </div>
  
                        <div className="mb-3 col-md-6">
                          <label>
                            Price
                          </label>
                          <input
                            type="number"
                            name="item_price_3"
                            className="form-control"
                            value={data.item_price_3}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label>
                            Qty<span className="text-danger">*</span>
                          </label>
                          <input
                            required
                            type="number"
                            name="quantity"
                            value={data.quantity}
                            className="form-control"
                            onChange={handleChange}
                          />
                        </div>
  
                        <div class="col-md-12">
                          <button className="btn btn-primary float-end">
                            Submit
                          </button>
                          <button onClick={handleAddClose} className="btn btn-warning float-end">
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
