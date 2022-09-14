import React, { useState } from 'react'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { Dashboard } from './Dashboard'
import './Main.css'
import { Overview } from './Overview'
export const Main = () => {
  const [assetList, setAssetList] = useState(false)
  const [dashboard, setDashboard] = useState(true)
  const [classNavbarAsset, setClassNavbarAsset] = useState('main-navbar-asset')
  const [classNavbarDashboard, setClassNavbarDashboard] = useState('main-navbar-dashboard2')

  const handleClickAsset =() => {
    setAssetList(true)
    setDashboard(false)
    setClassNavbarAsset('main-navbar-asset2')
    setClassNavbarDashboard('main-navbar-dashboard')
  }

  const handleClickDashboard = () => {
    setDashboard(true)
    setAssetList(false)
    setClassNavbarAsset('main-navbar-asset')
    setClassNavbarDashboard('main-navbar-dashboard2')
  }
  document.querySelector("body").style.overflow = "auto";
  return (
    <>
      <Sidebar>
        <div className='mainhome-container'>
            <div className='main-navbar-container'>
              <div className={classNavbarDashboard} onClick={() => handleClickDashboard()}>
                <a>Dashboard</a>
              </div>
              <div className={classNavbarAsset} onClick={() => handleClickAsset()}>
                <a>List of Asset</a>
              </div>
            </div>
            {dashboard && <Dashboard/>}
            {assetList && <Overview/>}
        </div>
      </Sidebar>    
    </> 
  )
}
