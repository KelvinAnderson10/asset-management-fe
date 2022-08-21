import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDeps } from "../../shared/context/DependencyContext";

export const LocationList = () => {
    // const [apiData, setApiData] = useState([]);
    // useEffect(()=>{
    //     axios.get('https://62ff0fb5a85c52ee48401579.mockapi.io/location')
    //     .then((getData)=>{
    //         setApiData(getData.data);
    //     })
    // })
    const {locationService} = useDeps();
    const [isLoading,setLoading] = useState(false);
    const [locations, setLocations] = useState([]);

    useEffect(()=>{
      onGetAllLocation();
    
      },[])
      const onGetAllLocation = async ()=>{
        setLoading(true);
        try {
          const response = await locationService.getAllLocation()
        console.log(response);
        setLocations(response)
        } catch (e) {
          console.log(e);
        }finally{
          setLoading(false)
        }
        
      }



  return (
    <div>
      <table className="table table-bordered border-primary table-responsive">
        <thead>
          <tr>
            <th scope="col">Location</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
            {locations.locations.map((data)=>{
                return(
                    <tr>
            <th scope="col">{data.location}</th>
            <th scope="col"><button>Update</button></th>
          </tr>)
            })}
        </tbody>
      </table>
    </div>
  );
};
