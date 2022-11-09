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
            if (
              response.data[i].is_approved_level1 == true &&
              response.data[i].is_approved_level2 == true &&
              response.data[i].is_approved_level3 == true
              ) {
                setAppData1((appData1) => [...appData1, response.data[i]]);
              } else
              {
                setAppData((appData) => [...appData, response.data[i]]);
              }
            }
            console.log('inirent',appData)
          }
          } catch (e) {
      console.log(e.response);
    } finally {
      setIsLoading(false);
    }
  };

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
  }, [user.name]);

  const navigate = useNavigate();
  const [rentDetail, setrentDetail] = useState([]);

  const handleClickApproval = async (id) => {
    try {
      const response = await rentService.getRentById(id);
      console.log("ini rent detail ya ges", response.data);
      setrentDetail(response.data);
    } catch (error) {
      alert("Oops")
    }
  };

  useEffect(() => {
    if (rentDetail.length != 0) {
      navigate("/approval-data/rent/form", {
        state: { detail: rentDetail },
      });
    }
  }, [rentDetail]);

  return {
    onGetPORentListByApproval,
    user,
    isLoading,
    appData,
    appData1,
    handleClickApproval,
    rentDetail,
  };
};
