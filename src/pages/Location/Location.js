import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./style.css";
import Swal from "sweetalert2";
import { FaSort } from "react-icons/fa";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { Success } from "../../shared/components/Notification/Success";
import { EVENT } from "../../shared/constants";
import { Failed } from "../../shared/components/Notification/Failed";
import { useAuth } from "../../services/UseAuth";

export const Location = () => {
  const [locData, setLocData] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [doneAddForm, setDoneAddform] = useState(false);
  const { locationService, eventLogService } = useDeps();
  const areAllFieldsFilled = locData != "";
  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);

  const handleViewShow = () => {
    SetViewShow(true);
  };
  const hanldeViewClose = () => {
    SetViewShow(false);
  };

  //For Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    SetPostShow(true);
  };
  const hanldePostClose = () => {
    SetPostShow(false);
  };

  //For Edit Model
  const [id, setId] = useState();
  const [ViewEdit, SetEditShow] = useState(false);

  const handleEditShow = (index, item) => {
    setLocData(item);
    SetRowData(item);
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
    const newData = { ...locData };
    newData[e.target.name] = e.target.value;
    setLocData(newData);
  };

  useEffect(() => {
    onGetAllLocation();
  }, [doneAddForm]);

  useEffect(() => {
    onGetCookie();
  }, []);

  // ==================CRUD LOCATIONS=============================

  //================== Add Data To Table ==========================
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await locationService.createLocation(locData);

      setLocData(response);
      setDoneAddform(true);

      if (response.status === "SUCCESS") {
        swal({
          title: "Success!",
          text: "Your data has been saved!",
          icon: "success",
          button: "OK!",
        });
      }
      onGetAllLocation();
      let event = {
        event: EVENT.CREATE_LOCATION,
        user: user.name,
      };
      createEventLogLocation(event);
    } catch (error) {
      console.log(error.response);
      Failed(
        "Your data failed to save because " + error.response.data.error.Detail
      );
    } finally {
      setLoading(false);
    }
  };

  //=============== GET ALL LOCATIONS ===================

  const onGetAllLocation = async () => {
    setLoading(true);
    try {
      const response = await locationService.getAllLocation();

      setData(response.data);
      SetPostShow(false);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //================ DELETE LOCATION ===========================
  const onDeleteLocation = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = locationService.deleteLocation(id);

          onGetAllLocation();
          let event = {
            event: EVENT.DELETE_LOCATION,
            user: user.name,
          };
          createEventLogLocation(event);
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
        } catch (e) {
          console.log(e);
          Failed("Your data failed to delete");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  //================== SEARCH BY NAME =========================
  const onChangeSearchLocation = (e) => {
    const searchLocation = e.target.value;
    setSearchLocation(searchLocation);
  };

  const onSearchLocation = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await locationService.getLocationByName(searchLocation);
      setData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  // CLEAR SEARCH
  const ref = useRef(null);
  const onClearForm = (e) => {
    e.preventDefault();
    ref.current.value = "";
    onGetAllLocation();
  };

  // CLEAR FORM
  const clearForm = () => {
    setLocData({
      cluster: "",
      location: "",
    });
  };

  //=============== EDIT ROW DATA  ===============================
  const handleEdit = async (e, id) => {
    e.preventDefault();

    try {
      const response = await locationService.updateLocation(id, locData);
      setLocData(response);
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
      onGetAllLocation();
      let event = {
        event: EVENT.UPDATE_LOCATION,
        user: user.name,
      };
      createEventLogLocation(event);
    } catch (error) {
      console.log(error.response);
      Failed("Your data failed to save");
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
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
  };

  //================== EVENT LOG ===============================
  const [event, setEvent] = useState({});

  const createEventLogLocation = async (eventLoc) => {
    try {
      const response = await eventLogService.createEventLog(eventLoc);
      setEvent(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //================== GET USER ===============================
  const { getCookie } = useAuth();
  const [user, setUser] = useState({
    name: "",
    position: "",
    role: "",
  });
  const onGetCookie = () => {
    let savedUserJsonString = getCookie("user");
    let savedUser = JSON.parse(savedUserJsonString);
    setUser((prevObj) => ({
      ...prevObj,
      name: savedUser.name,
      position: savedUser.position,
      role: savedUser.role,
    }));

    console.log(user.name);
  };
  document.querySelector("body").style.overflow = "auto";
  return (
    <>
      <Sidebar>
        <div className="body">
          <div className="container">
            <div className="loc-container-item">
              <form>
                <div className="input-group">
                  <input
                    ref={ref}
                    placeholder="Search"
                    // value={searchLocation}
                    onChange={onChangeSearchLocation}
                    type="text"
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button
                      value="submit"
                      className="btn btn-primary"
                      onClick={onSearchLocation}
                    >
                      <i className="fas fa-search"></i>
                    </button>
                    <button
                      value="submit"
                      className="btn btn-danger form-button"
                      onClick={onClearForm}
                    >
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
                Add New Location
              </Button>
            </div>

            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-xs-6">
                      <h2>
                        Manage <b>Locations</b>
                      </h2>
                    </div>
                  </div>
                </div>

                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th onClick={() => sorting("cluster")}>
                        {" "}
                        <FaSort /> Cluster
                      </th>
                      <th onClick={() => sorting("location")}>
                        {" "}
                        <FaSort /> Location
                      </th>
                      <th onClick={() => sortingNum("ID")}>
                        {" "}
                        <FaSort /> Area Code
                      </th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <th colspan="4">Data is not found</th>
                      </tr>
                    ) : (
                      currentItems.map((item, index) => (
                        <tr key={item["kode wilayah"]}>
                          <th>{index + 1}</th>
                          <th>{item.cluster}</th>
                          <th>{item.location}</th>
                          <th>{item["kode wilayah"]}</th>
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
                                handleEditShow(RowData.ID, item);
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
                              onClick={() => onDeleteLocation(item.ID)}
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
                    Showing <b>{currentItems.length}</b> out of{" "}
                    <b>{data.length}</b> entries
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
              <Modal.Title>Add new Location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <p style={{ color: "red" }}>
                  Please complete all required fields
                </p>
                <div>
                  <div className="form-group">
                    <label className="form-label">
                      Cluster <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      style={{ maxWidth: "500px" }}
                      type="text"
                      className="form-control"
                      name="cluster"
                      placeholder="Location Name"
                      required
                      onChange={handleLocation}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Location Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      style={{ maxWidth: "500px" }}
                      type="text"
                      className="form-control"
                      name="location"
                      placeholder="Location Name"
                      required
                      onChange={handleLocation}
                    />
                  </div>

                  <Button type="submit" className="btn btn-success mt-4">
                    Add{" "}
                  </Button>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={hanldePostClose}>
                Close
              </Button> */}
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
              <form onSubmit={(e) => handleEdit(e, RowData["kode wilayah"])}>
                <div>
                  <div className="form-group">
                    <label>Cluster</label>
                    <input
                      style={{ maxWidth: "500px" }}
                      name="cluster"
                      type="text"
                      className="form-control"
                      onChange={handleLocation}
                      placeholder="Please enter Location Name"
                      defaultValue={RowData.cluster}
                    />
                  </div>
                  <div className="form-group">
                    <label>Location Name</label>
                    <input
                      style={{ maxWidth: "500px" }}
                      name="location"
                      type="text"
                      className="form-control"
                      onChange={handleLocation}
                      placeholder="Please enter Location Name"
                      defaultValue={RowData.location}
                    />
                  </div>

                  <Button type="submit" className="btn btn-warning mt-4">
                    Save Changes
                  </Button>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              {/* <Button variant="secondary" onClick={hanldeEditClose}>
                Close
              </Button> */}
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
                <div className="form-group mt-2">
                  <label>ID Location </label>
                  <input
                    style={{ maxWidth: "500px" }}
                    type="text"
                    className="form-control"
                    value={RowData["kode wilayah"]}
                    readOnly
                  />

                  <label>Location Name</label>
                  <input
                    style={{ maxWidth: "500px" }}
                    type="text"
                    className="form-control"
                    value={RowData.location}
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
              {/* <Button variant="secondary" onClick={hanldeViewClose}>
                Close
              </Button> */}
            </Modal.Footer>
          </Modal>
        </div>
        {/* </div> */}
      </Sidebar>
    </>
  );
};
