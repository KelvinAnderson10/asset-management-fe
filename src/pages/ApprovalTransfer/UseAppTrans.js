import React from 'react'
import Swal from "sweetalert2";
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/UseAuth';
import { NOTIF, PUSHNOTIF, STATUS } from '../../shared/constants';
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
    const [reqApprovedList, setReqApprovedList] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [detailAsset, setDetailAsset] = useState({});
    const [detailRequest, setDetailRequest] = useState({});
    const [showModalReq, setShowModalReq] = useState(false);
    const {transferRequestService, assetItemService, notificationService, userService} = useDeps();
    const navigate = useNavigate()

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

    const getListRequestApproved = async () => {
        setLoading(true);
        console.log(user.name);
        try {
            const response = await transferRequestService.getHistoryRequest(user.name, page);
            if (response.data.length !== 0) {
                let approvedList = response.data.filter(data => data.status === STATUS.TRANSFERRED)
                setReqApprovedList(approvedList)
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const approveRequest = async (id) => {
        setShowModalReq(false)
        setLoading(true);
        try {
            let response;
            if (user.level_approval === 'GA') {
                response = await transferRequestService.updateApprovalToLevel2(id);
            } else {
                response = await transferRequestService.updateApprovalToLevel1(id);
            }

            if (response.status === "SUCCESS") {
                setLoading(false);

                // SEND NOTIF TO GA IF APRROVED BY GM OR SPV
                if(user.level_approval !== 'GA') {
                    let existedRequest = await transferRequestService.getByReqeustId(id);
                    if (existedRequest.status === "SUCCESS") {
                        let notifObj = {
                            to: existedRequest.data.approver_level1,
                            title: NOTIF.REQUEST.TRANSFER.TITLE,
                            body: `${NOTIF.REQUEST.TRANSFER.BODY} ${user.name}`,
                            type: NOTIF.TYPE.TRANSFER,
                            resource_id : String(existedRequest.data["to_id"])
                        };
                        createNotification(notifObj)

                        const userInfo = await userService.getUserByName(existedRequest.data.approver_level2);

                        //pushnotif
                        let pushNotifObj = {
                            to: userInfo.data.token,
                            title: `${PUSHNOTIF.REQUEST.TITLE} ${existedRequest.data.approver_level2}`,
                            body: `${PUSHNOTIF.REQUEST.TRANSFER.BODY} ${user.name}`,
                        };
                        createPushNotification(pushNotifObj);
                    }
                }

                Swal.fire("Success!", "This transfer request has been approved.", "success").then((result) => {
                    if (result.isConfirmed) {
                        navigate(0);
                    }
                })
            }
        } catch (e) {
            console.log(e);
        } finally {
            reset();
            setLoading(false);
        }
    }

    const handleApproveRequest = async (id) => {
        setShowModalReq(false);
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to approve this transfer request",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approve",
          }).then((result) => {
            if (result.isConfirmed) {
              approveRequest(id);
            } 
          });
    }

    const rejectRequest = async (id) => {
        setShowModalReq(false);
        setLoading(true);
        try {
            const response = await transferRequestService.rejectApprovalTo(id);
            if (response.status === "SUCCESS") {
                setLoading(false);

                // NOTIF TO REQUESTER
                let existedRequest = await transferRequestService.getByReqeustId(id);
                if (existedRequest.status === "SUCCESS") {
                    let notifObj = {
                        to: existedRequest.data.requester,
                        title: NOTIF.REJECTED.TITLE,
                        body: `${NOTIF.REJECTED.BODY}`,
                        type: NOTIF.TYPE.TRANSFER,
                        resource_id : String(existedRequest.data["to_id"])
                    };
                    createNotification(notifObj)

                    const userInfo = await userService.getUserByName(existedRequest.data.requester);
                    //pushnotif
                    let pushNotifObj = {
                        to: userInfo.data.token,
                        title: `${PUSHNOTIF.REJECTED.TITLE} ${existedRequest.data.requester}`,
                        body: `${PUSHNOTIF.REJECTED.BODY}`,
                    };
                    createPushNotification(pushNotifObj);
                }

                Swal.fire("Success!", "This transfer request has been rejected.", "success").then((result) => {
                    if (result.isConfirmed) {
                        navigate(0);
                    }
                })
            }
        } catch (e) {
            console.log(e);
        } finally {
            reset();
            setLoading(false);
        }
    }

    const handleRejectRequest = async (id) => {
        setShowModalReq(false);
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to reject this transfer request",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject",
          }).then((result) => {
            if (result.isConfirmed) {
              rejectRequest(id);
            } 
          });
    }

    const getAssetDetail = async (assetNumber) => {
        setLoading(true);
        try {
            const response = await assetItemService.getAssetByName(assetNumber);
            if (response.status === 'SUCCESS'){
                setDetailAsset(response.data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const handleShowModalRequest = (dataRequest) => {
        setLoading(true);
        try {
            getAssetDetail(dataRequest["Nomor Asset"]);
            setDetailRequest(dataRequest);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false)
            setShowModalReq(true);
        }
    }

    const reset = () => {
        setShowModalReq(false);
        setDetailAsset({});
        setDetailRequest({});
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

    useEffect(() => {
        getListRequest();
        getListRequestApproved();
    }, [user.name]);

    return {
        reqList, 
        loading, 
        approveRequest,
        rejectRequest,
        detailRequest,
        detailAsset,
        handleShowModalRequest,
        setShowModalReq,
        showModalReq,
        reqApprovedList,
        handleApproveRequest,
        handleRejectRequest
    }
}
