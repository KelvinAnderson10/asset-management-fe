import React, { useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { FormPOMaintenance } from './components/FormPOMaintenance'
import { ListPOMaintenance } from './components/ListPOMaintenance'
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
                <div className='po-maintenance-container'>
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
                        <a>Maintenance</a>
                        </div>
                    </div>
                </div>
                {requestList && <ListPOMaintenance/>}
               {requestForm && <FormPOMaintenance/>}
        </Sidebar>
    </div>
  )
}
