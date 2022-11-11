import React, { useEffect, useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'

import { FormPORent } from './components/FormPORent'
import { ListPORent } from './components/ListPORent'
import './PORent.css'

export const PORent = () => {
    //Navbar
    const [requestForm, setRequestForm] = useState(true)
    const [requestList, setRequestList] = useState(false)
    const [classNavbarForm, setClassNavbarForm] = useState('navbar-po-box')
    const [classNavbarList, setClassNavbarList] = useState('navbar-po-box2')
    const [isLoading, setIsloading] = useState(false)

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
               <div className='po-rent-container'>
                    <div className='navbar-po-container'>
                        <div className='navbar-po-left'>
                        <div className={classNavbarForm} onClick={() => handleClickForm()}>
                        <a>Form Request</a>
                        </div>
                        <div className={classNavbarList} onClick={() => handleClickList()}>
                            <a>List Request</a>
                        </div> 
                        </div>
                        <div className='title-right'>
                        <a>Rent</a>
                        </div>
                    </div>
               </div>
               {requestList && <ListPORent/>}
               {requestForm && <FormPORent/>}
            </Sidebar>
        </>
    )
}
