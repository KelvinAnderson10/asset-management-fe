import React, { useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { ListTransReq } from './component/ListTransReq';

export const AppTrans = () => {
    const [requestForm, setRequestForm] = useState(true);
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
                    <a>List Transfer Request</a>
                    </div>
                    <div className={classNavbarList} onClick={() => handleClickList()}>
                        <a>Approved</a>
                    </div> 
                    </div>
                </div>
            </div>
            <ListTransReq />
        </Sidebar>
    </>
  )
}
