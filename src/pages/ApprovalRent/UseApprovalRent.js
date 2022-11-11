import React, { useEffect, useState } from "react";
import { useAuth } from "../../services/UseAuth";
import { useDeps } from "../../shared/context/DependencyContext";
import moment from "moment";
import { rentService } from "../../services/RentService";
import { useNavigate } from "react-router-dom";

export const UseApprovalRent = () => {
  const [appData, setAppData] = useState([]);
  const [appData1, setAppData1] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { rentService } = useDeps();
  const [page,setPage] = useState(1)

  const onGetPORentListByApproval = async (name) => {
    setIsLoading(true);
    try {
      const response = await rentService.getRentListByApproval(name, page);
      console.log('ini response',response.data);
      if (page===1){

        
        for (let i in response.data) {
          response.data[i].CreatedAt = moment(response.data[i].CreatedAt).format(
            "LL"
            );
              setAppData((appData) => [...appData, response.data[i]]);
            
            }
            console.log('inirent',appData)
          }
          } catch (e) {
      console.log(e.response);
    } finally {
      setIsLoading(false);
    }
  };

  const onGetListRentHistory = async(name) => {
    setIsLoading(true)
    try {
      const response = await rentService.getRentListHistory(name, page);
      console.log('ini response',response.data);
      if (page===1){
        for (let i in response.data) {
          response.data[i].CreatedAt = moment(response.data[i].CreatedAt).format(
            "LL"
            );
              setAppData1((appData1) => [...appData1, response.data[i]]);
            
            }
            console.log('INI app1', appData1);
      }
    } catch (e) {
      console.log(e.response);
    } finally {
      setIsLoading(false);
    }
  }

  // Get User
  const { getCookie } = useAuth();
  const [user, setUser] = useState({
    name: "",
    role: "",
    level_approval: "",
    location_id: "",
    tap: "",
    cluster: "",
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
    onGetPORentListByApproval(user.name);
    onGetListRentHistory(user.name)
  }, [user.name]);

  const navigate = useNavigate();
  const [rentDetail, setrentDetail] = useState([]);

  const handleClickApproval = async (id) => {
    try {
      const response = await rentService.getRentById(id);
      response.data.periode_sewa_awal = moment(response.data.periode_sewa_awal).format("YYYY-MM-DD")
      response.data.periode_sewa_akhir = moment(response.data.periode_sewa_akhir).format("YYYY-MM-DD")
      setrentDetail(response.data);
    } catch (error) {
      alert("Oops")
    }
  };

  useEffect(() => {
    if (rentDetail.length != 0) {
      navigate("/approval-data/rent/form", {
        state: { detail: rentDetail, userApprov : user.level_approval },
      });
    }
  }, [rentDetail]);

  return {
    onGetPORentListByApproval,
    onGetListRentHistory,
    user,
    isLoading,
    appData,
    appData1,
    handleClickApproval,
    rentDetail,
  };
};
