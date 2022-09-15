import React, { useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import './POMaintenance.css'

export const POMaintenance = () => {
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
    <div>
        <Sidebar>
            <div className='body'>
                <div className='po-maintenance-list-container'>
                    <div className='navbar-po-maintenance-container'>
                        <div className='navbar-po-maintenance-box'>
                            <a>Form Request</a>
                        </div>
                        <div className='navbar-po-maintenance-box2'>
                            <a>List Request</a>
                        </div>
                    </div>
                </div>
            </div>
        </Sidebar>
    </div>
  )
}
