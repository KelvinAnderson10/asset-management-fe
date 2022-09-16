
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../services/UseAuth'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { useDeps } from '../../shared/context/DependencyContext'
import './ApprovalInventory.css'

export const UseApprovalInventory = () => {
  const [appData, setAppData] = useState([]);

  const { purchaseOrderService } = useDeps();
  let poDetailData

  //Get PO List By Approval
  const onGetPOListByApproval = async (name) => {
    try {
      const response = await purchaseOrderService.getPOListByApproval(name);
      console.log(name);
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

  const [poDetail, setpoDetail] = useState([])
  const handleClickApproval = async (id) => {
    try{
        const response = await purchaseOrderService.getPODetailById(id);
        console.log('ini id',id);
        console.log('response',response)
        setpoDetail(response.data)
        console.log('po detail data',poDetail)
        navigate('/approval-data/inventory/form', {replace: true}) 
    } catch(e){
        console.log(e)
    }
  }

 return {handleClickApproval, onGetPOListByApproval,poDetail,appData}
  

  
};
