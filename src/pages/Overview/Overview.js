import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import "./Overview.css";
import { FaSort } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import moment from "moment";
import "./EditAsset.css";
import swal from "sweetalert";
import Loading from "../../shared/components/Loading/Loading";
import ReactPaginate from "react-paginate";
import { EVENT } from "../../shared/constants";
import { useAuth } from "../../services/UseAuth";
import defaultImg from "../../assets/images/No-image-available.png";
import imageCompression from 'browser-image-compression';

export const Overview = () => {
  const {
    overviewService,
    vendorService,
    locationService,
    userService,
    assetItemService,
    assetCategoryService,
    eventLogService,
  } = useDeps();
  const [datas, setDatas] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [rowData, setRowData] = useState([]);
  const [viewShow, setViewShow] = useState();
  const [asset, setAsset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [fileName, setFileName]= useState('No file chosen')

    const handleViewShow = () => {
    setViewShow(true);
  };

  const handleViewClose = () => {
    setViewShow(false);
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
    setUser(prevObj=>({...prevObj,name:(savedUser.name), role:(savedUser.role), level_approval:(savedUser.level_approval), location_id:(savedUser.location_id), tap:(savedUser.tap), cluster:(savedUser.cluster), department:(savedUser.department)}))
  }

  useEffect(() => {
    onGetAllSubProduct();
    onGetAllVendor();
    onGetAllLocation();
    onGetCookie();
  }, []);


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
  const [showEdit, setShowEdit] = useState(false);

  const handleEditAssetById = async (name) => {
    try {
      const response = await overviewService.getAssetByAssetName(name);

      setEditShow(true);
      response.data["Tanggal Output"] = moment(
        response.data["Tanggal Output"]
      ).format("YYYY-MM-DDTHH:MM");
      response.data["BAST Output"] = moment(
        response.data["BAST Output"]
      ).format("YYYY-MM-DDTHH:MM");
  
      setAssetEdit(response.data);
      // setImageBase64(response.data["Asset Image"]);
      setShowEdit(!showEdit)
      
      console.log(response.data["Asset Image"]);
    } catch (e) {
      console.log(e);
    } 
  };

  useEffect(() => {
    console.log('asset edit', assetEdit['Asset Image']);
    setImageBase64(assetEdit['Asset Image']);
    console.log("cek image", imageBase64);
  }, [showEdit])

  const [assetEdit, setAssetEdit] = useState({});
  const [editShow, setEditShow] = useState(false);

  useEffect(() => {
    // setImageBase64(assetEdit["Asset Image"]);
  }, [assetEdit]);

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
  const [imageBase64, setImageBase64] = useState();
  let reader = new FileReader();

  const imageChange = async (e) => {
    setFileName(e.target.files[0].name)
    if (e.target.files && e.target.files.length > 0) {
      const imageFiles = e.target.files[0]
      console.log('originalFile instanceof Blob', imageFiles instanceof Blob); // true
      console.log('originalFile size', (imageFiles.size / 1024 / 1024) , 'MB');
      const options = {
        maxSizeMB: 0.5,
        // maxWidthOrHeight: 200,
        useWebWorker: true
      }
      try {
        const compressedImage = await imageCompression(imageFiles, options)
        console.log('compressedImage instanceof Blob', compressedImage instanceof Blob); // true
        console.log('compressedImage size', (compressedImage.size / 1024 / 1024) , 'MB');
        setSelectedImage(compressedImage);
        reader.readAsDataURL(compressedImage);
        reader.onload = () => {setImageBase64(reader.result)};
      } catch (error) {
        console.log(error);
      }

      
    }
  };

  const ref = useRef(null)

  const removeSelectedImage = () => {
    setImageBase64("")
    ref.current.value = "";
  };

  const onSubmitEditAsset = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      assetEdit["BAST Output"] = moment(assetEdit["BAST Output"]).format();
      assetEdit["Tanggal Output"] = moment(
        assetEdit["Tanggal Output"]
      ).format();

      assetEdit["Asset Image"] = imageBase64;

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

      getAssetsPagination(1);
      let event = {
        event: EVENT.UPDATE_ASSET,
        user: user.name,
      };
      createEventLogOverview(event);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

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

  const handleChange = (e) => {
    const newData = { ...assetEdit };
    newData[e.target.name] = e.target.value;
    console.log("ini data baru", newData);
    setAssetEdit(newData);
  };

   const onClearForm = () => {
    setSearchCondition('')
    setSearchVendor('')
    setSearchLocation('')
    setSearchProduct('')
    setSearchSubproduct('')
    setSearchCategory('')
    if (user.role=='Admin') {
      getAssetsPagination(1);
    } else if (user.role=='IT'){
      getAssetsByIT(1);
    } else if (user.role=='Regular') {
      getAssetsByLocation(user.location_id)
    } else if (user.role=='GA'){
      getAssetsByGA(1)
    }
  };

  //Pagination From Backend
  const [pageCount, setPageCount] = useState(0);
  const [totalAsset, setTotalAsset] = useState(0);


  useEffect(() => {
  
    console.log('ini user', user);
    if (user.role=='Admin') {
      getAssetsPagination(1);
    } else if (user.role=='IT'){
      getAssetsByIT(1);
    } else if (user.role=='Regular') {
      getAssetsByLocation(user.location_id,1)
    } else if (user.role=='GA'){
      getAssetsByGA(1)
    }
  }, [user.role]);
  

  const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };

  const onCountAsset = async () => {
    if (user.role=='Admin'){
      try {
        const response = await overviewService.getCountAllAsset();
        setPageCount(Math.ceil(response.data / 10));
        setTotalAsset(response.data)
      } catch (e) {
        console.log(e);
      }
    } else if (user.role=='IT'){
      try {
        const response = await overviewService.getCountAssetByIT();
        setPageCount(Math.ceil(response.data / 10));
        setTotalAsset(response.data)
      } catch (e) {
        console.log(e);
      }
    } else if (user.role=='GA'){
      try {
        const response = await overviewService.getCountAssetByGA();
        setPageCount(Math.ceil(response.data / 10));
        setTotalAsset(response.data)
      } catch (e) {
        console.log(e);
      }
    }
    
  };

  const getAssetsPagination = async (currentPage) => {
    setLoading(true);
      try {
        const response = await overviewService.getAssetByPagination(currentPage);
        for (let i in response.data) {
          response.data[i]["Harga Perolehan"] =
            "Rp" + thousands_separators(response.data[i]["Harga Perolehan"]);
          response.data[i]["Biaya Lain-Lain"] =
            "Rp" + thousands_separators(response.data[i]["Biaya Lain-Lain"]);
          response.data[i]["PPN"] =
            "Rp" + thousands_separators(response.data[i]["PPN"]);
          response.data[i]["Penyusutan Perbulan"] =
            "Rp" + thousands_separators(response.data[i]["Penyusutan Perbulan"]);
          response.data[i]["Total Harga Perolehan"] =
            "Rp" +
            thousands_separators(response.data[i]["Total Harga Perolehan"]);
          response.data[i]["Total Penyusutan"] =
            "Rp" + thousands_separators(response.data[i]["Total Penyusutan"]);
          response.data[i]["Nilai Asset saat ini"] =
            "Rp" + thousands_separators(response.data[i]["Nilai Asset saat ini"]);
          response.data[i]["Tanggal Output"] = moment(
            response.data[i]["Tanggal Output"]
          ).format("YYYY-MM-DDTHH:MM");
          response.data[i]["BAST Output"] = moment(
            response.data[i]["BAST Output"]
          ).format("YYYY-MM-DDTHH:MM");
        }
        onCountAsset();
        setDatas(response.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    const getAssetsByGA= async (currentPage) => {
      setLoading(true);
        try {
          const response = await overviewService.getAssetByGA(currentPage);
          for (let i in response.data) {
            response.data[i]["Harga Perolehan"] =
              "Rp" + thousands_separators(response.data[i]["Harga Perolehan"]);
            response.data[i]["Biaya Lain-Lain"] =
              "Rp" + thousands_separators(response.data[i]["Biaya Lain-Lain"]);
            response.data[i]["PPN"] =
              "Rp" + thousands_separators(response.data[i]["PPN"]);
            response.data[i]["Penyusutan Perbulan"] =
              "Rp" + thousands_separators(response.data[i]["Penyusutan Perbulan"]);
            response.data[i]["Total Harga Perolehan"] =
              "Rp" +
              thousands_separators(response.data[i]["Total Harga Perolehan"]);
            response.data[i]["Total Penyusutan"] =
              "Rp" + thousands_separators(response.data[i]["Total Penyusutan"]);
            response.data[i]["Nilai Asset saat ini"] =
              "Rp" + thousands_separators(response.data[i]["Nilai Asset saat ini"]);
            response.data[i]["Tanggal Output"] = moment(
              response.data[i]["Tanggal Output"]
            ).format("YYYY-MM-DDTHH:MM");
            response.data[i]["BAST Output"] = moment(
              response.data[i]["BAST Output"]
            ).format("YYYY-MM-DDTHH:MM");
          }
          onCountAsset();
          setDatas(response.data);
          console.log(response);
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      }
  
    const getAssetsByIT = async (currentPage) => {
      setLoading(true)
      try {
        const response = await overviewService.getAssetByIT(currentPage);
        for (let i in response.data) {
          response.data[i]["Harga Perolehan"] =
            "Rp" + thousands_separators(response.data[i]["Harga Perolehan"]);
          response.data[i]["Biaya Lain-Lain"] =
            "Rp" + thousands_separators(response.data[i]["Biaya Lain-Lain"]);
          response.data[i]["PPN"] =
            "Rp" + thousands_separators(response.data[i]["PPN"]);
          response.data[i]["Penyusutan Perbulan"] =
            "Rp" + thousands_separators(response.data[i]["Penyusutan Perbulan"]);
          response.data[i]["Total Harga Perolehan"] =
            "Rp" +
            thousands_separators(response.data[i]["Total Harga Perolehan"]);
          response.data[i]["Total Penyusutan"] =
            "Rp" + thousands_separators(response.data[i]["Total Penyusutan"]);
          response.data[i]["Nilai Asset saat ini"] =
            "Rp" + thousands_separators(response.data[i]["Nilai Asset saat ini"]);
          response.data[i]["Tanggal Output"] = moment(
            response.data[i]["Tanggal Output"]
          ).format("YYYY-MM-DDTHH:MM");
          response.data[i]["BAST Output"] = moment(
            response.data[i]["BAST Output"]
          ).format("YYYY-MM-DDTHH:MM");
        }
        onCountAsset();
        setDatas(response.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    const getAssetsByLocation = async (id, page) => {
      setLoading(true)
      try {
        const response = await overviewService.getAssetByIdLocation(id, page);
        for (let i in response.data) {
          response.data[i]["Harga Perolehan"] =
            "Rp" + thousands_separators(response.data[i]["Harga Perolehan"]);
          response.data[i]["Biaya Lain-Lain"] =
            "Rp" + thousands_separators(response.data[i]["Biaya Lain-Lain"]);
          response.data[i]["PPN"] =
            "Rp" + thousands_separators(response.data[i]["PPN"]);
          response.data[i]["Penyusutan Perbulan"] =
            "Rp" + thousands_separators(response.data[i]["Penyusutan Perbulan"]);
          response.data[i]["Total Harga Perolehan"] =
            "Rp" +
            thousands_separators(response.data[i]["Total Harga Perolehan"]);
          response.data[i]["Total Penyusutan"] =
            "Rp" + thousands_separators(response.data[i]["Total Penyusutan"]);
          response.data[i]["Nilai Asset saat ini"] =
            "Rp" + thousands_separators(response.data[i]["Nilai Asset saat ini"]);
          response.data[i]["Tanggal Output"] = moment(
            response.data[i]["Tanggal Output"]
          ).format("YYYY-MM-DDTHH:MM");
          response.data[i]["BAST Output"] = moment(
            response.data[i]["BAST Output"]
          ).format("YYYY-MM-DDTHH:MM");
        }
        setDatas(response.data);
        setPageCount(Math.ceil(response.count / 10));
        console.log(response);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    console.log(data.selected);
    getAssetsPagination(currentPage);
    onFilterMultiple(searchCondition, searchVendor, searchLocation, searchProduct, searchSubproduct, searchCategory, currentPage)
  };

  //Event Log
  const [event, setEvent] = useState({});

  const createEventLogOverview = async (eventLoc) => {
    try {
      const response = await eventLogService.createEventLog(eventLoc);
      setEvent(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  //Filter Multiple Condition
  const [countFilter, setCountFilter] = useState(0)
  const onFilterMultiple = async (condition, vendor, location, product, subproduct, category, page) => {
    if (user.role == 'GA') {
      try {
        const response = await overviewService.filterAssetMultipleConditionByGA(condition, vendor, location, product, subproduct, category, page)
      for (let i in response.data) {
        response.data[i]["Harga Perolehan"] =
          "Rp" + thousands_separators(response.data[i]["Harga Perolehan"]);
        response.data[i]["Biaya Lain-Lain"] =
          "Rp" + thousands_separators(response.data[i]["Biaya Lain-Lain"]);
        response.data[i]["PPN"] =
          "Rp" + thousands_separators(response.data[i]["PPN"]);
        response.data[i]["Penyusutan Perbulan"] =
          "Rp" +
          thousands_separators(response.data[i]["Penyusutan Perbulan"]);
        response.data[i]["Total Harga Perolehan"] =
          "Rp" +
          thousands_separators(response.data[i]["Total Harga Perolehan"]);
        response.data[i]["Total Penyusutan"] =
          "Rp" + thousands_separators(response.data[i]["Total Penyusutan"]);
        response.data[i]["Nilai Asset saat ini"] =
          "Rp" +
          thousands_separators(response.data[i]["Nilai Asset saat ini"]);
        response.data[i]["Tanggal Output"] = moment(
          response.data[i]["Tanggal Output"]
        ).format("YYYY-MM-DDTHH:MM");
        response.data[i]["BAST Output"] = moment(
          response.data[i]["BAST Output"]
        ).format("YYYY-MM-DDTHH:MM");
        }
        setDatas(response.data);
        console.log('ini filter', response.data);
        setPageCount(Math.ceil(response.count / 10));
      } catch (e) {
        console.log(e.response);
      }
    } else if (user.role == 'IT') {
      try {
      const response = await overviewService.filterAssetMultipleConditionByIT(condition, vendor, location, product, subproduct, category, page)
      for (let i in response.data) {
        response.data[i]["Harga Perolehan"] =
          "Rp" + thousands_separators(response.data[i]["Harga Perolehan"]);
        response.data[i]["Biaya Lain-Lain"] =
          "Rp" + thousands_separators(response.data[i]["Biaya Lain-Lain"]);
        response.data[i]["PPN"] =
          "Rp" + thousands_separators(response.data[i]["PPN"]);
        response.data[i]["Penyusutan Perbulan"] =
          "Rp" +
          thousands_separators(response.data[i]["Penyusutan Perbulan"]);
        response.data[i]["Total Harga Perolehan"] =
          "Rp" +
          thousands_separators(response.data[i]["Total Harga Perolehan"]);
        response.data[i]["Total Penyusutan"] =
          "Rp" + thousands_separators(response.data[i]["Total Penyusutan"]);
        response.data[i]["Nilai Asset saat ini"] =
          "Rp" +
          thousands_separators(response.data[i]["Nilai Asset saat ini"]);
        response.data[i]["Tanggal Output"] = moment(
          response.data[i]["Tanggal Output"]
        ).format("YYYY-MM-DDTHH:MM");
        response.data[i]["BAST Output"] = moment(
          response.data[i]["BAST Output"]
        ).format("YYYY-MM-DDTHH:MM");
        }
        setDatas(response.data);
        setPageCount(Math.ceil(response.count / 10));
      } catch (e) {
        console.log(e.response);
      }
    } else if (user.role == 'Admin') {
      try {
        const response = await overviewService.filterAssetMultipleConditionByAdmin(condition, vendor, location, product, subproduct, category, page)
        for (let i in response.data) {
          response.data[i]["Harga Perolehan"] =
            "Rp" + thousands_separators(response.data[i]["Harga Perolehan"]);
          response.data[i]["Biaya Lain-Lain"] =
            "Rp" + thousands_separators(response.data[i]["Biaya Lain-Lain"]);
          response.data[i]["PPN"] =
            "Rp" + thousands_separators(response.data[i]["PPN"]);
          response.data[i]["Penyusutan Perbulan"] =
            "Rp" +
            thousands_separators(response.data[i]["Penyusutan Perbulan"]);
          response.data[i]["Total Harga Perolehan"] =
            "Rp" +
            thousands_separators(response.data[i]["Total Harga Perolehan"]);
          response.data[i]["Total Penyusutan"] =
            "Rp" + thousands_separators(response.data[i]["Total Penyusutan"]);
          response.data[i]["Nilai Asset saat ini"] =
            "Rp" +
            thousands_separators(response.data[i]["Nilai Asset saat ini"]);
          response.data[i]["Tanggal Output"] = moment(
            response.data[i]["Tanggal Output"]
          ).format("YYYY-MM-DDTHH:MM");
          response.data[i]["BAST Output"] = moment(
            response.data[i]["BAST Output"]
          ).format("YYYY-MM-DDTHH:MM");
          }
          setDatas(response.data);
          setPageCount(Math.ceil(response.count / 10));
        } catch (e) {
          console.log(e.response);
        }
    }
  }
  
  const [searchCondition, setSearchCondition] = useState('')
  const [searchVendor, setSearchVendor] = useState('')
  const [searchLocation, setSearchLocation] = useState('')
  const [searchProduct, setSearchProduct] = useState('')
  const [searchSubproduct, setSearchSubproduct] = useState('')
  const [searchCategory, setSearchCategory] = useState('')

  return (
    <>
      <div className="overview-container">
        <div className="overview-card">
          {/* <div className="title-overview">
                <p>List of Assets</p>
              </div> */}
          <div className='search-container'>
            <div className='box-search-container'>
              <div className='search-box-item'>
                <div className='title-search'>
                <a>Condition:</a>
                </div>
                <input value={searchCondition}  type="text" className="input-search" placeholder="Condition" onChange={(e)=>setSearchCondition(e.target.value)}/>
              </div>
              <div className='search-box-item'>
              <div className='title-search'>
                <a>Vendor:</a>
                </div>
                <input value={searchVendor} type="text" className="input-search" placeholder="Vendor" onChange={(e)=>setSearchVendor(e.target.value)}/>
              </div>
              <div className='search-box-item'>
              <div className='title-search'>
                <a>Location:</a>
                </div>
                <input value={searchLocation} type="text" className="input-search" placeholder="Location" onChange={(e)=>setSearchLocation(e.target.value)}/>
              </div>
            </div>
            <div className='box-search-container'>
              <div className='search-box-item'>
              <div className='title-search'>
                <a>Subproduct:</a>
                </div>
                <input value={searchSubproduct} type="text" className="input-search" placeholder="Subproduct" onChange={(e)=>setSearchSubproduct(e.target.value)}/>
              </div>
              <div className='search-box-item'>
              <div className='title-search'>
                <a>Product:</a>
                </div>
                <input value={searchProduct} type="text" className="input-search" placeholder="Product" onChange={(e)=>setSearchProduct(e.target.value)}/>
              </div>
              <div className='search-box-item'>
              <div className='title-search'>
                <a>Category:</a>
                </div>
                <input value={searchCategory} type="text" className="input-search" placeholder="Category" onChange={(e)=>setSearchCategory(e.target.value)}/>
              </div>
            </div>
          </div>
          <div className='button-search-container'>
            <button
                    value="submit"
                    className="button-box"
                    onClick={()=>onFilterMultiple(searchCondition, searchVendor, searchLocation, searchProduct, searchSubproduct, searchCategory, 1)}>
                      Search
            </button>
            <button
                    value="submit"
                    className="button-box"
                    style={{backgroundColor:'rgb(255, 178, 0)'}}
                    onClick={onClearForm}>
                      Clear
            </button>
            <div
            className="clearfix">
              Showing {datas.length} out of {totalAsset}
          </div>
          <div style={{marginRight: '2vw', marginTop: '1vh'}}>
          <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
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
          <div className="table-container">
            <div className="table-box">
              <table className="table table-bordered table-striped table-responsive table-hover">
                <thead className="table-header">
                  <tr>
                    <th>No</th>
                    <th style={{ minWidth: "150px" }}>Action</th>
                    <th
                      // onClick={() => sorting("Tanggal Output")}
                      style={{ minWidth: "200px" }}
                    >
                      Purchase Date
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Tahun")}
                      style={{ minWidth: "200px" }}
                    >
                      Year
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("No. PO / Dokumenen Pendukung")}
                      style={{ minWidth: "200px" }}
                    >
                      PO Number
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Vendor")}
                      style={{ minWidth: "200px" }}
                    >
                      Vendor Name
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Nama Barang")}
                      style={{ minWidth: "300px" }}
                    >
                      Item Name
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Harga Perolehan")}
                      style={{ minWidth: "230px" }}
                    >
                      Acquisition Cost{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("PPN")}
                      style={{ minWidth: "200px" }}
                    >
                      PPN
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Biaya Lain-Lain")}
                      style={{ minWidth: "200px" }}
                    >
                      Additional Cost{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Total Harga Perolehan")}
                      style={{ minWidth: "270px" }}
                    >
                      Total Acquisition Cost{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Jenis Produk")}
                      style={{ minWidth: "220px" }}
                    >
                      Subproduct Name{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Kategori Jenis Produk")}
                      style={{ minWidth: "200px" }}
                    >
                      Product Name
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Kategori Aset Tetap")}
                      style={{ minWidth: "200px" }}
                    >
                      Asset Category{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("BAST Output")}
                      style={{ minWidth: "200px" }}
                    >
                      BAST
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Kondisi")}
                      style={{ minWidth: "200px" }}
                    >
                      Condition
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Insurance")}
                      style={{ minWidth: "200px" }}
                    >
                      Insurance
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Lokasi")}
                      style={{ minWidth: "200px" }}
                    >
                      Location
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("User")}
                      style={{ minWidth: "200px" }}
                    >
                      User
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Jabatan")}
                      style={{ minWidth: "200px" }}
                    >
                      Position
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Initisal")}
                      style={{ minWidth: "200px" }}
                    >
                      Initial
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Kode Wilayah")}
                      style={{ minWidth: "200px" }}
                    >
                      Location ID
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Kode Asset")}
                      style={{ minWidth: "200px" }}
                    >
                      Product Code
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Tahun Pembelian")}
                      style={{ minWidth: "200px" }}
                    >
                      Purchase Year{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Kode Urut barang")}
                      style={{ minWidth: "220px" }}
                    >
                      Item Order Code{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sorting("Nomor Asset")}
                      style={{ minWidth: "200px" }}
                    >
                      Asset Number
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Masa Manfaat (Bulan)")}
                      style={{ minWidth: "200px" }}
                    >
                      Useful Life
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Penyusutan Perbulan")}
                      style={{ minWidth: "250px" }}
                    >
                      Monthly Depreciation{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Total Bulan Penyusutan")}
                      style={{ minWidth: "240px" }}
                    >
                      Depreciation Month{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Total Penyusutan")}
                      style={{ minWidth: "230px" }}
                    >
                      Total Depreciation{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                    <th
                      // onClick={() => sortingNum("Nilai Asset saat ini")}
                      style={{ minWidth: "240px" }}
                    >
                      Current Asset Value{" "}
                      {/* <FaSort style={{ marginLeft: "10%" }} /> */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.length === 0 ? (
                    <tr>
                      <th colSpan="31">Data is not found</th>
                    </tr>
                  ) : (
                    datas.map((data, index) => (
                      <tr key={data["Nomor Asset"]}>
                        <th>{index + 1}</th>
                        <th style={{ fontSize: "30px" }}>
                          <a
                            onClick={() => {
                              handleViewShow(setRowData(data));
                            }}
                            className="view"
                            data-toggle="modal"
                            style={{ cursor: "pointer", width: "50%" }}
                          >
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              title="View"
                              style={{ fontSize: "25px", color: "darkblue" }}
                            >
                              &#xe8f4;
                            </i>
                          </a>
                          <a
                            target="_blank"
                            href={`http://api.qrserver.com/v1/create-qr-code/?data= Asset Number: ${data["Nomor Asset"]}%0A Purchase Date: ${data["Tanggal Output"]}%0A Asset Name: ${data["Nama Barang"]}%0A Asset Category: ${data["Kategori Jenis Produk"]}%0A Product Name: ${data["Jenis Produk"]}%0A Location: ${data["Lokasi"]}%0A PO Number: ${data["No. PO / Dokumenen Pendukung"]}%0A Lifetime: ${data["Masa Manfaat (Bulan)"]}%0A Value: ${data["Nilai Asset saat ini"]}%0A Vendor: ${data["Vendor"]}&size=${size}x${size}&bgcolor=${bgColor}`}
                            download="QRCode"
                          >
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              title="View"
                              style={{ fontSize: "25px", color: "black" }}
                            >
                              &#xe00a;
                            </i>
                          </a>
                          {(user.role=='GA' ||user.role=='Admin') && (
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
                              style={{ fontSize: "25px" }}
                            >
                              &#xe3c9;
                            </i>
                          </a>
                          )}
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
        </div>
      </div>
      {/* </div> */}
      <div className="model-box-view">
        <Modal
          dialogClassName="view-modal"
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
                  <img src={rowData["Asset Image"]}></img>
                </div>
                <div className="row">
                <div className="col-md-6 mb-3 mt-3">
                <label>No Asset</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Nomor Asset"]}
                  readOnly
                />
                </div>
                <div className="col-md-6 mb-3 mt-3">
                <label>Asset Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Nama Barang"]}
                  readOnly
                />
                </div>
                <div className="col-md-6 mb-3">
                <label>Asset Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Kategori Aset Tetap"]}
                  readOnly
                />
                </div>
                <div className="col-md-6 mb-3">
                <label>Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Kategori Jenis Produk"]}
                  readOnly
                />
                </div>
                <div className="col-md-6 mb-3">
                <label>Subproduct Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Jenis Produk"]}
                  readOnly
                />
                </div>
                <div className="col-md-6 mb-3">
                <label>No PO</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["No. PO / Dokumenen Pendukung"]}
                  readOnly
                />
                </div>
                <div className="col-md-6 mb-3">
                <label>Location</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Lokasi"]}
                  readOnly
                />
                </div>
                <div className="col-md-6 mb-3">
                <label>Vendor</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Vendor"]}
                  readOnly
                />
                </div>
                <div className="col-md-6 mb-3">
                <label>Lifetime</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Masa Manfaat (Bulan)"]}
                  readOnly
                />
                </div>
                <div className="col-md-6 mb-3">
                <label>Current Asset Value</label>
                <input
                  type="text"
                  className="form-control"
                  value={rowData["Nilai Asset saat ini"]}
                  readOnly
                />
                </div>
              </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
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
                        <option key={item.name} value={item.name}>
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
                        <option
                          key={item["kode wilayah"]}
                          value={item["kode wilayah"]}
                        >
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
                    <input
                      type="datetime-local"
                      required
                      name="Tanggal Output"
                      value={assetEdit["Tanggal Output"]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputBox">
                    <span>BAST :</span>
                    <input
                      type="datetime-local"
                      required
                      name="BAST Output"
                      value={assetEdit["BAST Output"]}
                      onChange={handleChange}
                    />
                  </div>
                 
                </div>
                <div className="col">
                  <div className="asset-image-container">
                    <div className="image-box">
                      {imageBase64 && (
                        <div className="image">
                          {" "}
                          <img
                            src={imageBase64}
                            className="image"
                            style={{ width: "200px", height: "140px" }}
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
                    <div className="choose-file">
                    <input ref={ref} accept="image/*" onChange={imageChange} type="file" id="actual-btn" hidden/>
                    <label for="actual-btn">Choose File</label>
                    <span  id="file-chosen">{fileName}</span>
                    </div>
                  </div>
                  {/* <div className="inputBox" style={{ marginTop: "30px" }}>
                  <span>PPN :</span>
                    <select
                    required
                    name="PPN"
                    value={assetEdit.PPN}
                    onChange={handleChange}
                    style={{width:'100%'}}
                  >
                    <option value="">Select Condition</option>
                    <option value='1'>Yes</option>
                    <option value='0'>No</option>
                  </select>
                  </div> */}
                   <div className="inputBox" style={{marginTop:'1vh'}}>
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
                    <span>User :</span>
                    <input
                      type="text"
                      required
                      name="User"
                      value={assetEdit.User}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Position :</span>
                    <input
                      type="text"
                      required
                      name="Jabatan"
                      value={assetEdit.Jabatan}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="inputBox">
                    <span>Tracking Number :</span>
                    <input
                      type="text"
                      required
                      name="Nomor Resi"
                      value={assetEdit['Nomor Resi']}
                      onChange={handleChange}
                    />
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
      {isLoading && <Loading />}
      {/* </Sidebar> */}
    </>
  );
};
