import React, { useEffect, useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { ListPOInventory } from './components/ListPOInventory'
import './POInventory.css'

export const POInventory = () => {
    //Navbar
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
                    <div className={classNavbarForm} onClick={() => handleClickForm()}>
                        <a>Form Request</a>
                    </div>
                    <div className={classNavbarList} onClick={() => handleClickList()}>
                        <a>List Request</a>
                    </div> 
                    </div>
               </div>
               {requestList && <ListPOInventory/>}
            </Sidebar>
        </>
    )
}
