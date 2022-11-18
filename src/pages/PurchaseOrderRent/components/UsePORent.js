import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../services/UseAuth';
import { useDeps } from '../../../shared/context/DependencyContext';

export const UsePORent = () => {
    // USER
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
    const [rentData, setRentData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const { rentService } = useDeps();
    const [totalPage, setTotalPage] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)

    const onGetUser = () => {
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
    }

    useEffect(() => {
        onGetUser();
    }, []);


    // LIST REQUEST DATA
    const onGetPORentByRequester = async (name, page) =>{
        setIsLoading(true)
        try{
            const response = await rentService.getRentByRequester(name,page)
            console.log('ini responsebyrequester', response);
            for (let i in response.data) {
              response.data[i].CreatedAt = moment(response.data[i].CreatedAt).format("LL")
            }
            setRentData(response.data)
            setTotalPage(Math.ceil(response.count / 10))

        }catch(e){
           console.log(e.response);
        }finally{
            setIsLoading(false)
        }

    }

    useEffect(()=>{
      if (user.name){
        onGetPORentByRequester(user.name, currentPage+1)
      }
        
    },[user.name,currentPage])

    const navigate = useNavigate()
    const [rentDetail, setrentDetail] = useState([]);

    const handleClickDetailRent = async (id) => {
      try {
        const response = await rentService.getRentById(id);
        console.log("ini rent detail ya ges", response.data);
        response.data.periode_sewa_awal = moment(response.data.periode_sewa_awal).format("DD-MM-YYYY");
        response.data.periode_sewa_akhir = moment(response.data.periode_sewa_akhir).format("DD-MM-YYYY");
        response.data.tanggal_jatuh_tempo = moment(response.data.tanggal_jatuh_tempo).format("DD-MM-YYYY");
        setrentDetail(response.data);
      } catch (error) {
        alert("Oops")
      }
    };

    const handlePageClick = async (data) => {
      setCurrentPage(data.selected)
      
    };

    useEffect(() => {
        if (rentDetail.length != 0) {
          navigate("/purchase-request/rent/form", {
            state: { detail: rentDetail },
          });
        }
      }, [rentDetail]);


      return{
        onGetPORentByRequester,
        user,
        handleClickDetailRent,
        rentData,
        rentDetail,
        isLoading,
        totalPage,
        handlePageClick,
        setCurrentPage,
        currentPage
      }

  
}
