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
    console.log(newData);
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
  const onGetAllAsset = async () => {
    try {
      const response = await overviewService.getAllAsset();
      setDatas(response.data);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    onGetAllAsset();
  }, []);

  //Pagination
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(datas.length / itemPerPage); i++) {
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
    console.log("ini respons edit", name);
    setLoading(true);
    
    try {
      const response = await overviewService.getAssetByAssetName(name);
      // setRowData(response.data)
      
      setEditShow(true);
      let date = response.data['Tanggal Output'].toString()
      let datesplit = date.split("+") 
      let res = datesplit[0]
      response.data['Tanggal Output'] = res
      setNewDate(res)

      date = response.data['BAST Output'].toString()
      datesplit = date.split("+") 
      res = datesplit[0]
      response.data['BAST Output'] = res

      console.log('response img',response.data['Asset Image'])
      console.log("ini tanggal output",date);
      setAssetEdit(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const [assetEdit, setAssetEdit] = useState({});
  const [editShow, setEditShow] = useState(false);

  const handleEditClose = () => {
    setEditShow(false);
  };

  const handleEditShow = (id) => {
    setEditShow(true);
    // setAssetEdit(data)
    handleEditAssetById(id);
  };


    // UPLOAD IMAGE
    const [selectedImage, setSelectedImage] = useState();
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
    console.log("ini submit response", assetEdit);
    try {
      assetEdit["Tahun"] = Number(assetEdit["Tahun"]);
      assetEdit["Harga Perolehan"] = Number(assetEdit["Harga Perolehan"]);
      assetEdit["Total Harga Perolehan"] = Number(
        assetEdit["Total Harga Perolehan"]
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
      console.log(response);
      setAssetEdit(response);

      console.log('ini image upload',imageBase64)

      if (response.status === "SUCCESS") {
        swal({
          title: "Success!",
          text: "Your data has been saved!",
          icon: "success",
          button: "OK!",
        });
      }
      setEditShow(false);
      onGetAllAsset();
    } catch (e) {
      console.log(e);
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
      console.log(response);
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
      console.log(response);
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
      console.log(response);
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
      console.log("ini response email", response.data);
      setUser(response.data);
    } catch (error) {
    } finally {
    }
  };


  const handleChange = (e) => {
    const newData = { ...assetEdit };
    newData[e.target.name] = e.target.value;
    setAssetEdit(newData);
    console.log(newData);
  };

  const handleCancel = (e) => {
    e.target.reset();
  };


  // const [searchVendor, setSearchVendor] = useState('')
  // const onChangeSearchVendor = (e) => {
  //   const searchVendor = e.target.value;
  //   setSearchVendor(searchVendor);
  // };

  // const onSearchVendor= async () => {
  //   // e.preventDefault();
  //   setLoading(true);
  //   try {
  //     if (searchVendor.length !== 0) {
  //       const response = await overviewService.getAllAsset();
  //       console.log(response);
  //       setDatas(response.data);
  //       console.log(response.data);
  //     } else {
  //       const response = await overviewService.getAssetByVendor(searchVendor);
  //       console.log(response);
  //       setDatas(response.data);
  //       console.log(response.data); //unde
  //     }
      
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false)
  //   }
  // };


  // const [searchLocation, setSearchLocation] = useState('')
  // const onChangeSearchLocation = (e) => {
  //   const searchLocation = e.target.value;
  //   setSearchLocation(searchLocation);
  // };

  // const onSearchLocation= async () => {
  //   // e.preventDefault();
  //   setLoading(true);
  //   try {
  //     if (searchLocation.length === 0) {
  //       const response = await overviewService.getAllAsset();
  //       console.log(response);
  //       setDatas(response.data);
  //       console.log(response.data);
  //     } else {
  //       const response = await overviewService.getAssetByLocation(searchLocation);
  //       console.log(response);
  //       setDatas(response.data);
  //       console.log(response.data);
  //     }
      
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false)
  //   }
  // };

  // const [searchCondition, setSearchCondition] = useState('')
  // const onChangeSearchCondition = (e) => {
  //   const searchCondition = e.target.value;
  //   setSearchCondition(searchCondition);
  // };

  // const onSearchCondition= async () => {
  //   // e.preventDefault();
  //   setLoading(true);
  //   try {
  //     if (searchCondition.length === 0) {
  //       const response = await overviewService.getAllAsset();
  //       console.log(response);
  //       setDatas(response.data);
  //       console.log(response.data);
  //     } else {
  //       const response = await overviewService.getAssetByCondition(searchCondition);
  //       console.log(response);
  //       setDatas(response.data);
  //       console.log(response.data);
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading(false)
  //   }
  // };


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
    console.log(filter)
    console.log(dropdownName)
    if (dropdownName === 'Vendor') {
      try {
        if (filter.length === 0) {
          const response = await overviewService.getAllAsset();
          console.log(response);
          setDatas(response.data);
          console.log(response.data);
        } else {
          const response = await overviewService.getAssetByVendor(filter);
          console.log(response);
          setDatas(response.data);
          console.log(response.data); //unde
        }   
      } catch (e) {
        console.log(e);
      }
    } else if (dropdownName === 'Location') {
      try {
        if (filter.length === 0) {
          const response = await overviewService.getAllAsset();
          console.log(response);
          setDatas(response.data);
          console.log(response.data);
        } else {
          const response = await overviewService.getAssetByLocation(filter);
          console.log(response);
          setDatas(response.data);
          console.log(response.data); //unde
        }   
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        if (filter.length === 0) {
          const response = await overviewService.getAllAsset();
          console.log(response);
          setDatas(response.data);
          console.log(response.data);
        } else {
          const response = await overviewService.getAssetByCondition(filter);
          console.log(response);
          setDatas(response.data);
          console.log(response.data); //unde
        }   
      } catch (e) {
        console.log(e);
      }
    }
  }


  const onClearForm = () => {
    ref.current.value = ''; 
    onGetAllAsset();
  }

  

  return (
    <>
      <Sidebar />
      <div className="overview-container">
        <div className="overview-card">
          <div className="search-container">
              <div className="input-group mb-3 dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Search by {dropdownName}</button>
                <ul className="dropdown-menu" >
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Vendor')}}>Vendor</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Location')}}>Location</a></li>
                  <li><a className="dropdown-item" onClick={() => {onChangeDropdown('Condition')}}>Condition</a></li>
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

          <div className="overview-box">
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
                    style={{ minWidth: "200px" }}
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
                    style={{ minWidth: "250px" }}
                  >
                    Total Acquisition Cost{" "}
                    <FaSort style={{ marginLeft: "10%" }} />
                  </th>
                  <th
                    onClick={() => sorting("Jenis Produk")}
                    style={{ minWidth: "230px" }}
                  >
                    Asset Category Subproduct Name{" "}
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
                    style={{ minWidth: "200px" }}
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
                    style={{ minWidth: "200px" }}
                  >
                    Monthly Depreciation{" "}
                    <FaSort style={{ marginLeft: "10%" }} />
                  </th>
                  <th
                    onClick={() => sortingNum("Total Bulan Penyusutan")}
                    style={{ minWidth: "200px" }}
                  >
                    Depreciation Month{" "}
                    <FaSort style={{ marginLeft: "10%" }} />
                  </th>
                  <th
                    onClick={() => sortingNum("Total Penyusutan")}
                    style={{ minWidth: "200px" }}
                  >
                    Total Depreciation{" "}
                    <FaSort style={{ marginLeft: "10%" }} />
                  </th>
                  <th
                    onClick={() => sortingNum("Nilai Asset saat ini")}
                    style={{ minWidth: "200px" }}
                  >
                    Current Asset Value{" "}
                    <FaSort style={{ marginLeft: "10%" }} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {datas.length === 0 ? (
                  <tr> 
                    <th colspan='31'>No data found</th>
                  </tr>
                ) : (
                  currentItems.map((data, index) => (
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
                            style={{fontSize: '25px'}} 
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
                            style={{fontSize: '25px'}} 
                          >
                            &#xf090;
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
          <div className="clearfix">
            <div className="hint-text">
              Showing <b> {currentItems.length} </b> out of <b>{datas.length}</b>{" "}
              enteries
            </div>
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
                disabled={currentPage == pages[pages.length - 1] ? true : false}
              >
                Next
              </button>
            </li>
          </ul>
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
            <Button variant="secondary" onClick={handleViewClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      {/* Edit Show */}

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
                          {/* <input type='datetime-local' required name='Tanggal Output' value="2017-06-01T08:30" onChange={handleChange}/> */}
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
                  <div className="inputBox">
                    <span>Total Acquisition Cost :</span>
                    <input
                      type="number"
                      required
                      name="Total Harga Perolehan"
                      value={assetEdit["Total Harga Perolehan"]}
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
                            src={URL.createObjectURL(selectedImage)}
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
                      // value={assetEdit["Asset Image"]}
                      onChange={imageChange}
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
                    {/* <span>Asset Code :</span>
                    <select
                      required
                      name="Kode Asset"
                      value={assetEdit["Kode Asset"]}
                      onChange={handleChange}
                    >
                      <option value="">Select Asset Code</option>
                      {subProductName.map((item) => (
                        <option
                          key={item.subproduct_name}
                          value={item.product_code}
                        >
                          {item.subproduct_name}-{item.product_code}
                        </option>
                      ))}
                    </select> */}
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
    </>
  );
};
