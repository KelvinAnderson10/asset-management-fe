import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import "./Overview.css";
import {FaSort} from 'react-icons/fa'
import {CgClose} from 'react-icons/cg'
import moment from "moment";
import "./EditAsset.css";
import swal from "sweetalert";
import Loading from "../../shared/components/Loading/Loading";
import ReactPaginate from "react-paginate";

export const Overview = () => {
  const {
    overviewService,
    vendorService,
    locationService,
    userService,
    assetItemService,
    assetCategoryService,
  } = useDeps();
  const [datas, setDatas] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [rowData, setRowData] = useState([]);
  const [viewShow, setViewShow] = useState();
  const [asset, setAsset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleChangeAsset = (e) => {
    const newData = { ...asset };
    newData[e.target.name] = e.target.value;
    setAsset(newData);

  };

  const handleViewShow = () => {
    setViewShow(true);
  };

  const handleViewClose = () => {
    setViewShow(false);
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //CRUD
  //Get All
  // const onGetAllAsset = async () => {
  //   setLoading(true)
  //   try {
  //     const response = await overviewService.getAllAsset();
  //     setDatas(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false)
  //   }
  // };

  // useEffect(() => {
  //   onGetAllAsset();
  // }, []);

  //Pagination
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const totalPages = Math.ceil(datas.length / itemPerPage)
  const pages = [];
  for (let i = 1; i <=totalPages ; i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = datas.slice(indexOfFirstItem, indexOfLastItem);

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
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  
  const handleFirstBtn = () =>{
    setCurrentPage(1)
  }
  const handleLastBtn = () =>{
    console.log(totalPages);
    setCurrentPage(totalPages)
  }

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
      const sorted = [...datas].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setDatas(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...datas].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setDatas(sorted);
      setOrder("ASC");
    }
  };

  const sortingNum = (col) => {
    if (order === "ASC") {
      const sorted = [...datas].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setDatas(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...datas].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setDatas(sorted);
      setOrder("ASC");
    }
  };

  //GetById
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");

  const handleGetAssetById = async (name) => {
    setLoading(true);
    try {
      const response = await overviewService.getAssetByAssetName(name);
      setRowData(response.data);
      setViewShow(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  // GET ID FOR EDIT SHOW

  const [date, setNewDate] = useState();

  const handleEditAssetById = async (name) => {
   
    // setLoading(true);
    try {
      const response = await overviewService.getAssetByAssetName(name);
      // setRowData(response.data)
      
      setEditShow(true);
      response.data['Tanggal Output'] = moment((response.data['Tanggal Output'])).format('YYYY-MM-DDTHH:MM')
      response.data['BAST Output'] = moment((response.data['BAST Output'])).format('YYYY-MM-DDTHH:MM')
      // let date = response.data['Tanggal Output'].toString()
      // let datesplit = date.split("+") 
      // let res = datesplit[0]
      // response.data['Tanggal Output'] = res
      // setNewDate(res)

      // date = response.data['BAST Output'].toString()
      // datesplit = date.split("+") 
      // res = datesplit[0]
      // response.data['BAST Output'] = res
      
      setAssetEdit(response.data);
      setImageBase64(response.data["Asset Image"])
    } catch (e) {
      console.log(e);
    } finally {
      // setLoading(false);
    }
  };

  const [assetEdit, setAssetEdit] = useState({});
  const [editShow, setEditShow] = useState(false);

  useEffect(() => {
    setImageBase64(assetEdit["Asset Image"])
  
  }, [assetEdit['Asset Image']])

  const handleEditClose = () => {
    setEditShow(false);
  };

  const handleEditShow = (id) => {
    setEditShow(true);
    // setAssetEdit(data)
    handleEditAssetById(id);

  };


    // UPLOAD IMAGE
    const [selectedImage, setSelectedImage] = useState(true);
    const [imageBase64, setImageBase64] = useState("")
    let reader = new FileReader();

  const imageChange = (e) => {
    
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {setImageBase64(reader.result)}
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const onSubmitEditAsset = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      assetEdit["Tahun"] = Number(assetEdit["Tahun"]);
      assetEdit["Harga Perolehan"] = Number(assetEdit["Harga Perolehan"]);
      assetEdit["Total Harga Perolehan"] = Number(assetEdit["Total Harga Perolehan"]
      );
      assetEdit["Kode Wilayah"] = Number(assetEdit["Kode Wilayah"]);
      assetEdit["Tahun Pembelian"] = Number(assetEdit["Tahun Pembelian"]);
      assetEdit["Kode Urut barang"] = Number(assetEdit["Kode Urut barang"]);
      assetEdit["Biaya Lain-Lain"] = Number(assetEdit["Biaya Lain-Lain"]);
      assetEdit['BAST Output'] = moment((assetEdit['BAST Output'])).format()
      assetEdit['Tanggal Output'] = moment((assetEdit['Tanggal Output'])).format()

      assetEdit["Asset Image"] = imageBase64

      const response = await overviewService.updateAsset(
        assetEdit["Nomor Asset"],
        assetEdit
      );
   
      setAssetEdit(response);
      if (response.status === "SUCCESS") {
        swal({
          title: "Success!",
          text: "Your data has been saved!",
          icon: "success",
          button: "OK!",
        });
      }
      setEditShow(false);
      getAssetsPagination(1)
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    onGetAllSubProduct();
    onGetAllVendor();
    onGetAllLocation();
  }, []);

  const [subProductName, setSubProductName] = useState([]);
  // GET ALL SUBPRODUCT NAME
  const onGetAllSubProduct = async () => {
    try {
      const response = await assetCategoryService.getAllAssetCategory();
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

  // GET ALL USER
  const [user, setUser] = useState([]);
  const onGetUser = async () => {
    try {
      const response = await userService.getUserByEmail();
      setUser(response.data);
    } catch (error) {
    } finally {
    }
  };


  const handleChange = (e) => {
    const newData = { ...assetEdit };
    newData[e.target.name] = e.target.value;
    console.log('ini data baru',newData)
    setAssetEdit(newData);
    
  };

  const handleCancel = (e) => {
    e.target.reset();
  };


  //Search

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
    if (dropdownName === 'Vendor') {
      try {
        const response = await overviewService.getAssetByVendor(filter);
        for (let i in response.data) {
          response.data[i]['Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Harga Perolehan'])
          response.data[i]['Biaya Lain-Lain'] = 'Rp' + thousands_separators(response.data[i]['Biaya Lain-Lain'])
          response.data[i]['PPN'] = 'Rp' + thousands_separators(response.data[i]['PPN'])
          response.data[i]['Penyusutan Perbulan'] = 'Rp' + thousands_separators(response.data[i]['Penyusutan Perbulan'])
          response.data[i]['Total Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Total Harga Perolehan'])
          response.data[i]['Total Penyusutan'] = 'Rp' + thousands_separators(response.data[i]['Total Penyusutan'])
          response.data[i]['Nilai Asset saat ini'] = 'Rp' + thousands_separators(response.data[i]['Nilai Asset saat ini'])
        }
        setDatas(response.data);
        setPageCount(Math.ceil(datas/10))
      } catch (e) {
        console.log(e);
      }
    } else if (dropdownName === 'Location') {
      try {
        const response = await overviewService.getAssetByLocation(filter);
        for (let i in response.data) {
          response.data[i]['Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Harga Perolehan'])
          response.data[i]['Biaya Lain-Lain'] = 'Rp' + thousands_separators(response.data[i]['Biaya Lain-Lain'])
          response.data[i]['PPN'] = 'Rp' + thousands_separators(response.data[i]['PPN'])
          response.data[i]['Penyusutan Perbulan'] = 'Rp' + thousands_separators(response.data[i]['Penyusutan Perbulan'])
          response.data[i]['Total Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Total Harga Perolehan'])
          response.data[i]['Total Penyusutan'] = 'Rp' + thousands_separators(response.data[i]['Total Penyusutan'])
          response.data[i]['Nilai Asset saat ini'] = 'Rp' + thousands_separators(response.data[i]['Nilai Asset saat ini'])
        }
        setDatas(response.data);
        setPageCount(Math.ceil(datas/10))  
      } catch (e) {
        console.log(e);
      }
    } else if (dropdownName === 'Condition'){
      try {
        const response = await overviewService.getAssetByCondition(filter);
        for (let i in response.data) {
          response.data[i]['Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Harga Perolehan'])
          response.data[i]['Biaya Lain-Lain'] = 'Rp' + thousands_separators(response.data[i]['Biaya Lain-Lain'])
          response.data[i]['PPN'] = 'Rp' + thousands_separators(response.data[i]['PPN'])
          response.data[i]['Penyusutan Perbulan'] = 'Rp' + thousands_separators(response.data[i]['Penyusutan Perbulan'])
          response.data[i]['Total Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Total Harga Perolehan'])
          response.data[i]['Total Penyusutan'] = 'Rp' + thousands_separators(response.data[i]['Total Penyusutan'])
          response.data[i]['Nilai Asset saat ini'] = 'Rp' + thousands_separators(response.data[i]['Nilai Asset saat ini'])
        }
        setDatas(response.data);
        setPageCount(Math.ceil(datas/10)) 
      } catch (e) {
        console.log(e);
      }
    } else if (dropdownName === 'Item Name') {
      try {
        const response = await overviewService.getAssetByItemName(filter);
        for (let i in response.data) {
          response.data[i]['Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Harga Perolehan'])
          response.data[i]['Biaya Lain-Lain'] = 'Rp' + thousands_separators(response.data[i]['Biaya Lain-Lain'])
          response.data[i]['PPN'] = 'Rp' + thousands_separators(response.data[i]['PPN'])
          response.data[i]['Penyusutan Perbulan'] = 'Rp' + thousands_separators(response.data[i]['Penyusutan Perbulan'])
          response.data[i]['Total Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Total Harga Perolehan'])
          response.data[i]['Total Penyusutan'] = 'Rp' + thousands_separators(response.data[i]['Total Penyusutan'])
          response.data[i]['Nilai Asset saat ini'] = 'Rp' + thousands_separators(response.data[i]['Nilai Asset saat ini'])
        }
        setDatas(response.data);
        setPageCount(Math.ceil(datas/10))
      } catch (e) {
        console.log(e);
      }
    } else if (dropdownName === 'Subproduct') {
      try {
        const response = await overviewService.getAssetBySubproduct(filter);
        for (let i in response.data) {
          response.data[i]['Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Harga Perolehan'])
          response.data[i]['Biaya Lain-Lain'] = 'Rp' + thousands_separators(response.data[i]['Biaya Lain-Lain'])
          response.data[i]['PPN'] = 'Rp' + thousands_separators(response.data[i]['PPN'])
          response.data[i]['Penyusutan Perbulan'] = 'Rp' + thousands_separators(response.data[i]['Penyusutan Perbulan'])
          response.data[i]['Total Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Total Harga Perolehan'])
          response.data[i]['Total Penyusutan'] = 'Rp' + thousands_separators(response.data[i]['Total Penyusutan'])
          response.data[i]['Nilai Asset saat ini'] = 'Rp' + thousands_separators(response.data[i]['Nilai Asset saat ini'])
        }
        setDatas(response.data);
        setPageCount(Math.ceil(datas/10))  
      } catch (e) {
        console.log(e);
      }
    } else if (dropdownName === 'Product') {
      try {
        const response = await overviewService.getAssetByProduct(filter);
        for (let i in response.data) {
          response.data[i]['Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Harga Perolehan'])
          response.data[i]['Biaya Lain-Lain'] = 'Rp' + thousands_separators(response.data[i]['Biaya Lain-Lain'])
          response.data[i]['PPN'] = 'Rp' + thousands_separators(response.data[i]['PPN'])
          response.data[i]['Penyusutan Perbulan'] = 'Rp' + thousands_separators(response.data[i]['Penyusutan Perbulan'])
          response.data[i]['Total Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Total Harga Perolehan'])
          response.data[i]['Total Penyusutan'] = 'Rp' + thousands_separators(response.data[i]['Total Penyusutan'])
          response.data[i]['Nilai Asset saat ini'] = 'Rp' + thousands_separators(response.data[i]['Nilai Asset saat ini'])
        }
        setDatas(response.data);
        setPageCount(Math.ceil(datas/10)) 
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const response = await overviewService.getAssetByCategory(filter);
        for (let i in response.data) {
          response.data[i]['Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Harga Perolehan'])
          response.data[i]['Biaya Lain-Lain'] = 'Rp' + thousands_separators(response.data[i]['Biaya Lain-Lain'])
          response.data[i]['PPN'] = 'Rp' + thousands_separators(response.data[i]['PPN'])
          response.data[i]['Penyusutan Perbulan'] = 'Rp' + thousands_separators(response.data[i]['Penyusutan Perbulan'])
          response.data[i]['Total Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Total Harga Perolehan'])
          response.data[i]['Total Penyusutan'] = 'Rp' + thousands_separators(response.data[i]['Total Penyusutan'])
          response.data[i]['Nilai Asset saat ini'] = 'Rp' + thousands_separators(response.data[i]['Nilai Asset saat ini'])
        }
        setDatas(response.data);
        setPageCount(Math.ceil(datas/10))
      } catch (e) {
        console.log(e);
      }
    }
  }


  const onClearForm = () => {
    ref.current.value = ''; 
    getAssetsPagination(1);
  }

  //Pagination From Backend
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0)

  useEffect(() => {
    getAssetsPagination(1)
  }, [])

  const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  const onCountAsset = async () => {
    try {
      const response = await overviewService.getCountAllAsset()
      setPageCount(Math.ceil(response.data/10))
    } catch (e) {
      console.log(e);
    }
  }

  const getAssetsPagination = async (currentPage) => {
    setLoading(true)
    try{

      const response = await overviewService.getAssetByPagination(currentPage)
      for (let i in response.data) {
        response.data[i]['Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Harga Perolehan'])
        response.data[i]['Biaya Lain-Lain'] = 'Rp' + thousands_separators(response.data[i]['Biaya Lain-Lain'])
        response.data[i]['PPN'] = 'Rp' + thousands_separators(response.data[i]['PPN'])
        response.data[i]['Penyusutan Perbulan'] = 'Rp' + thousands_separators(response.data[i]['Penyusutan Perbulan'])
        response.data[i]['Total Harga Perolehan'] = 'Rp' + thousands_separators(response.data[i]['Total Harga Perolehan'])
        response.data[i]['Total Penyusutan'] = 'Rp' + thousands_separators(response.data[i]['Total Penyusutan'])
        response.data[i]['Nilai Asset saat ini'] = 'Rp' + thousands_separators(response.data[i]['Nilai Asset saat ini'])
      }
      onCountAsset();
      setDatas(response.data)
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally{
      setLoading(false)
    }
  }

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    getAssetsPagination(currentPage)
  }
  

  return (
    <>
      <Sidebar>
        <div className="body">
          <div className="overview-container">
            <div className="overview-card">
              <div className="title-overview">
                <p>List of Assets</p>
              </div>
              <div className="table-container">
                <div className="search-overview">
                <div className="input-group mb-3">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Search by {dropdownName}</button>
                <ul className="dropdown-menu" >
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Vendor')}}>Vendor</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Location')}}>Location</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Condition')}}>Condition</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Item Name')}}>Item Name</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Subproduct')}}>Subproduct</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Product')}}>Product</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Category')}}>Category</a></li>
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
              </div>
              <div className="table-box">
                  <table className="table table-bordered table-striped table-responsive table-hover">
                  <thead className="table-header">
                    <tr>
                      <th>No</th>
                      <th style={{ minWidth: "150px" }}>Action</th>
                      <th 
                        onClick={() => sorting("Tanggal Output")} 
                        style={{ minWidth: "200px" }}>
                        Purchase Date <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Tahun")}
                        style={{ minWidth: "200px" }}
                      >
                        Year <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("No. PO / Dokumenen Pendukung")}
                        style={{ minWidth: "200px" }}
                      >
                        PO Number <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Vendor")}
                        style={{ minWidth: "200px" }}
                      >
                        Vendor Name <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Nama Barang")}
                        style={{ minWidth: "300px" }}
                      >
                        Item Name <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Harga Perolehan")}
                        style={{ minWidth: "230px" }}
                      >
                        Acquisition Cost{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("PPN")}
                        style={{ minWidth: "200px" }}
                      >
                        PPN <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Biaya Lain-Lain")}
                        style={{ minWidth: "200px" }}
                      >
                        Additional Cost{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Total Harga Perolehan")}
                        style={{ minWidth: "270px" }}
                      >
                        Total Acquisition Cost{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Jenis Produk")}
                        style={{ minWidth: "220px" }}
                      >
                        Subproduct Name{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Kategori Jenis Produk")}
                        style={{ minWidth: "200px" }}
                      >
                        Product Name <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Kategori Aset Tetap")}
                        style={{ minWidth: "200px" }}
                      >
                        Asset Category{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("BAST Output")}
                        style={{ minWidth: "200px" }}
                      >
                        BAST <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Kondisi")}
                        style={{ minWidth: "200px" }}
                      >
                        Condition <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Insurance")}
                        style={{ minWidth: "200px" }}
                      >
                        Insurance <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Lokasi")}
                        style={{ minWidth: "200px" }}
                      >
                        Location <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("User")}
                        style={{ minWidth: "200px" }}
                      >
                        User <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Jabatan")}
                        style={{ minWidth: "200px" }}
                      >
                        Position <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Initisal")}
                        style={{ minWidth: "200px" }}
                      >
                        Initial <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Kode Wilayah")}
                        style={{ minWidth: "200px" }}
                      >
                        Location ID <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Kode Asset")}
                        style={{ minWidth: "200px" }}
                      >
                        Product Code <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Tahun Pembelian")}
                        style={{ minWidth: "200px" }}
                      >
                        Purchase Year{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Kode Urut barang")}
                        style={{ minWidth: "220px" }}
                      >
                        Item Order Code{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sorting("Nomor Asset")}
                        style={{ minWidth: "200px" }}
                      >
                        Asset Number <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Masa Manfaat (Bulan)")}
                        style={{ minWidth: "200px" }}
                      >
                        Useful Life <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Penyusutan Perbulan")}
                        style={{ minWidth: "250px" }}
                      >
                        Monthly Depreciation{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Total Bulan Penyusutan")}
                        style={{ minWidth: "240px" }}
                      >
                        Depreciation Month{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Total Penyusutan")}
                        style={{ minWidth: "230px" }}
                      >
                        Total Depreciation{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                      <th
                        onClick={() => sortingNum("Nilai Asset saat ini")}
                        style={{ minWidth: "240px" }}
                      >
                        Current Asset Value{" "}
                        <FaSort style={{ marginLeft: "10%" }} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.length === 0 ? (
                      <tr> 
                        <th colSpan='31'>Data is not found</th>
                      </tr>
                    ) : (
                      datas.map((data, index) => (
                        <tr key={data["Nomor Asset"]}>
                          <th>{index + 1}</th>
                          <th style={{fontSize:'30px'}}>
                            <a
                              onClick={() => {
                                handleViewShow(setRowData(data));
                              }}
                              className="view"
                              data-toggle="modal"
                              style={{ cursor: "pointer", width: '50%'}}
                            >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="View"
                                style={{fontSize: '25px', color:'darkblue'}} 
                              >
                                &#xe8f4;
                              </i>
                            </a>
                            <a
                              target="_blank"
                              href={`http://api.qrserver.com/v1/create-qr-code/?data=Asset Number: ${data["Nomor Asset"]}%0A Purchase Date: ${data['Tanggal Output']}%0A Asset Name: ${data["Nama Barang"]}%0A Asset Category: ${data["Kategori Jenis Produk"]}%0A Product Name: ${data["Jenis Produk"]}%0A Location: ${data["Lokasi"]}%0A PO Number: ${data["No. PO / Dokumenen Pendukung"]}%0A Lifetime: ${data['Masa Manfaat (Bulan)']}%0A Value: ${data['Nilai Asset saat ini']}%0A Vendor: ${data['Vendor']}&size=${size}x${size}&bgcolor=${bgColor}`}
                              download="QRCode"
                            >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="View"
                                style={{fontSize: '25px', color:'black'}} 
                              >
                                &#xe00a;
                              </i>
                            </a>
                            <a
                              onClick={() => {
                                handleEditShow(data["Nomor Asset"]);
                              }}
                              className="edit"
                              data-toggle="modal"
                              style={{ cursor: "pointer" }}
                            >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="Edit"
                                style={{fontSize: '25px'}} 
                              >
                                &#xe3c9;
                              </i>
                            </a>
                          </th>
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
            <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            // pageCount = {Math.ceil(datas.length/10)}
            pageCount = {pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
            </div>
          </div>
        </div>
        <div className="model-box-view">
        <Modal dialogClassName="view-modal"
          show={viewShow}
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
                <div className="image-view">
                 <img src={rowData["Asset Image"]} ></img>
                </div>
                <label>No Asset</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Nomor Asset"]}
                  readOnly
                />
                <label>Asset Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Nama Barang"]}
                  readOnly
                />
                <label>Asset Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Kategori Aset Tetap"]}
                  readOnly
                />
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Kategori Jenis Produk"]}
                  readOnly
                />
                <label>Subproduct Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Jenis Produk"]}
                  readOnly
                />
                <label>No PO</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["No. PO / Dokumenen Pendukung"]}
                  readOnly
                />
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Lokasi"]}
                  readOnly
                />
                <label>Vendor</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Vendor"]}
                  readOnly
                />
                <label>Lifetime</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Masa Manfaat (Bulan)"]}
                  readOnly
                />
                <label>Current Asset Value</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Nilai Asset saat ini"]}
                  readOnly
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>

      {editShow && (
        <div className="edit-container">
          <div className="asset-edit-container">
            <form onSubmit={onSubmitEditAsset}>
              <div className="row">
                <div className="col">
                  <h3 className="title">Edit Asset Item</h3>

                  <div className="inputBox">
                    <span>Asset Name :</span>
                    <input
                      type="text"
                      required
                      name="Nama Barang"
                      value={assetEdit["Nama Barang"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Subproduct Name :</span>
                    <select
                      required
                      name="Jenis Produk"
                      value={assetEdit["Jenis Produk"]}
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
                  <div className="inputBox">
                    <span>Vendor :</span>
                    <select
                      required
                      name="Vendor"
                      value={assetEdit.Vendor}
                      onChange={handleChange}
                    >
                      <option value="">Select Vendor</option>

                      {vendor.map((item) => (
                        <option key={item.name} value={assetEdit.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="inputBox">
                    <span>Location :</span>
                    <select
                      required
                      name="Kode Wilayah"
                      value={assetEdit["Kode Wilayah"]}
                      onChange={handleChange}
                    >
                      <option value="">Select Location</option>
                      {locations.map((item, index) => (
                        <option key={item.ID} value={item.ID}>
                          {item.location}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="inputBox">
                    <span>Condition :</span>
                    <select
                      required
                      name="Kondisi"
                      value={assetEdit.Kondisi}
                      onChange={handleChange}
                    >
                      <option value="">Select Condition</option>
                      <option>Baik</option>
                      <option>Rusak</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="inputBox">
                    <span>PO Number :</span>
                    <input
                      type="text"
                      required
                      name="No. PO / Dokumenen Pendukung"
                      value={assetEdit["No. PO / Dokumenen Pendukung"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputBox">
                          <span>Purchase Date :</span>
                          <input type='datetime-local' required name='Tanggal Output' value={assetEdit['Tanggal Output']} onChange={handleChange}/>
                      </div>
                      <div className="inputBox">
                          <span>BAST :</span>
                          <input type='datetime-local'  required name='BAST Output' value={assetEdit['BAST Output']} onChange={handleChange}/>
                      </div>
                  <div className="inputBox">
                    <span>Purchase Price :</span>
                    <input
                      type="number"
                      required
                      name="Harga Perolehan"
                      value={assetEdit["Harga Perolehan"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Additional Cost :</span>
                    <input
                      type="number"
                      required
                      name="Biaya Lain-Lain"
                      value={assetEdit["Biaya Lain-Lain"]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="asset-image-container">
                    <div className="image-box">
                      {selectedImage && (
                        <div className="image">
                          {" "}
                          <img
                            src={imageBase64}
                            className="image"
                            alt="Thumb"
                            style={{width:'200px', height:'140px'}}
                            />
                            <button
                              onClick={removeSelectedImage}
                              className="cancel"
                            >
                              Remove the image
                            </button>
                        </div>
                      )}
                    </div>
                    <input
                      id="upload"
                      accept="image/*"
                      type="file"
                      name="Asset Image"
                      onChange={imageChange}
                    />
                  </div>
                  <div className="inputBox" style={{marginTop:'30px'}}>
                  <span>PPN :</span>
                  <input
                    type="text"
                    required
                    name="PPN"
                    value={assetEdit["PPN"]}
                    onChange={handleChange}
                  />
                </div>
                  <div className="inputBox">
                    <span>Insurance</span>
                    <select
                      required
                      name="Insurance"
                      value={assetEdit.Insurance}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Sudah</option>
                      <option>Belum</option>
                    </select>
                  </div>

                  <div className="inputBox">
                    <span>Purchase Year :</span>
                    <input
                      type="number"
                      required
                      name="Tahun Pembelian"
                      value={assetEdit["Tahun Pembelian"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputBox">
                    <span>User :</span>
                    <input
                      type="text"
                      required
                      name="User"
                      value={assetEdit.User}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="inputBox">
                    <span>Initial :</span>
                    <input
                      type="text"
                      required
                      name="Initisal"
                      value={assetEdit["Initisal"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputBox">
                    <div className="inputBox">
                      <span>Year :</span>
                      <input
                        type="number"
                        required
                        name="Tahun"
                        value={assetEdit.Tahun}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="inputBox">
                      <span>Item Order Code :</span>
                      <input
                        type="number"
                        required
                        name="Kode Urut barang"
                        value={assetEdit["Kode Urut barang"]}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="button-asset">
                    <button
                      type="submit"
                      className="btn btn-danger button-cancel"
                      onClick={handleEditClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary button-submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {isLoading && <Loading/>}
      </Sidebar>
    </>
  );
};
