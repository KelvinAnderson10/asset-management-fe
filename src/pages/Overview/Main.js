import React, { useEffect, useState } from 'react'
import { useAuth } from '../../services/UseAuth'
import Sidebar from '../../shared/components/Sidebar/Sidebar'
import { Dashboard } from './Dashboard'
import './Main.css'
import { Overview } from './Overview'
export const Main = () => {
  const [assetList, setAssetList] = useState()
  const [dashboard, setDashboard] = useState()
  const [classNavbarAsset, setClassNavbarAsset] = useState('main-navbar-asset')
  const [classNavbarDashboard, setClassNavbarDashboard] = useState('main-navbar-dashboard2')

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
    setClassNavbarAsset('main-navbar-asset2')
    setClassNavbarDashboard('main-navbar-dashboard')
  }

  const handleClickDashboard = () => {
    setDashboard(true)
    setAssetList(false)
    setClassNavbarAsset('main-navbar-asset')
    setClassNavbarDashboard('main-navbar-dashboard2')
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
            </div>
            {dashboard && <Dashboard/>}
            {assetList && <Overview/>}
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
