import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/UseAuth";
import Sidebar from "../../shared/components/Sidebar/Sidebar";
import { useDeps } from "../../shared/context/DependencyContext";

import moment from "moment";

export const UseApprovalInventory = () => {
  const [appData, setAppData] = useState([]);
  const [appData1, setAppData1]= useState([])

  const { purchaseOrderService } = useDeps();
  let poDetailData;

  //Get PO List By Approval
  const onGetPOListByApproval = async (name) => {
    try {
      const response = await purchaseOrderService.getPOListByApproval(name);
      console.log(response);
      for (let i in response.data) {
        response.data[i].CreatedAt = moment(response.data[i].CreatedAt).format(
          "LL"
        );
        if (response.data[i].tipe == 'Inventory'){
          if (response.data[i].is_approved_level1 == true && response.data[i].is_approved_level2 == true && response.data[i].is_approved_level3 == true
          
            ) {
              setAppData1((appData1) => [...appData1, response.data[i]]);
              console.log('ini response data',response.data[i]);
    
             
            } else if((response.data[i].approver_level3 == "-" && response.data[i].is_approved_level1 == true) ||(response.data[i].is_approved_level1 == true &&response.data[i].is_approved_level2 == true)){
              setAppData((appData) => [...appData, response.data[i]]);
              console.log('ini response data',response.data[i]);
              
            }
          }
        }
        
    } catch (e) {
      console.log(e.response);
    }
  };


  console.log('ini app data',appData)
  console.log('ini app data1',appData1)

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
    approverLevel3,
    tipe,
    status,
    requester,
  ) => {
    try {
      let poHeaderInFunc = {};
      poHeaderInFunc.id = id;
      poHeaderInFunc.toUser = toUser;
      poHeaderInFunc.jabatan = jabatan;
      poHeaderInFunc.kodeWilayah = kodeWilayah;
      poHeaderInFunc.jenisProduk = jenisProduk;
      poHeaderInFunc.approverLevel3 = approverLevel3;
      poHeaderInFunc.tipe = tipe;
      poHeaderInFunc.status = status
      poHeaderInFunc.requester = requester
      setPOHeader(poHeaderInFunc);

      const response = await purchaseOrderService.getPODetailById(id);
      console.log("ini id", id);
      console.log("response", response);
      for (let i in response.data) {
        if (response.data[i].ppn === true) {
          response.data[i].ppn = "1";
        } else {
          response.data[i].ppn = "0";
        }
      }
      setpoDetail(response.data);
      console.log("po detail data", poDetail);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("detail po use effect", poDetail);
    if (poDetail.length != 0) {
      navigate("/approval-data/inventory/form", {
        state: { header: poHeader, detail: poDetail },
      });
    }
  }, [poDetail]);

  return {
    handleClickApproval,
    onGetPOListByApproval,
    poDetail,
    appData,
    user,
    setpoDetail,
    poHeader,
    setPOHeader,
    appData1
  };
};
