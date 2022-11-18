import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { useAuth } from '../../services/UseAuth';
import { Failed } from '../../shared/components/Notification/Failed';
import Sidebar from '../../shared/components/Sidebar/Sidebar';
import { EVENT } from '../../shared/constants';
import { useDeps } from '../../shared/context/DependencyContext';
import { FiPlus } from "react-icons/fi";
import {FaSort} from 'react-icons/fa'

export const AdditionalCost = () => {
  const [addCostData, setAddCostData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [doneAddForm, setDoneAddform] = useState(false);
  const { additionalCostService, eventLogService } = useDeps();

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);

  //For Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    setAddCostData({})
    SetPostShow(true);
  };
  const handlePostClose = () => {
    SetPostShow(false);
  };

  const handleViewShow = () => {
    SetViewShow(true);
  };
  const handleViewClose = () => {
    SetViewShow(false);
  };

  const handleChange = (e) => {
    const newData = { ...addCostData };
    newData[e.target.name] = e.target.value;
    setAddCostData(newData);
  };

  //For Edit Model
  const [id, setId] = useState();
  const [ViewEdit, SetEditShow] = useState(false);

  const handleEditShow = (index, item) => {
    setAddCostData(item);
    SetRowData(item)

    setId(index);
    setDelete(true);
    SetEditShow(true);
  };
  const handleEditClose = () => {
    SetEditShow(false);
  };

  const [Delete, setDelete] = useState(false);
  const [searchAddCost, setSearchAddCost] = useState("");

  // For Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  useEffect(() => {
    onGetAllAddCost();
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
      const response = await additionalCostService.createAddCost(addCostData);
      setAddCostData(response.data);
      SetPostShow(false);
      setDoneAddform(true);
      if (response.status === "SUCCESS") {
        Swal.fire({
          title: "Success!",
          text:"Your data has been saved!",
          icon: 'success',
        })
      }
      onGetAllAddCost();
      clearForm();
      let event = {
        event: EVENT.CREATE_ADDITIONAL_COST,
        user: user.name
      }
      createEventLogAddCost(event)
    } catch (error) {
      console.log(error.response);
      Failed('Your data failed to save because '+ error.response.data.error.Detail)
    } finally {
      setLoading(false);
    }
  };

  //=============== GET ALL LOCATIONS ===================

  const onGetAllAddCost = async () => {
    setLoading(true);
    try {
      const response = await additionalCostService.getAllAddCost();
      setData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //================ DELETE ===========================
  const onDeleteAddCost = async (id) => {
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
        const deleteAddCost = async () => {
          try {
            await additionalCostService.deleteAddCost(id);
            onGetAllAddCost();
            let event = {
              event: EVENT.DELETE_ADDITIONAL_COST,
              user: user.name
            }
            createEventLogAddCost(event)
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
        deleteAddCost()
      }
    })

  };

  //================== SEARCH BY NAME LIKE ========================
  // const onChangeSearch = (e) => {
  //   const searchAddCost = e.target.value;
  //   setSearchAddCost(searchAddCost);
  // };

  // const onSearch = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await vendorService.getVendorByNameLike(searchLocation);
  //     setData(response.data);

  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //   }
  // };

  //=============== EDIT ROW DATA  ===============================
  const handleEdit = async (e,id) => {
    e.preventDefault()

    try {
      const response = await additionalCostService.updateAddCost(id, addCostData);
      setAddCostData(response);
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
      onGetAllAddCost();
      let event = {
        event: EVENT.UPDATE_ADDITIONAL_COST,
        user: user.name
      }
      createEventLogAddCost(event)
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
    setAddCostData({
      category: '',
    });
    
}
// CLEAR SEARCH
const ref = useRef(null) ;
const onClearForm = (e) => {
  e.preventDefault()
  ref.current.value = ''; 
  onGetAllAddCost();
}

//Event Log
const [event, setEvent] = useState({})

const createEventLogAddCost= async (eventLoc) => {
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
            {/* <div className="input-group ">
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
            </div> */}
          </form>
          <Button
              variant="primary"
              onClick={() => {
                handlePostShow();
              }}
            >
               <FiPlus />
              Add New
            </Button>
          </div>
            <div className="table-title">
                  <div className="row">
                    <div className="col-xs-6">
                      <h2 style={{fontSize: "24px", textAlign: 'center'}}>
                        Manage Additional Cost
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
                      <th style={{width:'300px', textAlign:'center'}}>Actions</th>
                      <th style={{width:'500px',textAlign:'center'}} onClick={() => sorting("category")}>
                        {" "}
                        <FaSort /> Category
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <th colspan='3'>Data is not found</th>
                      </tr>
                    ) : (
                      currentItems.map((item, index) => (
                        <tr key={item.ID}>
                          <th>{index + 1}</th>
                          <td style={{textAlign:'center'}} >
                            {/* <a
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
                            </a> */}
                            <a
                              onClick={() => {
                                handleEditShow(item.id, item);
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
                              onClick={() => onDeleteAddCost(item.master_additional_cost_id)}
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
                          <th>{item.category}</th>
                          
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
            onHide={handlePostClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New Additional Cost</Modal.Title>
             
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
            <p style={{color:"red"}}>Please complete all required fields</p>
              <div>
                <div className="form-group">
                  <label className="form-label">Category <span style={{color :"red"}} >*</span> </label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    name="category"
                    value={addCostData.category}
                    placeholder="Please enter category"
                    autoFocus
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
          </Modal>
        </div>

        {/* EDIT MODAL */}

        <div className="model-box-view">
          <Modal
            show={ViewEdit}
            onHide={handleEditClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit {RowData.category} Data </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={(e)=>handleEdit(e,RowData.name)}>
              <div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                  required
                  style={{maxWidth:"500px"}}
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Please enter Address"
                    name="address"
                    defaultValue={RowData.category}
                  />
                </div>
                </div>
                <Button
                  type="submit"
                  className="btn btn-success mt-4"               
                >
                  Save Changes
                </Button>
              </form>
            </Modal.Body>
            
          </Modal>
        </div>
      </div>
      </Sidebar>
    </>
  );
}

