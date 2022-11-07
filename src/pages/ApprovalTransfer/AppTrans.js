import React, { useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { ListTransReq } from './component/ListTransReq';
import { UseAppTrans } from './UseAppTrans';

export const AppTrans = () => {
    const [requestList, setRequestList] = useState(true);
    const [requestApproved, setRequestApproved] = useState(false);
    const [classNavbarForm, setClassNavbarForm] = useState('navbar-po-box');
    const [classNavbarList, setClassNavbarList] = useState('navbar-po-box2');
    const {reqList, reqApprovedList} = UseAppTrans();

    const handleClickList = () => {
        setRequestList(true)
        setRequestApproved(false)
        setClassNavbarForm('navbar-po-box')
        setClassNavbarList('navbar-po-box2')
    }

    const handleClickApproved = () => {
        setRequestList(false)
        setRequestApproved(true)
        setClassNavbarForm('navbar-po-box2')
        setClassNavbarList('navbar-po-box')
    }

  return (
    <>
        <Sidebar>
            <div className='po-inventory-container'>
                <div className='navbar-po-container'>
                    <div className='navbar-po-left'>
                    <div className={classNavbarForm} onClick={() => handleClickList()}>
                    <a>List Transfer Request</a>
                    </div>
                    <div className={classNavbarList} onClick={() => handleClickApproved()}>
                        <a>Approved</a>
                    </div> 
                    </div>
                </div>
            </div>
            <div className='container-fluid bg-secondary bg-opacity-10 rounded-2 mx-5 p-5 h-75'>
                {requestList && <ListTransReq listData={reqList}/>}
                {requestApproved && <ListTransReq listData={reqApprovedList} showButton={false}/>}
            </div>
        </Sidebar>
    </>
  )
}
