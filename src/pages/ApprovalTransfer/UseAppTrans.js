import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useAuth } from '../../services/UseAuth';
import { useDeps } from '../../shared/context/DependencyContext';

export const UseAppTrans = () => {
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

    // DATA
    const [reqList, setReqList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const {transferRequestService} = useDeps()

    const getListRequest = async () => {
        setLoading(true);
        try {
            const response = await transferRequestService.getIncomingRequest(user.name, page);
            if (response.data.length !== 0) {
                setReqList(response.data)
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getListRequest();
    }, [user.name]);

    return {
      reqList, loading
    }
}
