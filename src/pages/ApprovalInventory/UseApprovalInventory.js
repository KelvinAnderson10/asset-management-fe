import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/UseAuth";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";
import "./ApprovalInventory.css";
import moment from "moment";

export const UseApprovalInventory = () => {
  const [appData, setAppData] = useState([]);

  const { purchaseOrderService } = useDeps();
  let poDetailData;

  //Get PO List By Approval
  const onGetPOListByApproval = async (name) => {
    try {
      const response = await purchaseOrderService.getPOListByApproval(name);
      console.log(name);
      for (let i in response.data) {
        response.data[i].CreatedAt = moment(response.data[i].CreatedAt).format("LL");  
      }
      setAppData(response.data);
      console.log(appData);
    } catch (e) {
      console.log(e.response);
    }
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
      tap: savedUser.TAP,
      cluster: savedUser.Cluster,
      department: savedUser.department,
    }));
  };

  useEffect(() => {
    onGetCookie();
  }, []);

  useEffect(() => {
    onGetPOListByApproval(user.name);
  }, [user.name]);

  const navigate = useNavigate();

  const [poDetail, setpoDetail] = useState([]);
  const [poHeader, setPOHeader] = useState({});

  const handleClickApproval = async (
    id,
    toUser,
    jabatan,
    kodeWilayah,
    jenisProduk,
    approverLevel3
  ) => {
    try {
      let poHeaderInFunc = {};
      poHeaderInFunc.id = id;
      poHeaderInFunc.toUser = toUser;
      poHeaderInFunc.jabatan = jabatan;
      poHeaderInFunc.kodeWilayah = kodeWilayah;
      poHeaderInFunc.jenisProduk = jenisProduk;
      poHeaderInFunc.approverLevel3 = approverLevel3
      setPOHeader(poHeaderInFunc);
      const response = await purchaseOrderService.getPODetailById(id);
      console.log("ini id", id);
      console.log("response", response);
      for (let i in response.data) {
        if (response.data[i].ppn === true){
            response.data[i].ppn = '1'
        } else {
            response.data[i].ppn = '0'
        }
      }
      setpoDetail(response.data);
      console.log("po detail data", poDetail);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("detail po", poDetail);
    if (poDetail.length != 0) {
        navigate('/approval-data/inventory/form', {state: {header: poHeader,detail:poDetail}}) 
    }
  }, [poDetail]);

  return { handleClickApproval, onGetPOListByApproval, poDetail, appData, user };
};
