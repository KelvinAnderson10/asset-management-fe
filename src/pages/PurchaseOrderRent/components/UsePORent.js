import React from 'react'
import { useState } from 'react';

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

    const [rentData, setRentData] = useState([])

    

  return (
    <div>UsePORent</div>
  )
}
