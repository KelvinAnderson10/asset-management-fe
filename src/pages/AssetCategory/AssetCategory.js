import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import { FiPlus } from "react-icons/fi";
import Swal from 'sweetalert2'
import { FaSort } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import './AssetCategory.css'
import { Failed } from "../../shared/components/Notification/Failed";
import { Success } from "../../shared/components/Notification/Success";
import { EVENT } from "../../shared/constants";
import { useAuth } from "../../services/UseAuth";

export const AssetCategory = () => {
  const [assetCategory, setAssetCategory] = useState({});

  const [isLoading, setLoading] = useState(false);
  const [doneAddForm, setDoneAddform] = useState(false);
  const { assetCategoryService, eventLogService } = useDeps();

  const [data, setData] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [RowData, SetRowData] = useState([]);
  const [ViewShow, SetViewShow] = useState(false);

  //Add New Data Model
  const [ViewPost, SetPostShow] = useState(false);
  const handlePostShow = () => {
    setAssetCategory({})
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
    const newData = { ...assetCategory };
    newData[e.target.name] = e.target.value;
    setAssetCategory(newData);
    
  };

  //Edit Model
  const [id, setId] = useState();
  const [ViewEdit, SetEditShow] = useState(false);

  const handleEditShow = (index, item) => {
    SetRowData(item);
    setAssetCategory(item);
    setId(index);
    SetEditShow(true);
  };

  const handleEditClose = () => {
    SetEditShow(false);
  };


  //Pagination Model
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


  useEffect(() => {
    onGetAllAssetCategory();
  }, [doneAddForm]);

  useEffect( () => {
    onGetCookie()
  }, [])

  //CRUD
  //Add Data
  const handleSubmit = async (e) => {

    setLoading(true);
    e.preventDefault();
    try {
      assetCategory.useful_life = Number(assetCategory.useful_life)
      const response = await assetCategoryService.createAssetCategory(assetCategory);
      setAssetCategory(response.data);
      SetPostShow(false);
      setDoneAddform(true);

      if (response.status === "SUCCESS") {
        Success('added')
      } 
      onGetAllAssetCategory();
      let event = {
        event: EVENT.CREATE_ASSET_CATEGORY,
        user: user.name
      }
      createEventLogAssetCategory(event)
      clearForm();
    } catch (error) {
      console.log(error.response);
      Failed('Your data failed to save because '+ error.response.data.error.Detail)
    } finally {
      setLoading(false);
    }
  };

  //GetAll
  const onGetAllAssetCategory = async () => {
    setLoading(true);
    try {
      const response = await assetCategoryService.getAllAssetCategory();

      setData(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //
  const onDeleteAssetCategory = async (name) => {

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
          const response = assetCategoryService.deleteAssetCategory(name);
          onGetAllAssetCategory();
          let event = {
            event: EVENT.DELETE_ASSET_CATEGORY,
            user: user.name
          }
          createEventLogAssetCategory(event)
          Swal.fire("Deleted!", "Your data has been deleted.", "success");
        } catch (e) {
          console.log(e.response)
          Failed('Your data failed to delete')
        } finally {
          setLoading(false);
        }
      }
    })

  };

  

  //Filter
  const [filter, setFilter] = useState('');
  const [dropdownName, setDropdownName] = useState('');
  const [fill, setFill] = useState(true);
  const ref = useRef(null) ;

  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const onChangeDropdown= (dropdownName) => {
    setDropdownName(dropdownName)
    setFill(false)
  }

  const onFilter = async () => {

    if (dropdownName === 'Subproduct') {
      setLoading(true);
      try {
        const response = await assetCategoryService.getDataBySubproductLike(filter);
        setData(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    } else if (dropdownName === 'Product') {
      setLoading(true);
      try {
        const response = await assetCategoryService.getDataByProductLike(filter);
        setData(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    } else {
      setLoading(true);
      try {
        const response = await assetCategoryService.getDataByAssetCategoryLike(filter);
        setData(response.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false)
      }
    }
  }

  const onClearForm = () => {
    ref.current.value = ''; 
    onGetAllAssetCategory();
  }

  //Edit Data
  const handleEdit = async (e, id) => {
    e.preventDefault()
  
    try {
      assetCategory.useful_life = Number(assetCategory.useful_life)
      const response = await assetCategoryService.updateAssetCategory(id, assetCategory);
      setAssetCategory(response);
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
      onGetAllAssetCategory();
      let event = {
        event: EVENT.UPDATE_ASSET_CATEGORY,
        user: user.name
      }
      createEventLogAssetCategory(event)
    } catch (error) {
      Failed('Your data failed to save')
    } finally {
      setLoading(false);
    }
  };

  //Pagination
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

  //Sorting
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
    setAssetCategory({
      asset_category:'',
      useful_life:0,
      product_code:'',
      product_name:'',
      subproduct_name:''
    });
    
  }

  //EventLog
  const [event, setEvent] = useState({})

  const createEventLogAssetCategory = async (eventLoc) => {
    try {
      const response = await eventLogService.createEventLog(eventLoc)
      setEvent(response.data)
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  }

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
  document.querySelector("body").style.overflow = "auto";
  return (
    <>
      <Sidebar>
      <div className="body">
        <div className="container">
            <div className="feature" >
            <div className="input-group mb-3 dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Search by {dropdownName}</button>
                <ul className="dropdown-menu" >
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Subproduct')}}>Subproduct</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Product')}}>Product</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Asset Category')}}>Asset Category</a></li>
                </ul>
                <input ref={ref} disabled={fill} type="text" className="form-control" aria-label="Text input with dropdown button" onChange={onChangeFilter}/>
                <div className="input-group-append">
                        <button value="submit" className="btn btn-primary form-button" onClick={onFilter}>
                        <i className="fa fa-search"></i>
                        </button>
                        <button value="submit" className="btn btn-danger form-button" onClick={onClearForm}>
                        <i className="fa fa-times"></i>
                        </button>
                </div>   
            </div>
                <Button
                  variant="primary"
                  onClick={() => {
                      handlePostShow();
                  }}
                  >
                  <FiPlus />
                  Add New Asset Category
                </Button>                    
            </div>
            <div className="body container table-wrapper table-responsive">
                    <div className="table-title">
                    <div className="row">
                        <div className="col-xs-6">
                        <h2>
                            Manage <b>Asset Category</b>
                        </h2>
                        </div>
                    </div>
                    </div>

                    <table id='myTable' className="table table-striped table-hover">
                    <thead>
                        <tr>
                        <th>No</th>
                        <th onClick={() => sorting("asset_category")}>
                            {" "}
                            <FaSort /> Asset Category
                        </th>
                        <th onClick={() => sortingNum("useful_life")}>
                            {" "}
                            <FaSort /> Useful Life
                        </th>
                        <th onClick={() => sorting("product_code")}>
                            {" "}
                            <FaSort /> Product Code
                        </th>
                        <th onClick={() => sorting("product_name")}>
                            {" "}
                            <FaSort /> Product Name
                        </th>
                        <th onClick={() => sorting("subproduct_name")}>
                            {" "}
                            <FaSort /> Subproduct Name
                        </th>
                        <th>PIC</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                        <tr>
                          <th colspan='8'>Data is not found</th>
                        </tr>
                        ) : (
                        currentItems.map((item, index) => (
                            <tr key={item.subproduct_name}>
                            <th>{index + 1}</th>
                            <th>{item.asset_category}</th>
                            <th>{item.useful_life}</th>
                            <th>{item.product_code}</th>
                            <th>{item.product_name}</th>
                            <th>{item.subproduct_name}</th>
                            <th>{item.pic}</th>
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
                                    handleEditShow(RowData.subproduct_name, item);
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
                                onClick={() => onDeleteAssetCategory(item.subproduct_name)}
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

            {/* ADD MODAL FOR SUBMIT DATABASE */}

            <div className="model-box-view">
              <Modal
                show={ViewPost}
                onHide={handlePostClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Add New AssetCategory</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleSubmit}>
                <p style={{color:"red"}}>Please complete all required fields</p>
                <div>
                    <div className="form-group">
                    <label className="form-label">Asset Category<span style={{color :"red"}} >*</span> </label>
                    <input
                        style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        name="asset_category"
                        value={assetCategory.asset_category}
                        placeholder="Please enter asset_category"
                        required
                    />
                    </div>
                    <div className="form-group mt-3">
                    <label className="form-label">Useful Life<span style={{color :"red"}} >*</span></label>
                    <input
                         style={{maxWidth:"500px"}}
                        required
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        name="useful_life"
                        placeholder="Please enter useful life"
                        value={assetCategory.useful_life}   
                    />
                    </div>
                    <div className="form-group mt-3">
                    <label className="form-label">Product Code<span style={{color :"red"}} >*</span></label>
                    <input
                     style={{maxWidth:"500px"}}
                    required
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Please enter product code"
                        name="product_code"
                        value={assetCategory.product_code}
                    />
                    </div>
                    <div className="form-group mt-3">
                    <label className="form-label">Product Name<span style={{color :"red"}} >*</span></label>
                    <input
                     style={{maxWidth:"500px"}}
                        required
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Please enter product name"
                        name="product_name"
                        value={assetCategory.product_name}
                    />
                    </div>
                    <div className="form-group mt-3">
                    <label className="form-label">Subproduct Name<span style={{color :"red"}} >*</span></label>
                    <input
                     style={{maxWidth:"500px"}}
                        required
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Please enter subproduct name"
                        name="subproduct_name"
                        value={assetCategory.subproduct_name}
                    />
                    </div>
                    
                    <div className="inputBoxAC">
                    <label className="form-label">PIC<span style={{color :"red"}} >*</span></label>
                    <select required 
                        name="pic"
                        value={assetCategory.pic}
                        onChange={handleChange} >
                          <option value="">Select</option>
                    <option>GA</option>
                    <option>IT</option>
                    </select>
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
                  <Button variant="secondary" onClick={handleViewClose}>
                    Close
                  </Button>
                </Modal.Footer>
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
                <Modal.Title>Edit {RowData.subproduct_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={(e) => handleEdit(e, RowData.subproduct_name)}>
                <div>
                    <div className="form-group">
                    <label>Asset Category</label>
                    <input
                     style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Please enter asset category"
                        name="asset_category"
                        defaultValue={RowData.asset_category}
                    />
                    <label>Useful Life</label>
                    <input
                     style={{maxWidth:"500px"}}
                        type="number"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Please enter useful life"
                        name="useful_life"
                        defaultValue={RowData.useful_life}
                    />
                    <label>Product Code</label>
                    <input
                     style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Please enter product code"
                        name="product_code"
                        defaultValue={RowData.product_code}
                    />
                    <label>Product Name</label>
                    <input
                     style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        name="product_name"
                        placeholder="Please enter product name"
                        defaultValue={RowData.product_name}
                    />
                    <div className="form-group mt-3">
                    <label className="form-label">PIC<span style={{color :"red"}} >*</span></label>
                    <input
                    style={{maxWidth:"500px"}}
                        required
                        type="text"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Please enter PIC"
                        name="pic"
                        value={RowData.pic}
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
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleViewClose}>
                    Close
                  </Button>
                </Modal.Footer>
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
                    <label>Asset Category</label>
                    <input
                     style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        value={RowData.asset_category}
                        readOnly
                    />
                    <label>Useful Life</label>
                    <input
                     style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        value={RowData.useful_life}
                        readOnly
                    />
                    <label>Product Code</label>
                    <input
                     style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        value={RowData.product_code}
                        readOnly
                    />
                    <label>Product Name</label>
                    <input
                     style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        value={RowData.product_name}
                        readOnly
                    />
                    <label>Subproduct Name</label>
                    <input
                     style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        value={RowData.subproduct_name}
                        readOnly
                    />
                    <label>PIC</label>
                    <input
                    style={{maxWidth:"500px"}}
                        type="text"
                        className="form-control"
                        value={RowData.pic}
                        readOnly
                    />
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleViewClose}>
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