import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../shared/components/Sidebar2/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./style.css";
import Swal from 'sweetalert2'
import { BsArrowDownUp } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";

export const VendorManage = () => {
  //Define here local state that store the form Data
  const [vendorData, setVendorData] = useState({});

  const [isLoading, setLoading] = useState(false);
  const [doneAddForm, setDoneAddform] = useState(false);
  const { vendorService } = useDeps();
  const areAllFieldsFilled = vendorData !== "";

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);

  //For Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    SetPostShow(true);
  };
  const hanldePostClose = () => {
    SetPostShow(false);
  };

  const handleViewShow = () => {
    SetViewShow(true);
  };
  const hanldeViewClose = () => {
    SetViewShow(false);
  };

  const handleChange = (e) => {
    const newData = { ...vendorData };
    newData[e.target.name] = e.target.value;
    setVendorData(newData);
    console.log(newData);
  };

  //For Edit Model
  const [id, setId] = useState();
  const [ViewEdit, SetEditShow] = useState(false);

  const handleEditShow = (index, item) => {
    setVendorData(item);
    SetRowData(item)
    console.log("ini index", index);
    setId(index);
    setDelete(true);
    SetEditShow(true);
  };
  const hanldeEditClose = () => {
    SetEditShow(false);
  };

  const [Delete, setDelete] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");

  // For Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const handleLocation = (e) => {
    const location = e.target.value;

    console.log(location);
  };

  useEffect(() => {
    onGetAllVendor();
  }, [doneAddForm]);

  // ==================CRUD LOCATIONS=============================

  //================== Add Data To Table ==========================
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await vendorService.createVendor(vendorData);
      setVendorData(response.data);
      SetPostShow(false);
      setDoneAddform(true);
      console.log(response);
      if (response.status === "SUCCESS") {
        Swal.fire({
          title: "Success!",
          text:"Your data has been saved!",
          icon: 'success',
        })
      }
      onGetAllVendor();
      clearForm();
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  //=============== GET ALL LOCATIONS ===================

  const onGetAllVendor = async () => {
    setLoading(true);
    try {
      const response = await vendorService.getAllVendor();
      console.log(response);
      setData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //================ DELETE LOCATION ===========================
  const onDeleteVendor = async (name) => {
    console.log(name);
    setLoading(true);

    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this record",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = vendorService.deleteVendor(name);
          console.log(response);
          onGetAllVendor();
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  };

  //================== SEARCH BY NAME LIKE ========================
  const onChangeSearchLocation = (e) => {
    const searchLocation = e.target.value;
    setSearchLocation(searchLocation);
  };

  const onSearchLocation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await vendorService.getVendorByNameLike(searchLocation);
      console.log(response);
      setData(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  //=============== EDIT ROW DATA  ===============================
  const handleEdit = async (e,id) => {
    e.preventDefault()
    console.log("ini id", id);
    try {
      const response = await vendorService.updateVendor(id, vendorData);
      console.log(response);
      setVendorData(response);
      setDoneAddform(true);
      if (response.status === "SUCCESS") {
        swal({
          title: "Success!",
          text: "Your data has been saved!",
          icon: "success",
          button: "OK!",
        });
      }
      SetEditShow(false);
      onGetAllVendor();
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  //===================== Pagination ==============================

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

  //================== SORTING ===============================

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };
  // CLEAR FORM
  const clearForm = () => {
    setVendorData({
      name: '',
      address: '',
      phone: '',
      account_number: '',
    });
    
}

const ref = useRef(null) ;
const onClearForm = () => {
  ref.current.value = ''; 
  onGetAllVendor();
}

  return (
    <>
      <Sidebar>
      <div>
      <div className="body">
          <div className="container">
          <div className="vendor-container-item" >
            <Button
              variant="primary"
              onClick={() => {
                handlePostShow();
              }}
            >
               <FiPlus />
              Add New Vendor
            </Button>
          
          
          <form onSubmit={onSearchLocation}>
            <div className="input-group ">
              <input
                placeholder="Search"
                value={searchLocation}
                onChange={onChangeSearchLocation}
                type="text"
                className="form-control"
              />
              <div className="input-group-append">
                <button value="submit" className="btn btn-primary">
                  <i className="fas fa-search"></i>
                </button>
                <button value="submit" className="btn btn-danger form-button" onClick={onClearForm}>
                        <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
          </form>
          </div>
        
        
        

        

            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-xs-6">
                      <h2>
                        Manage <b>Vendors</b>
                      </h2>
                    </div>
                  </div>
                </div>

                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th onClick={() => sorting("name")}>
                        {" "}
                        <BsArrowDownUp /> Name
                      </th>
                      <th onClick={() => sorting("address")}>
                        {" "}
                        <BsArrowDownUp /> Address
                      </th>
                      <th onClick={() => sorting("phone")}>
                        {" "}
                        <BsArrowDownUp /> Phone
                      </th>
                      <th onClick={() => sorting("accountNumber")}>
                        {" "}
                        <BsArrowDownUp /> Acount Number
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <th colspan='6'>Data is not found</th>
                      </tr>
                    ) : (
                      currentItems.map((item, index) => (
                        <tr key={item.ID}>
                          <th>{index + 1}</th>
                          <th>{item.name}</th>
                          <th>{item.address}</th>
                          <th>{item.phone}</th>
                          <th>{item.account_number}</th>
                          <td>
                            <a
                              onClick={() => {
                                handleViewShow(SetRowData(item));
                              }}
                              className="view"
                              data-toggle="modal"
                              style={{ cursor: "pointer" }}
                            >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="View"
                              >
                                &#xe8f4;
                              </i>
                            </a>

                            <a
                              onClick={() => {
                                handleEditShow(item.name, item);
                              }}
                              className="edit"
                              data-toggle="modal"
                              style={{ cursor: "pointer" }}
                            >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="Edit"
                              >
                                &#xe3c9;
                              </i>
                            </a>

                            <a
                              onClick={() => onDeleteVendor(item.name)}
                              className="delete"
                              data-toggle="modal"
                              style={{ cursor: "pointer" }}
                            >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="Delete"
                              >
                                &#xE872;
                              </i>
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="clearfix">
                  <div className="hint-text">
                    Showing <b>{itemsPerPage}</b> out of <b>{data.length}</b>{" "}
                    entries
                  </div>
                  <ul className="pageNumbers">
                    <li>
                      <button
                        onClick={handlePrevbtn}
                        disabled={currentPage == pages[0] ? true : false}
                      >
                        Prev
                      </button>
                    </li>
                    {pageDecrementBtn}
                    {renderPageNumbers}
                    {pageIncrementBtn}

                    <li>
                      <button
                        onClick={handleNextbtn}
                        disabled={
                          currentPage == pages[pages.length - 1] ? true : false
                        }
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                  {/* <button onClick={handleLoadMore} className="loadmore">
                    Load More
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ADD MODAL FOR SUBMIT DATABASE */}

        <div className="model-box-view">
          <Modal
            show={ViewPost}
            onHide={hanldePostClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add new Vendor</Modal.Title>
             
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
            <p style={{color:"red"}}>Please complete all required fields</p>
              <div>
                <div className="form-group">
                  <label className="form-label">Vendor Name <span style={{color :"red"}} >*</span> </label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    name="name"
                    value={vendorData.name}
                    placeholder="Please enter name"
                    autoFocus
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Address <span style={{color :"red"}} >*</span></label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter address"
                    name="address"
                    value={vendorData.address}
                    
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Phone Number <span style={{color :"red"}} >*</span></label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter phone number"
                    name="phone"
                    value={vendorData.phone}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Account Number <span style={{color :"red"}} >*</span></label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter account number"
                    name="account_number"
                    value={vendorData.account_number}
                  />
                </div>
                </div>
                <Button
                  type="submit"
                  className="btn btn-success mt-4"
                >
                  Add{" "}
                </Button>
              
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hanldePostClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* EDIT MODAL */}

        <div className="model-box-view">
          <Modal
            show={ViewEdit}
            onHide={hanldeEditClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e)=>handleEdit(e,RowData.name)}>
              <div>
                <div className="form-group">
                  <label>Vendor Name</label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter Location Name"
                    name="name"
                    defaultValue={RowData.name}
                  />
                  <label>Address</label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter Address"
                    name="address"
                    defaultValue={RowData.address}
                  />
                  <label>Phone</label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter Phone"
                    name="phone"
                    defaultValue={RowData.phone}
                  />
                  <label>Account Number</label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    name="account_number"
                    placeholder="Please enter Account Number"
                    defaultValue={RowData.account_number}
                  />
                </div>
                </div>
                <Button
               
                  type="submit"
                  className="btn btn-warning mt-4"
                 
                >
                  Save Changes
                </Button>
  
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hanldeEditClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        {/* View Modal */}
        <div className="model-box-view">
          <Modal
            show={ViewShow}
            onHide={hanldeViewClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>View Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div className="form-group">
                  <label>Vendor Name </label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.name}
                    readOnly
                  />
                  <label>Address </label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.address}
                    readOnly
                  />
                  <label>Phone </label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.phone}
                    readOnly
                  />
                  <label>Account Number </label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.account_number}
                    readOnly
                  />
                </div>

                {/* {
                                Delete && (
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Delete Employee</Button>
                                )
                            } */}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hanldeViewClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      </Sidebar>
    </>
  );
};
