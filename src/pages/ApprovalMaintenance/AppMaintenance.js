import React, { useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { ListApprovedMaintenance } from './components/ListApprovedMaintenance'
import { ListPRMaintenance } from './components/ListPRMaintenance'

export const AppMaintenance = () => {
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
                <a>List Purchase Request</a>
                </div>
                <div className={classNavbarList} onClick={() => handleClickList()}>
                    <a>Approved</a>
                </div> 
                </div>
                <div className='title-right'>
                <div className='title-box'>
                    <a>Maintenance</a>
                </div>
                </div>
            </div>
       </div>
       {requestForm && <ListPRMaintenance/>}
       {requestList && <ListApprovedMaintenance/>}
    </Sidebar>
</>
  )
}
