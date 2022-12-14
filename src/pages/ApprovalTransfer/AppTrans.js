import React, { useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { ListTransReq } from './component/ListTransReq';
import { UseAppTrans } from './UseAppTrans';
import "../ApprovalInventory/components/ListPurchaseRequest.css"
import '../ApprovalInventory/AppInv.css'

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
                    <div className='text-inv'>List Transfer Request</div>
                    </div>
                    <div className={classNavbarList} onClick={() => handleClickApproved()}>
                        <div className='text-inv2'>Approved</div>
                    </div> 
                    </div>
                </div>
            </div>
            <div >
                {requestList && <ListTransReq listData={reqList}/>}
                {requestApproved && <ListTransReq listData={reqApprovedList} showButton={false}/>}
            </div>
        </Sidebar>
    </>
  )
}
