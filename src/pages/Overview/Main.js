import React, { useEffect, useState } from 'react'
import { useAuth } from '../../services/UseAuth'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { Dashboard } from './Dashboard'
import './Main.css'
import { Overview } from './Overview'
import { ViewRent } from './ViewRent'
export const Main = () => {
  const [assetList, setAssetList] = useState()
  const [dashboard, setDashboard] = useState()
  const [rentList, setRentList] = useState()
  const [classNavbarAsset, setClassNavbarAsset] = useState('main-navbar-asset')
  const [classNavbarDashboard, setClassNavbarDashboard] = useState('main-navbar-dashboard2')
  const [classNavbarRent, setClassNavbarRent] = useState('main-navbar-rent')


  //Get User
  const { getCookie } = useAuth();
  const [user, setUser] = useState({
    name: "",
    role: "",
    level_approval: "",
    location_id: "",
    tap: "",
    cluster: "",
    department: "",
  });
  const onGetCookie = () => {
    let savedUserJsonString = getCookie("user");
    let savedUser = JSON.parse(savedUserJsonString);
    setUser((prevObj) => ({
      ...prevObj,
      name: savedUser.name,
      role: savedUser.role,
      level_approval: savedUser.level_approval,
      location_id: savedUser.location_id,
      tap: savedUser.TAP,
      cluster: savedUser.Cluster,
      department: savedUser.department,
    }));
  };

  useEffect(() => {
    onGetCookie();
  }, []);

  useEffect(() => {
    if (user.role !== 'Regular') {
      setDashboard(true)
      setAssetList(false)
    } else {
      setDashboard(false)
      setAssetList(true)
    }
  }, [user.role])

  const handleClickAsset =() => {
    setAssetList(true)
    setDashboard(false)
    setRentList(false)
    setClassNavbarAsset('main-navbar-asset2')
    setClassNavbarDashboard('main-navbar-dashboard')
    setClassNavbarRent('main-navbar-rent')
  }

  const handleClickDashboard = () => {
    setDashboard(true)
    setAssetList(false)
    setRentList(false)
    setClassNavbarAsset('main-navbar-asset')
    setClassNavbarDashboard('main-navbar-dashboard2')
    setClassNavbarRent('main-navbar-rent')
  }

  const handleClickRent = () => {
    setRentList(true)
    setDashboard(false)
    setAssetList(false)
    setClassNavbarAsset('main-navbar-asset')
    setClassNavbarDashboard('main-navbar-dashboard')
    setClassNavbarRent('main-navbar-rent2')
  }

  const onView = () => {
    switch (user.role){
    case 'Regular':
      return (
        <>
      <Sidebar>
        <div className='mainhome-container'>
            {assetList && <Overview/>}
        </div>
      </Sidebar>    
    </> 
      )
    default:
      return (
      <>
      <Sidebar>
        <div className='mainhome-container'>
            <div className='main-navbar-container'>
            <div className={classNavbarDashboard} onClick={() => handleClickDashboard()}>
                <a style={{fontSize: '12px'}}>Dashboard</a>
              </div>
              <div className={classNavbarAsset} onClick={() => handleClickAsset()}>
                <a style={{fontSize: '12px'}}>List of Inventory</a>
              </div>
              <div className={classNavbarRent} onClick={() => handleClickRent()}>
                <a style={{fontSize: '12px'}}>List of Rent</a>
              </div>
            </div>
            {dashboard && <Dashboard/>}
            {assetList && <Overview/>}
            {rentList && <ViewRent/>}
        </div>
      </Sidebar>    
    </> 
      )
    }
  }
  return (
    <>
     {onView()}
    </>
   
  )
}
