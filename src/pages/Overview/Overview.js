import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, Table, ButtonGroup, Dropdown   } from "react-bootstrap";
import { useDeps } from "../../shared/context/DependencyContext";
import "./Overview.css";
import moment from "moment";
import "./EditAsset.css";
import swal from "sweetalert";
import Loading from "../../shared/components/Loading/Loading";
import ReactPaginate from "react-paginate";
import { EVENT, NOTIF, PUSHNOTIF, STATUS } from "../../shared/constants";
import { useAuth } from "../../services/UseAuth";
import imageCompression from "browser-image-compression";
import AssetLoading from "../../shared/components/Loading/AssetLoading";
import { current } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

export const Overview = () => {
  const {
    overviewService,
    vendorService,
    locationService,
    assetCategoryService,
    eventLogService,
    transferRequestService,
    notificationService,
    userService
  } = useDeps();
  const [datas, setDatas] = useState([]);
  const [order, setOrder] = useState("ASC");
  const [rowData, setRowData] = useState([]);
  const [viewShow, setViewShow] = useState();
  const [isLoading, setLoading] = useState(false);
  const [isLoading2, setLoading2] = useState(false)
  const [fileName, setFileName] = useState("No file chosen");
  const [moreActionShow, setMoreActionShow] = useState([]);

  const handleViewShow = () => {
    setViewShow(true);
  };

  const handleViewClose = () => {
    setViewShow(false);
  };

  

  //Get User
  const { getCookie } = useAuth();
  const [user, setUser] = useState({
    name: "",
    role: "",
    level_approval: "",
    location_id: "",
    tap: "",
    cluster: "",
    department: "",
  });
  const onGetCookie = () => {
    let savedUserJsonString = getCookie("user");
    let savedUser = JSON.parse(savedUserJsonString);
    setUser((prevObj) => ({
      ...prevObj,
      name: savedUser.name,
      role: savedUser.role,
      level_approval: savedUser.level_approval,
      location_id: savedUser.location_id,
      tap: savedUser.tap,
      cluster: savedUser.cluster,
      department: savedUser.department,
    }));
  };

  useEffect(() => {
    onGetAllSubProduct();
    onGetAllVendor();
    onGetAllLocation();
    onGetCookie();
  }, []);

  const [pageFilter, setPageFilter] = useState(1)
  
  
  //GetById
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");

  // GET ID FOR EDIT SHOW
  const [showEdit, setShowEdit] = useState(false);

  const handleGetDetailItem = async (name) =>{
    setLoading(true);
    try {
      const response = await overviewService.getAssetByAssetName(name);
      setRowData(response.data)
      console.log(response.data);
      handleViewShow(setRowData(response.data));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false)
    }
  }

  const handleEditAssetById = async (name) => {
    setLoading(true);
    try {
      const response = await overviewService.getAssetByAssetName(name);
      if (user.role != "Regular") {
        setEditShow(true);
      } else {
        setEditShowRegular(true);
      }

      response.data["Tanggal Output"] = moment(
        response.data["Tanggal Output"]
      ).format("YYYY-MM-DDTHH:MM");
      response.data["BAST Output"] = moment(
        response.data["BAST Output"]
      ).format("YYYY-MM-DDTHH:MM");

      setAssetEdit(response.data);
      setShowEdit(!showEdit);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setImageBase64(assetEdit["Asset Image"]);
  }, [showEdit]);

  const [assetEdit, setAssetEdit] = useState({});
  const [editShow, setEditShow] = useState(false);
  const [editShowRegular, setEditShowRegular] = useState(false);

  const handleEditClose = () => {
    if (user.role != "Regular") {
      setEditShow(false);
    } else {
      setEditShowRegular(false);
    }
  };

  const handleEditShow = (id) => {
    if (user.role != "Regular") {
      setEditShow(true);
    } else {
      setEditShowRegular(true);
    }
    handleEditAssetById(id);
  };

  // UPLOAD IMAGE
  const [selectedImage, setSelectedImage] = useState();
  const [imageBase64, setImageBase64] = useState();
  let reader = new FileReader();

  const imageChange = async (e) => {
    setFileName(e.target.files[0].name);
    if (e.target.files && e.target.files.length > 0) {
      const imageFiles = e.target.files[0];
      console.log("originalFile instanceof Blob", imageFiles instanceof Blob); // true
      console.log("originalFile size", imageFiles.size / 1024 / 1024, "MB");
      const options = {
        maxSizeMB: 0.5,
        useWebWorker: true,
      };
      try {
        const compressedImage = await imageCompression(imageFiles, options);
        console.log(
          "compressedImage instanceof Blob",
          compressedImage instanceof Blob
        ); // true
        console.log(
          "compressedImage size",
          compressedImage.size / 1024 / 1024,
          "MB"
        );
        setSelectedImage(compressedImage);
        reader.readAsDataURL(compressedImage);
        reader.onload = () => {
          setImageBase64(reader.result);
        };
      } catch (error) {
        console.log(error);
      }
    }
  };

  const ref = useRef(null);

  const removeSelectedImage = () => {
    setImageBase64("");
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
      if (user.role != "Regular") {
        setEditShow(false);
      } else {
        setEditShowRegular(false);
      }

      if (user.role == "Admin" || user.role == "GA") {
        getAssetsPagination(1);
      } else if (user.role == "IT") {
        getAssetsByIT(1);
      } else if (user.role == "Regular") {
        getAssetsByLocation(user.location_id, 1);
      } 

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
    setAssetEdit(newData);
  };

  const onClearForm = () => {
    setSearchCondition("");
    setSearchVendor("");
    setSearchLocation("");
    setSearchProduct("");
    setSearchSubproduct("");
    setSearchCategory("");
    setSearchAssetNumber("");
    if (user.role == "Admin" || user.role == "GA") {
      getAssetsPagination(1);
    } else if (user.role == "IT") {
      getAssetsByIT(1);
    } else if (user.role == "Regular") {
      getAssetsByLocation(user.location_id, 1);
    }
    setCurrentPage(0)
  };

  //Pagination From Backend
  const [pageCount, setPageCount] = useState(0);
  const [totalAsset, setTotalAsset] = useState(0);

  useEffect(() => {
    if (user.role == "Admin"  || user.role == "GA" ) {
      getAssetsPagination(1);
    } else if (user.role == "IT") {
      getAssetsByIT(1);
    } else if (user.role == "Regular") {
      getAssetsByLocation(user.location_id, 1);
    } 
  }, [user.role]);

  const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  };

  const onCountAsset = async () => {
    if (user.role == "Admin" || user.role == "GA") {
      try {
        const response = await overviewService.getCountAllAsset();
        setPageCount(Math.ceil(response.data / 10));
        setTotalAsset(response.data);
      } catch (e) {
        console.log(e);
      }
    } else if (user.role == "IT") {
      try {
        const response = await overviewService.getCountAssetByIT();
        setPageCount(Math.ceil(response.data / 10));
        setTotalAsset(response.data);
      } catch (e) {
        console.log(e);
      }
    } 
  };

  const getAssetsPagination = async (currentPage) => {
    setLoading2(true);
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
      setMoreActionShow(Array(response.data.length).fill(false))
    } catch (e) {
      console.log(e);
    } finally {
      setLoading2(false);
    }
  };

  // const getAssetsByGA = async (currentPage) => {
  //   setLoading2(true);
  //   try {
  //     const response = await overviewService.getAssetByGA(currentPage);
  //     for (let i in response.data) {
  //       response.data[i]["Harga Perolehan"] =
  //         "Rp" + thousands_separators(response.data[i]["Harga Perolehan"]);
  //       response.data[i]["Biaya Lain-Lain"] =
  //         "Rp" + thousands_separators(response.data[i]["Biaya Lain-Lain"]);
  //       response.data[i]["PPN"] =
  //         "Rp" + thousands_separators(response.data[i]["PPN"]);
  //       response.data[i]["Penyusutan Perbulan"] =
  //         "Rp" + thousands_separators(response.data[i]["Penyusutan Perbulan"]);
  //       response.data[i]["Total Harga Perolehan"] =
  //         "Rp" +
  //         thousands_separators(response.data[i]["Total Harga Perolehan"]);
  //       response.data[i]["Total Penyusutan"] =
  //         "Rp" + thousands_separators(response.data[i]["Total Penyusutan"]);
  //       response.data[i]["Nilai Asset saat ini"] =
  //         "Rp" + thousands_separators(response.data[i]["Nilai Asset saat ini"]);
  //       response.data[i]["Tanggal Output"] = moment(
  //         response.data[i]["Tanggal Output"]
  //       ).format("YYYY-MM-DDTHH:MM");
  //       response.data[i]["BAST Output"] = moment(
  //         response.data[i]["BAST Output"]
  //       ).format("YYYY-MM-DDTHH:MM");
  //     }
  //     onCountAsset();
  //     setDatas(response.data);
  //   } catch (e) {
  //     console.log(e);
  //   } finally {
  //     setLoading2(false);
  //   }
  // };

  const getAssetsByIT = async (currentPage) => {
    setLoading2(true);
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
      setMoreActionShow(Array(response.data.length).fill(false))
    } catch (e) {
      console.log(e);
    } finally {
      setLoading2(false);
    }
  };

  const getAssetsByLocation = async (id, page) => {
    setLoading(true);
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
      setTotalAsset(response.count)
      setMoreActionShow(Array(response.data.length).fill(false))
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const [currentPage, setCurrentPage] = useState(0)
  const handlePageClick = async (data) => {
    setCurrentPage(data.selected)
    
  };

  useEffect(() =>{
    if (
      searchCondition == "" &&
      searchVendor == "" &&
      searchLocation == "" &&
      searchProduct == "" &&
      searchCategory == "" &&
      searchSubproduct == "" &&
      searchAssetNumber == ""
    ) {
      if (user.role == "Admin" || user.role == "GA") {
        getAssetsPagination(currentPage+1);
      } else if (user.role == "IT") {
        getAssetsByIT(currentPage+1);
      } else if (user.role == "Regular") {
        getAssetsByLocation(user.location_id, currentPage+1);
      }
    } else {
      if (user.role == "Regular") {
        onFilterMultiple(
          searchCondition,
          searchVendor,
          user.location_id,
          searchProduct,
          searchSubproduct,
          searchCategory,
          currentPage+1
        );
      } else {
        onFilterMultiple(
          searchCondition,
          searchVendor,
          searchLocation,
          searchProduct,
          searchSubproduct,
          searchCategory,
          searchAssetNumber,
          currentPage+1
        );
      }
    }
  }, [currentPage])

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
  const onFilterMultiple = async (
    condition,
    vendor,
    location,
    product,
    subproduct,
    category,
    assetNumber,
    page
  ) => {
     if (user.role == "IT") {
      try {
        const response = await overviewService.filterAssetMultipleConditionByIT(
          condition,
          vendor,
          location,
          product,
          subproduct,
          category,
          assetNumber,
          page
        );
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
        setTotalAsset(response.count)
        setPageCount(Math.ceil(response.count / 10));
      } catch (e) {
        console.log(e.response);
      }
    } else if (user.role == "Admin" || user.role == "GA") {
      try {
        const response =
          await overviewService.filterAssetMultipleConditionByAdmin(
            condition,
            vendor,
            location,
            product,
            subproduct,
            category,
            assetNumber,
            page
          );
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
        setTotalAsset(response.count)
        setPageCount(Math.ceil(response.count / 10));
      } catch (e) {
        console.log(e.response);
      }
    } else if (user.role == "Regular") {
      try {
        const response =
          await overviewService.filterAssetMultipleConditionByUser(
            condition,
            vendor,
            location,
            product,
            subproduct,
            category,
            assetNumber,
            page
          );
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
        setTotalAsset(response.count)
        setPageCount(Math.ceil(response.count / 10));
      } catch (e) {
        console.log(e.response);
      }
    }
  };

  const [searchCondition, setSearchCondition] = useState("");
  const [searchVendor, setSearchVendor] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchProduct, setSearchProduct] = useState("");
  const [searchSubproduct, setSearchSubproduct] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchAssetNumber, setSearchAssetNumber] = useState("");

   // Request Transfer Asset

   const [modalTransferShow, setModalTransferShow] = useState(false);
   const [modalTransHistoryShow, setModalTransHistoryShow] = useState(false);
   const [historyAsset, setHistoryAsset] = useState([]);
   const [assetTransfer, setAssetTransfer] = useState({});
   const [originalLocation, setOriginalLocation] = useState("");
   const [targetUser, setTargetUser] = useState("");
   const [targetUserPost, setTargetUserPost] = useState("");
   const [disableSubmit, setDisableSubmit] = useState(true);

   const handleToggleTransfer = async (name) => {
     setLoading(true);
     try {
        let existedRequest = await transferRequestService.getByAssetNumber(name);
        let pendingRequest = existedRequest.data.filter(item => item.status === STATUS.CREATE_PO);
       if(pendingRequest.length > 0){
         setAssetTransfer({});
         return;
       }
 
       const response = await overviewService.getAssetByAssetName(name);
       if (response.data["Nomor Asset"]) {
         setAssetTransfer(response.data)
         setOriginalLocation(response.data["Kode Wilayah"])
       }
     } catch (e) {
       console.log(e);
     } finally {
       setLoading(false);
       setModalTransferShow(true)
     }
   };
 
   const handleChangeTransfer = (e) => {
     if (e.target.value === "") {
       return;
     }
     const newData = { ...assetTransfer};
     newData[e.target.name] = e.target.value;
     setDisableSubmit(String(newData["Kode Wilayah"]) === String(originalLocation) || (targetUser === "" && targetUserPost === ""));
     setAssetTransfer(newData);
   };
 
   const onSubmitTrasfer = async () => {
     const transferReqForm = {
       "Nomor Asset": assetTransfer["Nomor Asset"],
       "requester":user.name,
       "Kode Wilayah": parseInt(assetTransfer["Kode Wilayah"]),
       "ToUser":targetUser,
       "Jabatan":targetUserPost,
       "is_approved_level1":false,
       "is_approved_level2":false,
   }
 
     try {
       setModalTransferShow(false)
       setLoading(true)
       const response = await transferRequestService.createTransferRequest(transferReqForm);
       if (response.status === "SUCCESS") {
        setLoading(false);

        const userInfo = await userService.getUserByName(response.data.approver_level1);

        //pushnotif
        let pushNotifObj = {
          to: userInfo.data.token,
          title: `${PUSHNOTIF.REQUEST.TITLE} ${response.data.approver_level1}`,
          body: `${PUSHNOTIF.REQUEST.TRANSFER.BODY} ${user.name}`,
        };
        createPushNotification(pushNotifObj);

        //notif
        let notifObj = {
          to: response.data.approver_level1,
          title: NOTIF.REQUEST.TRANSFER.TITLE,
          body: `${NOTIF.REQUEST.TRANSFER.BODY} ${user.name}`,
          type: NOTIF.TYPE.TRANSFER,
          resource_id : String(response.data["to_id"])
        };
        createNotification(notifObj);

        Swal.fire("Success!", "This transfer request has been created.", "success");
       }
     } catch (e) {
       console.log(e);
       Swal.fire("Failed!", "There is something went wrong", "failed");
     } finally {
       setLoading(false);
       clearFormTransfer();
     }
   }

   const handleSubmitTransfer = async () => {
    setModalTransferShow(false)
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to transfer this asset",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        onSubmitTrasfer();
      } else {
        clearFormTransfer();
      }
    });
   }

   const handleGetHistoryTransfer = async (assetNumber) => {
     try {
       const response = await transferRequestService.getHistoryTransferAsset(assetNumber);
       console.log(response);
       if (response.data.length > 0) {
        setHistoryAsset(response.data)
       }
       setModalTransHistoryShow(true)
    } catch (e) {
      console.log(e);
    }
   }

   const clearFormTransfer = () => {
    setAssetTransfer({});
    setOriginalLocation("");
    setTargetUser("");
    setTargetUserPost("");
    setDisableSubmit(true);
   }

   const createNotification = async (newNotif) => {
    try {
      const response = await notificationService.createNotif(newNotif);
    } catch (e) {
      console.log(e);
    }
  };

  const createPushNotification = async (newNotif) => {
    try {
      const response = await notificationService.createPushNotif(newNotif);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="overview-container">
        <div className="overview-card">
          <div className="search-container">
            <div className="box-search-container">
              <div className="search-box-item">
                <div className="title-search">
                  <a>Condition:</a>
                </div>
                <input
                  value={searchCondition}
                  type="text"
                  className="input-search"
                  placeholder="Condition"
                  onChange={(e) => setSearchCondition(e.target.value)}
                />
              </div>
              <div className="search-box-item">
                <div className="title-search">
                  <a>Vendor:</a>
                </div>
                <input
                  value={searchVendor}
                  type="text"
                  className="input-search"
                  placeholder="Vendor"
                  onChange={(e) => setSearchVendor(e.target.value)}
                />
              </div>
              <div className="search-box-item">
                <div className="title-search">
                  <a>Category:</a>
                </div>
                <input
                  value={searchCategory}
                  type="text"
                  className="input-search"
                  placeholder="Category"
                  onChange={(e) => setSearchCategory(e.target.value)}
                />
              </div>
              <div className="search-box-item">
                <div className="title-search">
                  <a>Asset Number:</a>
                </div>
                <input
                  value={searchAssetNumber}
                  type="text"
                  className="input-search"
                  placeholder="Asset Number"
                  onChange={(e) => setSearchAssetNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="box-search-container">
              <div className="search-box-item">
                <div className="title-search">
                  <a>Subproduct:</a>
                </div>
                <input
                  value={searchSubproduct}
                  type="text"
                  className="input-search"
                  placeholder="Subproduct"
                  onChange={(e) => setSearchSubproduct(e.target.value)}
                />
              </div>
              <div className="search-box-item">
                <div className="title-search">
                  <a>Product:</a>
                </div>
                <input
                  value={searchProduct}
                  type="text"
                  className="input-search"
                  placeholder="Product"
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
              </div>
              {user.role != "Regular" && (
                <div className="search-box-item">
                  <div className="title-search">
                    <a>Location:</a>
                  </div>
                  <input
                    value={searchLocation}
                    type="text"
                    className="input-search"
                    placeholder="Location"
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="button-search-container">
            <button
              value="submit"
              className="btn btn-primary btn-sm"
              style={{marginRight: "15px" }}
              onClick={() => {
                setCurrentPage(0)
                user.role == "Regular"
                  ? onFilterMultiple(
                      searchCondition,
                      searchVendor,
                      user.location_id,
                      searchProduct,
                      searchSubproduct,
                      searchCategory,
                      searchAssetNumber,
                      1
                    )
                  : onFilterMultiple(
                      searchCondition,
                      searchVendor,
                      searchLocation,
                      searchProduct,
                      searchSubproduct,
                      searchCategory,
                      searchAssetNumber,
                      1
                    );
              }}
            >
              Search
            </button>
            <button
              value="submit"
              className="btn btn-warning btn-sm"
              onClick={onClearForm}
            >
              Clear
            </button>
            <div className="clearfix">
              <a style={{fontSize:'12px'}}>Showing {datas.length} out of {totalAsset}</a>
            </div>
            <div
              key={pageCount}
              style={{ marginRight: "2vw", marginTop: "1vh" }}
            >
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
                forcePage={currentPage}
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
                      style={{ minWidth: "200px" }}
                    >
                      Asset Number
                    </th>
                    <th
                      style={{ minWidth: "300px" }}
                    >
                      Item Name
                    </th>
                    <th
                      style={{ minWidth: "150px" }}
                    >
                      Product Name
                    </th>
                    <th
                      style={{ minWidth: "200px" }}
                    >
                      Asset Category{" "}
                    </th>
                    <th
                      style={{ minWidth: "150px" }}
                    >
                      Location
                    </th>
                    <th
                      style={{ minWidth: "200px" }}
                    >
                      Current Asset Value{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {datas.length === 0 ? (
                    <tr>
                      <th colSpan="33">Data is not found</th>
                    </tr>
                  ) : (
                    datas.map((data, index) => (
                      <tr key={data["Nomor Asset"]}>
                        <th>{index + 1}</th>
                        <th style={{ fontSize: "14px", fontWeight : "normal" }}>
                          <Dropdown as={ButtonGroup}>
                            <Button variant="light">
                            <a
                              onClick={() => {
                                handleGetDetailItem(data["Nomor Asset"])
                              }}
                              className="view"
                              data-toggle="modal"
                              style={{ cursor: "pointer", width: "50%", textDecoration : "none", display : 'flex', marginTop : "3px" }}
                              >
                              <i
                                className="material-icons"
                                data-toggle="tooltip"
                                title="View"
                                style={{ fontSize: "24px", color: "darkblue"  }}
                              >
                                &#xe8f4;
                              </i>
                              <p>Detail</p> 
                            </a>
                            </Button>
                            <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
                            <Dropdown.Menu style={{minHeight : "200px"}}>
                              <Dropdown.Item >
                              <a
                                // target="_blank"
                                // href={`http://api.qrserver.com/v1/create-qr-code/?data= Asset Number: ${data["Nomor Asset"]}%0A Purchase Date: ${data["Tanggal Output"]}%0A Asset Name: ${data["Nama Barang"]}%0A Asset Category: ${data["Kategori Jenis Produk"]}%0A Product Name: ${data["Jenis Produk"]}%0A Location: ${data["Lokasi"]}%0A PO Number: ${data["No. PO / Dokumenen Pendukung"]}%0A Lifetime: ${data["Masa Manfaat (Bulan)"]}%0A Value: ${data["Nilai Asset saat ini"]}%0A Vendor: ${data["Vendor"]}&size=${size}x${size}&bgcolor=${bgColor}`}
                                href="https://youtube.com"
                                download="QRCode"
                                style={{cursor : "pointer",textDecoration : "none", display : 'flex', marginTop : "3px"}}
                                onClick={() => {
                                  window.open(`http://api.qrserver.com/v1/create-qr-code/?data= Asset Number: ${data["Nomor Asset"]}%0A Purchase Date: ${data["Tanggal Output"]}%0A Asset Name: ${data["Nama Barang"]}%0A Asset Category: ${data["Kategori Jenis Produk"]}%0A Product Name: ${data["Jenis Produk"]}%0A Location: ${data["Lokasi"]}%0A PO Number: ${data["No. PO / Dokumenen Pendukung"]}%0A Lifetime: ${data["Masa Manfaat (Bulan)"]}%0A Value: ${data["Nilai Asset saat ini"]}%0A Vendor: ${data["Vendor"]}&size=${size}x${size}&bgcolor=${bgColor}`, "_blank")
                                }}
                              >
                                <i
                                  className="material-icons"
                                  data-toggle="tooltip"
                                  title="View"
                                  style={{ fontSize: "25px", color: "black" }}
                                >
                                  &#xe00a;
                                </i>
                                <p style={{color : "black"}}>QR Code</p>
                              </a>
                              </Dropdown.Item>
                              { (user.level_approval == 'Regular' || user.level_approval == 'GA' || user.level_approval== 'IT' || user.role == 'Admin') &&
                                <Dropdown.Item >
                              <a
                                  onClick={() => {
                                    
                                    handleEditShow(data["Nomor Asset"]);
                                  }}
                                  className="edit"
                                  data-toggle="modal"
                                  style={{cursor : "pointer",textDecoration : "none", display : 'flex', marginTop : "3px"}}
                                >
                                  <i
                                    className="material-icons"
                                    data-toggle="tooltip"
                                    title="Edit"
                                    style={{ fontSize: "25px" }}
                                  >
                                    &#xe3c9;
                                  </i>
                                  <p style={{color : "black"}}>Edit</p>
                                </a>
                              </Dropdown.Item>}
                              { (user.level_approval == 'Regular') &&
                                <Dropdown.Item >
                                <a
                                  onClick={() => {
                                    handleToggleTransfer(data["Nomor Asset"]);
                                    setMoreActionShow(Array(moreActionShow.length).fill(false));
                                  }}
                                  className="edit"
                                  data-toggle="modal"
                                  style={{cursor : "pointer",textDecoration : "none", display : 'flex', marginTop : "3px", color : "darkred"}}
                                >
                                  <i
                                    className="material-icons"
                                    data-toggle="tooltip"
                                    title="Edit"
                                    style={{ fontSize: "25px" }}
                                  >
                                    &#xeb61;
                                  </i>
                                  <p style={{color : "black"}}>Transfer Request</p>
                                </a>
                                </Dropdown.Item>}
                              <Dropdown.Item >
                                <a
                                  onClick={() => {
                                    handleGetHistoryTransfer(data["Nomor Asset"]);
                                  }}
                                  className="edit"
                                  data-toggle="modal"
                                  style={{cursor : "pointer",textDecoration : "none", display : 'flex', marginTop : "3px", color : "gray"}}
                                >
                                  <i
                                    className="material-icons"
                                    data-toggle="tooltip"
                                    title="Edit"
                                    style={{ fontSize: "25px" }}
                                  >
                                    &#xe889;
                                  </i>
                                  <p style={{color : "black"}}>History</p>
                                </a>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </th>
                        <td>{data["Nomor Asset"]}</td>
                        <td>{data["Nama Barang"]}</td>
                        <td>{data["Kategori Jenis Produk"]}</td>
                        <td>{data["Kategori Aset Tetap"]}</td>
                        <td>{data["Lokasi"]}</td>
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

      {/* VIEW MODAL */}
      <div className="model-box-view">
        <Modal
          dialogClassName="view-modal"
          show={viewShow}
          onHide={handleViewClose}
          backdrop="static"
          keyboard={false}
          size='lg'
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
                    <label>Request Date</label>
                    <input
                      type="text"
                      className="form-control"
                      value={moment(
                        rowData["Tanggal Output"]
                      ).format("YYYY-MM-DD HH:MM")}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3 mt-3">
                    <label>BAST Date</label>
                    <input
                      type="text"
                      className="form-control"
                      value={moment(
                        rowData["BAST Output"]
                      ).format("YYYY-MM-DD HH:MM")}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Asset Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={rowData["Nomor Asset"]}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
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
                    <label>PO Number</label>
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
                    <label>Lifetime in Month</label>
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
                  <div className="col-md-6 mb-3">
                    <label>Tracking Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={rowData["Nomor Resi"]}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Condition</label>
                    <input
                      type="text"
                      className="form-control"
                      value={rowData["Kondisi"]}
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
      {/* EDIT SHOW */}
      <div className="model-box-view">
        <Modal
        dialogClassName="modal-90w"
        show={editShow}
        onHide={handleEditClose}
        backdrop="static"
        keyboard={false}
        size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>Edit Inventory Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
            <div className="form-group">
              <form onSubmit={onSubmitEditAsset}> 
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>Asset Name</label>
                      <input
                      className="form-control"
                      type="text"
                      required
                      name="Nama Barang"
                      value={assetEdit["Nama Barang"]}
                      onChange={handleChange}
                    />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Subproduct Name</label>
                    <select
                    className="form-select"
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
                    <div className="col-md-6 mb-3" >
                      <label>Purchase Price</label>
                      <input
                      className="form-control"
                      type="number"
                      required
                      name="Harga Perolehan"
                      value={assetEdit["Harga Perolehan"]}
                      onChange={handleChange}
                    />

                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Vendor</label>
                      <select
                      className="form-select"
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
                    <div className="col-md-6 mb-3">
                      <label>Additional Cost</label>
                      <input
                      className="form-control"
                      type="number"
                      required
                      name="Biaya Lain-Lain"
                      value={assetEdit["Biaya Lain-Lain"]}
                      onChange={handleChange}
                    />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>Location</label>
                        <select
                        className="form-select"
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
                    <div className="col-md-6 mb-3">
                      <label>Insurance</label>
                      <select
                      className="form-select"
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
                    <div className="col-md-6 mb-3">
                      <label>Condition</label>
                      <select
                      className="form-select"
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
                    <div className="col-md-6 mb-3">
                      <label>User</label>
                      <input
                      className="form-control"
                      type="text"
                      required
                      name="User"
                      value={assetEdit.User}
                      onChange={handleChange}
                    />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>PO Number</label>
                      <input
                      className="form-control"
                      type="text"
                      required
                      name="No. PO / Dokumenen Pendukung"
                      value={assetEdit["No. PO / Dokumenen Pendukung"]}
                      onChange={handleChange}
                    />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Position</label>
                      <input
                      className="form-control"
                      type="text"
                      required
                      name="Jabatan"
                      value={assetEdit.Jabatan}
                      onChange={handleChange}
                    />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Purchase Date</label>
                      <input
                      className="form-control"
                      type="datetime-local"
                      required
                      name="Tanggal Output"
                      value={assetEdit["Tanggal Output"]}
                      onChange={handleChange}
                    />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Tracking Number</label>
                      <input
                      className="form-control"
                      type="text"
                      required
                      name="Nomor Resi"
                      value={assetEdit["Nomor Resi"]}
                      onChange={handleChange}
                    />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label>BAST</label>
                    <input
                      className="form-control"
                      type="datetime-local"
                      required
                      name="BAST Output"
                      value={assetEdit["BAST Output"]}
                      onChange={handleChange}
                    />
                    </div>
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
                      <input
                        ref={ref}
                        accept="image/*"
                        onChange={imageChange}
                        type="file"
                        id="actual-btn"
                        hidden
                      />
                      <label for="actual-btn">Choose File</label>
                      <span id="file-chosen">{fileName}</span>
                    </div>
                  </div>
                  </div>
                  <div className="col-md-12 mt-3">
                    <button
                    style={{ marginLeft: "20px"}}
                      type="submit"
                      className="btn btn-primary float-end "
                    >
                      Submit
                    </button>
                  </div>
              </form>
              <button
              className="btn btn-danger button-cancel float-end"
              onClick={handleEditClose}
              >
              Cancel
              </button>
               
              </div>
             
              </div>
          </Modal.Body>
        </Modal>
      </div>

      {editShowRegular && (
        <div className="edit-container-reg">
          <div className="asset-edit-reg-container">
            <form onSubmit={onSubmitEditAsset}>
              <div className="inputBoxReg">
                <span>Asset Name :</span>
                <input
                  readOnly
                  type="text"
                  required
                  name="Nama Barang"
                  value={assetEdit["Nama Barang"]}
                  onChange={handleChange}
                />
              </div>
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
                      <button onClick={removeSelectedImage} className="cancel">
                        Remove the image
                      </button>
                    </div>
                  )}
                </div>
                <div className="choose-file">
                  <input
                    ref={ref}
                    accept="image/*"
                    onChange={imageChange}
                    type="file"
                    id="actual-btn"
                    hidden
                  />
                  <label for="actual-btn">Choose File</label>
                  <span id="file-chosen">{fileName}</span>
                </div>
              </div>
              <div className="inputBoxReg" style={{ marginTop: "3.5vh" }}>
                <span>Tracking Number :</span>
                <input
                  type="text"
                  required
                  name="Nomor Resi"
                  value={assetEdit["Nomor Resi"]}
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
                  className="btn btn-primary button-submit "
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      { modalTransferShow &&
        <div className="model-box-view">
          <Modal
            dialogClassName="view-modal"
            show={modalTransferShow}
            onHide={() => {
              setModalTransferShow(false)
              clearFormTransfer()
            }}
            backdrop="static"
            keyboard={false}
            size='lg'
          >
            <Modal.Header closeButton>
              <Modal.Title>Transfer Asset Request</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                { assetTransfer["Nomor Asset"] ?
                  <div className="form-group">
                    <div className="image-view">
                      <img src={assetTransfer["Asset Image"]}></img>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3 mt-3">
                        <label>No Asset</label>
                        <input
                          type="text"
                          className="form-control"
                          value={assetTransfer["Nomor Asset"]}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6 mb-3 mt-3">
                        <label>Asset Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={assetTransfer["Nama Barang"]}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Asset Category</label>
                        <input
                          type="text"
                          className="form-control"
                          value={assetTransfer["Kategori Aset Tetap"]}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Original Location</label>
                        <input
                          type="text"
                          className="form-control"
                          value={assetTransfer["Lokasi"]}
                          readOnly
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Target User<span style={{color : "red"}}>*</span> </label>
                        <input
                          type="text"
                          className="form-control"
                          value={targetUser}
                          onChange={e => {
                            setTargetUser(e.target.value)
                            if (e.target.value === "") {
                              setDisableSubmit(true);
                            } else {
                              setDisableSubmit(String(assetTransfer["Kode Wilayah"]) === String(originalLocation) || (e.target.value !== "" && targetUserPost === ""));
                            }
                          }}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label>Target User Position<span style={{color : "red"}}>*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          value={targetUserPost}
                          onChange={e => {
                            setTargetUserPost(e.target.value)
                            if (e.target.value === "") {
                              setDisableSubmit(true);
                            } else {
                              setDisableSubmit(String(assetTransfer["Kode Wilayah"]) === String(originalLocation) || (targetUser === "" && e.target.value !== ""));
                            }
                          }}
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label>Target Location<span style={{color : "red"}}>*</span></label>
                        <select
                          required
                          name="Kode Wilayah"
                          value={assetTransfer["Kode Wilayah"]}
                          onChange={handleChangeTransfer}
                          className="form-select"
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
                    </div>
                  </div> :
                  <div style={{display : "flex", flexDirection : "column",justifyContent : "center", alignItems : "center"}}>
                    <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="View"
                        style={{ fontSize: "60px", color: "gray"  }}
                      >
                        &#xea5b;
                      </i>
                      This asset is in the process of being transferred
                  </div>
                }
              </div>
            </Modal.Body>
            { assetTransfer["Nomor Asset"] &&
              <Modal.Footer>
                <div className="button-asset">
                  <button
                    className="btn btn-danger button-cancel"
                    onClick={() => {
                      setModalTransferShow(false)
                      clearFormTransfer()
                    }}
                    style={{marginRight : "8px"}}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary float-end"
                    onClick={handleSubmitTransfer}
                    disabled={disableSubmit}
                  >
                    Submit
                  </button>
                </div>
              </Modal.Footer>
            }
          </Modal>
        </div>
      }

      {modalTransHistoryShow && 
        <div className="model-box-view">
        <Modal
          dialogClassName="view-modal"
          show={modalTransHistoryShow}
          onHide={() => {
            setHistoryAsset([]);
            setModalTransHistoryShow(false);
          }}
          backdrop="static"
          keyboard={false}
          size='lg'
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">{`History Transfer ${historyAsset.length > 0 ? historyAsset[0].AssetNumber : ""}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              { historyAsset.length > 0 ?
                <div>
                  {historyAsset.map(data => {
                    return(
                        <div className="d-flex flex-row m-2 ps-2">
                          <div className="me-3">
                            <i
                              className="material-icons"
                              data-toggle="tooltip"
                              title="Edit"
                              style={{ fontSize: "25px" }}
                            >
                              &#xeaf5;
                            </i>
                          </div>
                          <div className="d-flex flex-row">
                            <div className="fw-semibold">{new Date(data.ApprovalDate).toLocaleDateString('in-ID')}</div>
                            &nbsp;{`- from ${data.InitialLocation} to ${data.CurrentLocation} [Requester : ${data.Requester}]`}
                          </div>
                        </div>
                    )
                  })}
                </div> :
                <div>
                  <div style={{display : "flex", flexDirection : "column",justifyContent : "center", alignItems : "center"}}>
                    <i
                        className="material-icons"
                        data-toggle="tooltip"
                        title="View"
                        style={{ fontSize: "60px", color: "gray"  }}
                      >
                        &#xea5b;
                      </i>
                      This asset does not have transfer history
                  </div>
                </div>
              }
            </div>
          </Modal.Body>
        </Modal>
      </div>
      }

      {isLoading && <Loading />}
      {isLoading2 && <AssetLoading/>}
    </>
  );
};
