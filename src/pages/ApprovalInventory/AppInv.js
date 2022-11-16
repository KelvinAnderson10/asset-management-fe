import React, { useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { ListApproved } from './components/ListApproved'
import { ListPurchaseRequest } from './components/ListPurchaseRequest'
import "./AppInv.css"

export const AppInv = () => {
    const [requestForm, setRequestForm] = useState(true)
    const [requestList, setRequestList] = useState(false)
    const [classNavbarForm, setClassNavbarForm] = useState('navbar-po-box')
    const [classNavbarList, setClassNavbarList] = useState('navbar-po-box2')

    const handleClickForm = () => {
        setRequestForm(true)
        setRequestList(false)
        setClassNavbarForm('navbar-po-box')
        setClassNavbarList('navbar-po-box2')
    }

    const handleClickList = () => {
        setRequestList(true)
        setRequestForm(false)
        setClassNavbarForm('navbar-po-box2')
        setClassNavbarList('navbar-po-box')
    }

  return (
    <>
    <Sidebar>
       <div className='po-inventory-container'>
            <div className='navbar-po-container'>
                <div className='navbar-po-left'>
                <div className={classNavbarForm} onClick={() => handleClickForm()}>
                <div className='text-inv'>List Purchase Request</div>
                </div>
                <div className={classNavbarList} onClick={() => handleClickList()}>
                    <div className='text-inv2'>Approved</div>
                </div> 
                </div>
                <div className='title-right'>
                <div className='title-box'>
                    Inventory
                </div>
                </div>
            </div>
       </div>
       {requestForm && <ListPurchaseRequest/>}
       {requestList && <ListApproved/>}
    </Sidebar>
</>
  )
}
