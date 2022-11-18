import '../Vendor/vendor.css'
import React, { useEffect, useState, useRef } from "react";
import { FiPlus } from "react-icons/fi";
import Swal from 'sweetalert2'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import {FaSort} from 'react-icons/fa'
import { useDeps } from '../../shared/context/DependencyContext';
import { EVENT } from '../../shared/constants';
import Sidebar from '../../shared/components/Sidebar/Sidebar';
import { Failed } from '../../shared/components/Notification/Failed';
import { useAuth } from '../../services/UseAuth';

export const ExpeditionManage = () => {
//Define here local state that store the form Data
    const [expeditionData, setExpeditionData] = useState({});

    const [isLoading, setLoading] = useState(false);
    const [doneAddForm, setDoneAddform] = useState(false);
    const { expeditionService, eventLogService } = useDeps();

    const [data, setData] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [RowData, SetRowData] = useState([]);
    const [ViewShow, SetViewShow] = useState(false);

    //For Add New Data Model
    const [ViewPost, SetPostShow] = useState(false);
    const handlePostShow = () => {
        setExpeditionData({})
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
        const newData = { ...expeditionData };
        newData[e.target.name] = e.target.value;
        setExpeditionData(newData);
    };

    //For Edit Model
    const [id, setId] = useState();
    const [ViewEdit, SetEditShow] = useState(false);

    const handleEditShow = (index, item) => {
        setExpeditionData(item);
        SetRowData(item)

        setId(index);
        setDelete(true);
        SetEditShow(true);
    };
    const handleEditClose = () => {
        SetEditShow(false);
    };

    const [Delete, setDelete] = useState(false);
    const [searchExpedition, setSearchExpedition] = useState("");

    // For Pagination
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(10);
    const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    useEffect(() => {
        onGetAllExpedition();
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
        const response = await expeditionService.createExpedition(expeditionData);
        setExpeditionData(response.data);
        SetPostShow(false);
        setDoneAddform(true);
        if (response.status === "SUCCESS") {
            Swal.fire({
            title: "Success!",
            text:"Your data has been saved!",
            icon: 'success',
            })
        }
        onGetAllExpedition();
        clearForm();
        let event = {
            event: EVENT.CREATE_EXPEDITION,
            user: user.name
        }
        createEventLogExpedition(event)
        } catch (error) {
        console.log(error.response);
        Failed('Your data failed to save because '+ error.response.data.error.Detail)
        } finally {
        setLoading(false);
        }
    };

    //=============== GET ALL EXPEDITION ===================

    const onGetAllExpedition = async () => {
        setLoading(true);
        try {
        const response = await expeditionService.getAllExpedition();
        setData(response.data);
        console.log('ini expedition',response.data);
        } catch (e) {
        console.log(e);
        } finally {
        setLoading(false);
        }
    };

    //================ DELETE EXPEDITION ===========================
    const onDeleteExpedition = async (id) => {
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
            const deleteEx = async () => {
            try {
                await expeditionService.deleteExpedition(id);
                onGetAllExpedition();
                let event = {
                event: EVENT.DELETE_EXPEDITION,
                user: user.name
                }
                createEventLogExpedition(event)
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
            deleteEx()
        }
        })
    };

    //Event Log
    const [event, setEvent] = useState({})

    const createEventLogExpedition = async (eventLoc) => {
        try {
            const response = await eventLogService.createEventLog(eventLoc)
            setEvent(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    //=============== EDIT ROW DATA  ===============================
    const handleEdit = async (e,id) => {
        e.preventDefault()

        try {
        const response = await expeditionService.updateExpedition(id, expeditionData);

        setExpeditionData(response);
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
        onGetAllExpedition();
        let event = {
            event: EVENT.UPDATE_EXPEDITION,
            user: user.name
        }
        createEventLogExpedition(event)
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
        setExpeditionData({
        expedition_name: '',
        });  
    }

  // CLEAR SEARCH
    const ref = useRef(null) ;
    const onClearForm = (e) => {
        e.preventDefault()
        ref.current.value = ''; 
        onGetAllExpedition();
    }

    //================== SEARCH BY NAME LIKE ========================
    const onChangeSearchExpedition = (e) => {
        const searchExpedition = e.target.value;
        setSearchExpedition(searchExpedition);
    };

    const onSearchExpedition = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
        const response = await expeditionService.getExpeditionByNameLike(searchExpedition);
        setData(response.data);

        } catch (e) {
        console.log(e);
        } finally {
        }
    };

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
                        onChange={onChangeSearchExpedition}
                        type="text"
                        className="form-control"
                        ref={ref}
                    />
                    <div className="input-group-append">
                        <button value="submit" className="btn btn-primary" onClick={onSearchExpedition}>
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
                    Add New Expedition
                    </Button>
                </div>
                    <div className="table-title">
                        <div className="row">
                            <div className="col-xs-6">
                            <h2 style={{fontSize: "24px", textAlign: 'center'}}>
                                Manage <b>Expedition</b>
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
                            <th style={{width: '300px', textAlign: 'center'}}>Actions</th>
                            <th style={{width: '300px', textAlign: 'center'}} onClick={() => sorting("name")}>
                                {" "}
                                <FaSort /> Name
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                            <tr>
                                <th colspan='6'>Data is not found</th>
                            </tr>
                            ) : (
                            currentItems.map((item, index) => (
                                <tr key={item.expedition_id}>
                                <th>{index + 1}</th>
                                <td style={{textAlign: 'center'}}>
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
                                        handleEditShow(item.expedition_name, item);
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
                                    onClick={() => onDeleteExpedition(item.expedition_id)}
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
                                <th style={{textAlign: 'center'}}>{item.expedition_name}</th>
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
                    <Modal.Title>Add New Expedition</Modal.Title>
                    
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={handleSubmit}>
                    <p style={{color:"red"}}>Please complete all required fields</p>
                    <div>
                        <div className="form-group">
                        <label className="form-label">Expedition Name <span style={{color :"red"}} >*</span> </label>
                        <input
                        required
                        style={{maxWidth:"500px"}}
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            name="expedition_name"
                            value={expeditionData.expedition_name}
                            placeholder="Please enter name"
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
                    onHide={handleEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Edit {RowData.expedition_name} Data </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form onSubmit={(e)=>handleEdit(e,RowData.expedition_id)}>
                    <div>
                        <div className="form-group">
                        <div className="form-group mt-3">
                        <label>Expedition Name</label>
                        <textarea
                        required
                        style={{maxWidth:"500px", height:"100px"}}
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            placeholder="Please enter Address"
                            name="expedition_name"
                            defaultValue={RowData.expedition_name}
                            />
                        </div>
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
                    onHide={handleViewClose}
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
                        <label>Expedition Name </label>
                        <input
                        style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        value={RowData.expedition_name}
                        readOnly
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
    )
}