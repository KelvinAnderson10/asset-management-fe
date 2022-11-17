import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./vendor.css";
import Swal from 'sweetalert2'
import {FaSort} from 'react-icons/fa'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { Failed } from "../../shared/components/Notification/Failed";
import { EVENT } from "../../shared/constants";
import { useAuth } from "../../services/UseAuth";

export const VendorManage = () => {
  //Define here local state that store the form Data
  const [vendorData, setVendorData] = useState({});

  const [isLoading, setLoading] = useState(false);
  const [doneAddForm, setDoneAddform] = useState(false);
  const { vendorService, eventLogService } = useDeps();

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);

  //For Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    setVendorData({})
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
  };

  //For Edit Model
  const [id, setId] = useState();
  const [ViewEdit, SetEditShow] = useState(false);

  const handleEditShow = (index, item) => {
    setVendorData(item);
    SetRowData(item)

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

  useEffect(() => {
    onGetAllVendor();
  }, [doneAddForm]);

  useEffect(() => {
    onGetCookie()
  }, [])

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
      if (response.status === "SUCCESS") {
        Swal.fire({
          title: "Success!",
          text:"Your data has been saved!",
          icon: 'success',
        })
      }
      onGetAllVendor();
      clearForm();
      let event = {
        event: EVENT.CREATE_VENDOR,
        user: user.name
      }
      createEventLogVendor(event)
    } catch (error) {
      console.log(error.response);
      Failed('Your data failed to save because '+ error.response.data.error.Detail)
    } finally {
      setLoading(false);
    }
  };

  //=============== GET ALL LOCATIONS ===================

  const onGetAllVendor = async () => {
    setLoading(true);
    try {
      const response = await vendorService.getAllVendor();
      setData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //================ DELETE LOCATION ===========================
  const onDeleteVendor = async (name) => {
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
        const deleteVen = async () => {
          try {
            await vendorService.deleteVendor(name);
            onGetAllVendor();
            let event = {
              event: EVENT.DELETE_VENDOR,
              user: user.name
            }
            createEventLogVendor(event)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          } catch (e) {
            console.log(e);
            Failed("Your data failed to delete");
          } 
        }
        deleteVen()
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
      setData(response.data);

    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  //=============== EDIT ROW DATA  ===============================
  const handleEdit = async (e,id) => {
    e.preventDefault()

    try {
      const response = await vendorService.updateVendor(id, vendorData);

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
      let event = {
        event: EVENT.UPDATE_VENDOR,
        user: user.name
      }
      createEventLogVendor(event)
    } catch (error) {
      console.log(error.response);
      Failed('Your data failed to save')
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
// CLEAR SEARCH
const ref = useRef(null) ;
const onClearForm = (e) => {
  e.preventDefault()
  ref.current.value = ''; 
  onGetAllVendor();
}

//Event Log
const [event, setEvent] = useState({})

const createEventLogVendor = async (eventLoc) => {
  try {
    const response = await eventLogService.createEventLog(eventLoc)
    setEvent(response.data)
  } catch (e) {
    console.log(e);
  }
}

//================== GET USER ===============================
const { getCookie } = useAuth();
const[user,setUser]= useState({
  name:'',
  role:'',
  level_approval:'',
  location_id:'',
  tap:'',
  cluster:'',
  department: ''
})
const onGetCookie = ()=>{
  let savedUserJsonString = getCookie("user")
  let savedUser = JSON.parse(savedUserJsonString)
  setUser(prevObj=>({...prevObj,name:(savedUser.name), role:(savedUser.role), level_approval:(savedUser.level_approval), location_id:(savedUser.location_id), tap:(savedUser.TAP), cluster:(savedUser.Cluster), department:(savedUser.department)}))
}
document.querySelector("body").style.overflow = "auto";
  return (
    <>
      <Sidebar>
      <div className="body-vendor">
          <div className="container">
          <div className="vendor-container-item" >  
          <form>
            <div className="input-group ">
              <input
                placeholder="Search Vendor Name"
                onChange={onChangeSearchLocation}
                type="text"
                className="form-control"
                ref={ref}
              />
              <div className="input-group-append">
                <button value="submit" className="btn btn-primary" onClick={onSearchLocation}>
                  <i className="fas fa-search"></i>
                </button>
                <button value="submit" className="btn btn-danger form-button" onClick={onClearForm}>
                        <i className="fa fa-times"></i>
                </button>
              </div>
            </div>
          </form>
          <Button
              variant="primary"
              onClick={() => {
                handlePostShow();
              }}
            >
               <FiPlus />
              Add New Vendor
            </Button>
          </div>
            <div className="table-title">
                  <div className="row">
                    <div className="col-xs-6">
                      <h2 style={{fontSize: "24px", textAlign: 'center'}}>
                        Manage <b>Vendors</b>
                      </h2>
                    </div>
                  </div>
            </div>
            <div className="table-responsive">
              <div className="table-wrapper">

                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th onClick={() => sorting("name")}>
                        {" "}
                        <FaSort /> Name
                      </th>
                      <th onClick={() => sorting("address")}>
                        {" "}
                        <FaSort /> Address
                      </th>
                      <th onClick={() => sorting("phone")}>
                        {" "}
                        <FaSort /> Phone
                      </th>
                      <th onClick={() => sorting("accountNumber")}>
                        {" "}
                        <FaSort /> Acount Number
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
                          <td style={{textAlign: 'center'}}>
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
                    Showing <b>{currentItems.length}</b> out of <b>{data.length}</b>{" "}
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
              <Modal.Title>Add New Vendor</Modal.Title>
             
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
            <p style={{color:"red"}}>Please complete all required fields</p>
              <div>
                <div className="form-group">
                  <label className="form-label">Vendor Name <span style={{color :"red"}} >*</span> </label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
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
                  style={{maxWidth:"500px"}}
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
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter phone number"
                    name="phone"
                    value={vendorData.phone}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Bank Name<span style={{color :"red"}} >*</span></label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter bank name"
                    name="bank_name"
                    value={vendorData.bank_name}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Account Number <span style={{color :"red"}} >*</span></label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter account number"
                    name="account_number"
                    value={vendorData.account_number}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Account Name <span style={{color :"red"}} >*</span></label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter account owner name"
                    name="account_name"
                    value={vendorData.account_name}
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
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={hanldePostClose}>
                Close
              </Button>
            </Modal.Footer> */}
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
              <Modal.Title>Edit {RowData.name} Data </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e)=>handleEdit(e,RowData.name)}>
              <div>
                <div className="form-group">
                  <div className="form-group mt-3">
                  <label>Address</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter Address"
                    name="address"
                    defaultValue={RowData.address}
                    />
                  </div>
                  <div className="form-group mt-3">
                  <label>Phone</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter Phone"
                    name="phone"
                    defaultValue={RowData.phone}
                    />
                  </div>
                  <div className="form-group mt-3">
                  <label className="form-label">Bank Name</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter bank name"
                    name="bank_name"
                    defaultValue={RowData.bank_name}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Account Number</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter account number"
                    name="account_number"
                    defaultValue={RowData.account_number}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Account Name</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter account owner name"
                    name="account_name"
                    defaultValue={RowData.account_name}
                  />
                </div>
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
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={hanldeEditClose}>
                Close
              </Button>
            </Modal.Footer> */}
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
                  <div className="form-group mt-3">
                  <label>Vendor Name </label>
                  <input
                  style={{maxWidth:"500px"}}
                  type="text"
                  className="form-control"
                  value={RowData.name}
                  readOnly
                  />
                  </div>
                  <div className="form-group mt-3">
                  <label>Address</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    readOnly
                    defaultValue={RowData.address}
                    />
                  </div>
                  <div className="form-group mt-3">
                  <label>Phone</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    readOnly
                    defaultValue={RowData.phone}
                    />
                  </div>
                  <div className="form-group mt-3">
                  <label className="form-label">Bank Name</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    readOnly
                    defaultValue={RowData.bank_name}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Account Number</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    readOnly
                    defaultValue={RowData.account_number}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Account Name</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    readOnly
                    defaultValue={RowData.account_name}
                  />
                </div>
                  
                </div>
              </div>
            </Modal.Body>
            {/* <Modal.Footer>
              <Button variant="secondary" onClick={hanldeViewClose}>
                Close
              </Button>
            </Modal.Footer> */}
          </Modal>
        </div>
      </div>
      </Sidebar>
    </>
  );
};
