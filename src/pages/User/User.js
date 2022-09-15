import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./user.css";
import Swal from 'sweetalert2'
import {FaSort} from 'react-icons/fa'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { Row } from "react-bootstrap";
import { Failed } from "../../shared/components/Notification/Failed";
import { EVENT } from "../../shared/constants";
import { useAuth } from "../../services/UseAuth";

export const UserManage = () => {
  //Define here local state that store the form Data
  const [userData, setUserData] = useState({});

  const [isLoading, setLoading] = useState(false);
  const [doneAddForm, setDoneAddform] = useState(false);
  const { userService, locationService, eventLogService } = useDeps();


  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);

  //For Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    setUserData({})
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
    const newData = { ...userData };
    newData[e.target.name] = e.target.value;
    setUserData(newData);
    console.log(newData)
  };

  //For Edit Model
  const [id, setId] = useState();
  const [ViewEdit, SetEditShow] = useState(false);

  const handleEditShow = (index, item) => {
    setUserData(item);
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
    onGetAllUser();
    onGetAllLocation();
  }, [doneAddForm]);

  // ==================CRUD User=============================

  //================== Add Data To Table ==========================
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
        userData["location_id"] = Number(userData["location_id"]);
      const response = await userService.createUser(userData);
      setUserData(response.data);
      SetPostShow(false);
      setDoneAddform(true);
      if (response.status === "SUCCESS") {
        Swal.fire({
          title: "Success!",
          text:"Your data has been saved!",
          icon: 'success',
        })
      }
      onGetAllUser();
      let event = {
        event: EVENT.CREATE_USER,
        user: user.name,
      };
      createEventImportData(event);
      clearForm();
    } catch (error) {
      console.log(error.response);
      Failed('Your data failed to save because '+ error.response.data.error.Detail)
    } finally {
      setLoading(false);
    }
  };
    // GET ALL LOCATIONS
    const [locations, setLocations] = useState([]);
    const onGetAllLocation = async () => {
      try {
        const response = await locationService.getAllLocation();
        setLocations(response.data);
      } catch (e) {
        console.log(e);
      } finally {
      }
    };

  //=============== GET ALL User ===================

  const onGetAllUser = async () => {
    setLoading(true);
    try {
      const response = await userService.getAllUser();
      console.log(response)
      setData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };


  //================ DELETE User ===========================
  const onDeleteUser= async (name) => {
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
          const response = userService.deleteUser(name);

          onGetAllUser();
          let event = {
            event: EVENT.DELETE_USER,
            user: user.name,
          };
          createEventImportData(event);
        } catch (e) {
          console.log(e);
          Failed('Your data failed to save because '+ e.response.data.error.Detail)
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
      const response = await userService.getUserByNameLike(searchLocation);
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
      userData.location_id= Number(userData.location_id)
      const response = await userService.updateUser(id, userData);

      setUserData(response);
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
      onGetAllUser();
      let event = {
        event: EVENT.UPDATE_ASSET,
        user: user.name,
      };
      createEventImportData(event);
    } catch (error) {
      console.log(error.response);
      Failed('Your data failed to save because '+ error.response.data.error.Detail)
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

  const sortingNum = (col) => {
    if (order === "ASC") {
        const sorted = [...data].sort((a, b) =>
          a[col] > b[col] ? 1 : -1
        );
        setData(sorted);
        setOrder("DSC");
      }
      if (order === "DSC") {
        const sorted = [...data].sort((a, b) =>
          a[col] < b[col] ? 1 : -1
        );
        setData(sorted);
        setOrder("ASC");
      }
  }
  // CLEAR FORM
  const clearForm = () => {
    setUserData({
      nik: '',
      email: '',
      name: '',
      role: '',
      level_approval: '',
      location_id: '',
      tap: '',
      department: '',
    });
    
}
// CLEAR SEARCH
const ref = useRef(null) ;
const onClearForm = (e) => {
  e.preventDefault()
  ref.current.value = ''; 
  onGetAllUser();
}

//Event Log
const [event, setEvent] = useState({});

const createEventImportData = async (eventLoc) => {
  try {
    const response = await eventLogService.createEventLog(eventLoc);
    setEvent(response.data);
  } catch (e) {
    console.log(e);
  }
};

//Get User
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

useEffect(() => {
  onGetCookie();
}, []);

  return (
    <>
      <Sidebar>
      <div>
      <div className="body">
          <div className="container">
          <div className="user-container-item" >
          <form>
            <div className="input-group ">
              <input
                placeholder="Search User Name"
                // value={searchLocation}
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
              Add New User
            </Button>
          </div>
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-xs-6">
                      <h2>
                        Manage Users
                      </h2>
                    </div>
                  </div>
                </div>

                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th onClick={() => sorting("nik")}>
                        {" "}
                        <FaSort /> NIK
                      </th>
                      <th onClick={() => sorting("email")}>
                        {" "}
                        <FaSort /> Email
                      </th>
                      <th onClick={() => sorting("name")}>
                        {" "}
                        <FaSort /> Name
                      </th>
                      <th onClick={() => sorting("role")}>
                        {" "}
                        <FaSort /> Role
                      </th>
                      <th onClick={() => sorting("level_approval")}>
                        {" "}
                        <FaSort /> Level Approval
                      </th>
                      <th onClick={() => sortingNum("location_id")}>
                        {" "}
                        <FaSort /> Area Code
                      </th>
                      <th onClick={() => sorting("TAP")}>
                        {" "}
                        <FaSort /> Location
                      </th>
                      <th onClick={() => sorting("Cluster")}>
                        {" "}
                        <FaSort /> Cluster
                      </th>
                      <th onClick={() => sorting("department")}>
                        {" "}
                        <FaSort /> Department
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <th colspan='9'>Data is not found</th>
                      </tr>
                    ) : (
                      currentItems.map((item, index) => (
                        <tr key={item.name}>
                          <th>{index + 1}</th>
                          <th>{item.nik}</th>
                          <th>{item.email}</th>
                          <th>{item.name}</th>
                          <th>{item.role}</th>
                          <th>{item.level_approval}</th>
                          <th>{item.location_id}</th>
                          <th>{item.TAP}</th>
                          <th>{item.Cluster}</th>
                          <th>{item.department}</th>
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
                              onClick={() => onDeleteUser(item.name)}
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
                  {/* <button onClick={handleLoadMore} className="loadmore">
                    Load More
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ADD MODAL FOR SUBMIT DATABASE */}
        <div className="userModal">
        <div className="model-box-view">
          <Modal
            show={ViewPost}
            onHide={hanldePostClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New User</Modal.Title>
             
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
            <p style={{color:"red"}}>Please complete all required fields</p>
                
              <div className="form-user">
              <div className="form-group mt-3">
                  <label className="form-label">NIK <span style={{color :"red"}} >*</span></label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter NIK"
                    name="nik"
                    value={userData.nik}
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Email <span style={{color :"red"}} >*</span></label>
                  <input
                  required
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter email"
                    name="email"
                    value={userData.email}
                    
                  />
                </div>
                <div className="form-group mt-3">
                  <label className="form-label">Name<span style={{color :"red"}} >*</span></label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter name"
                    name="name"
                    value={userData.name}
                  />
                </div>
                <div className="inputBoxUser">
                  <label className="form-label mt-3">Role <span style={{color :"red"}} >*</span></label>
                  <select
                    required
                    name="role"
                    value={userData.role}
                    onChange={handleChange}
                    style={{width:'100%'}}
                  >
                    <option disable value="">Select</option>
                    <option>Admin</option>
                    <option>Manager GA</option>
                    <option>Manager IT</option>
                    <option>Regular</option>
                  </select>
                  </div>
                  {userData.role!== 'Admin' &&  <div className="inputBoxUser">
                  <label className="form-label mt-3">Level Approval<span style={{color :"red"}} >*</span></label>
                  <select
                    required
                    name="level_approval"
                    value={userData.level_approval}
                    onChange={handleChange}
                    style={{width:'100%'}}
                  >
                    <option disable value="">Select</option>
                    <option>General Manager</option>
                    <option>Supervisor</option>
                    <option>VP Trade</option>
                    <option>Regular</option>
                    <option>GA</option>
                    <option>IT</option>
                  </select>
                </div>}
                <div className="inputBoxUser">
                  <label className="form-label mt-3">Location <span style={{color :"red"}} >*</span></label>
                  <select
                    required
                    name="location_id"
                    value={userData["location_id"]}
                    onChange={handleChange}
                    style={{width:'100%'}}
                  >
                   <option value="">Select Location</option>
                    {locations.map((item, index) => (
                      <option key={item["kode wilayah"]} value={item['kode wilayah']}>
                       {item.location}
                      </option>
                    ))}
                  </select>
                </div>
                {userData.role !== 'Admin' && <div className="inputBoxUser">
                  <label className="form-label mt-3">Department<span style={{color :"red"}} >*</span></label>
                  <select
                    required
                    name="department"
                    value={userData.department}
                    onChange={handleChange}
                    style={{width:'100%'}}
                  >
                    <option disable value="">Select</option>
                    <option>Finance</option>
                    <option>Cluster</option>
                    <option>Sales</option>
                    <option>HR</option>
                    <option>OS</option>
                    <option>GA</option>
                    <option>IT</option>
                  </select>
                </div>}  
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
              <Modal.Title>Edit User Data </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e)=>handleEdit(e,RowData.name)}>
              <div className="form-user">
                <div className="form-group">
                <div className="inputBoxUser">
                  <label className="form-label mt-3">NIK</label>
                  <input
                  required
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter NIK"
                    name="nik"
                    defaultValue={RowData.nik}
                  />
                </div>
                   <div className="inputBoxUser">
                   <label className="form-label mt-3">Email</label>
                  <input
                  required
                    type="email"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter Email"
                    name="email"
                    defaultValue={RowData.email}
                  />
                   </div>
                  
                  <div className="inputBoxUser">
                  <label className="form-label mt-3">Role <span style={{color :"red"}} >*</span></label>
                  <select
                    required
                    name="role"
                    defaultValue={RowData.role}
                    onChange={handleChange}
                    style={{width:'100%'}}
                  >
                    <option disable value="">Select</option>
                    <option>Admin</option>
                    <option>Manager GA</option>
                    <option>Manager IT</option>
                    <option>Regular</option>
                  </select>
                  </div>
                  {RowData.role!== 'Admin' &&  <div className="inputBoxUser">
                  <label className="form-label mt-3">Level Approval<span style={{color :"red"}} >*</span></label>
                  <select
                    required
                    name="level_approval"
                    defaultValue={RowData.level_approval}
                    onChange={handleChange}
                    style={{width:'100%'}}
                  >
                    <option disabled value="">Select</option>
                    <option>General Manager</option>
                    <option>Supervisor</option>
                    <option>VP Trade</option>
                    <option>Regular</option>
                    <option>GA</option>
                    <option>IT</option>
                  </select>
                </div>}
                <div className="inputBoxUser">
                  <label className="form-label mt-3">Location <span style={{color :"red"}} >*</span></label>
                  <select
                    required
                    name="location_id"
                    defaultValue={RowData.location_id}
                    onChange={handleChange}
                    style={{width:'100%'}}
                  >
                   <option value="">Select Location</option>
                    {locations.map((item, index) => (
                      <option key={item["kode wilayah"]} value={item['kode wilayah']}>
                       {item.location}
                      </option>
                    ))}
                  </select>
                </div>
                {RowData.role !== 'Admin' && <div className="inputBoxUser">
                  <label className="form-label mt-3">Department<span style={{color :"red"}} >*</span></label>
                  <select
                    required
                    name="department"
                    defaultValue={RowData.department}
                    onChange={handleChange}
                    style={{width:'100%'}}
                  >
                    <option disable value="">Select</option>
                    <option>Finance</option>
                    <option>Cluster</option>
                    <option>Sales</option>
                    <option>HR</option>
                    <option>OS</option>
                    <option>GA</option>
                    <option>IT</option>
                  </select>
                </div>}  
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
              <Modal.Title>View Data {RowData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-user">
                <div className="form-group">
                <label>NIK</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.nik}
                    readOnly
                  />
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.email}
                    readOnly
                  />
                  <label>Username </label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.name}
                    readOnly
                  />
                  <label>Role </label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.role}
                    readOnly
                  />
                  <label>Level Approval</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.level_approval}
                    readOnly
                  />
                  <label>Area Code </label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.location_id}
                    readOnly
                  />
                  <label>Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.TAP}
                    readOnly
                  />
                   <label>Cluster</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.Cluster}
                    readOnly
                  />
                  <label>Department</label>
                  <input
                    type="text"
                    className="form-control"
                    value={RowData.department}
                    readOnly
                  />
                </div>
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
      </div>
      </Sidebar>
    </>
  );
};
