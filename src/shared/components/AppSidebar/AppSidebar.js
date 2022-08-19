import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './AppSidebar.css'

export const AppSidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const navigate = useNavigate()

  const handleClick = (destination) => {
    navigate(destination)
    setActiveMenu(destination)
  } 

  return (
  <div className="d-flex flex-column flex-shrink-0 p-3 border-end nav-container">
    <ul className="nav nav-pills flex-column mb-auto gap-2 ">
      <li onClick={() => handleClick('/home/dashboard')} className={activeMenu === '/home/dashboard' ? "nav-item active" : "nav-item"}>
        <a className="nav-link ">
          <svg className="bi pe-none me-2" width="16" height="16"></svg>
          Overview
        </a>
      </li>
      <li onClick={() => handleClick('/home/assetitem')} className={activeMenu === '/home/data-management' ? "nav-item active" : "nav-item"}>
        <a className="nav-link ">
          <svg className="bi pe-none me-2" width="16" height="16"></svg>
          Asset Item
        </a>
      </li>
      <li onClick={() => handleClick('/home/assetcategory')} className={activeMenu === '/home/asset-item' ? "nav-item active" : "nav-item"}>
        <a className="nav-link ">
          <svg className="bi pe-none me-2" width="16" height="16"></svg>
          Asset Category
        </a>
      </li>
      <li onClick={() => handleClick('/home/assetcategory')} className={activeMenu === '/home/asset-item' ? "nav-item active" : "nav-item"}>
        <a className="nav-link ">
          <svg className="bi pe-none me-2" width="16" height="16"></svg>
          Category
        </a>
      </li>
      <li onClick={() => handleClick('/home/assetcategory')} className={activeMenu === '/home/asset-item' ? "nav-item active" : "nav-item"}>
        <a className="nav-link ">
          <svg className="bi pe-none me-2" width="16" height="16"></svg>
          SubCategory
        </a>
      </li>
      <li onClick={() => handleClick('/home/vendor')} className={activeMenu === '/home/asset-item' ? "nav-item active" : "nav-item"}>
        <a className="nav-link ">
          <svg className="bi pe-none me-2" width="16" height="16"></svg>
          Vendor
        </a>
      </li>
      <li onClick={() => handleClick('/home/location')} className={activeMenu === '/home/asset-item' ? "nav-item active" : "nav-item"}>
        <a className="nav-link ">
          <svg className="bi pe-none me-2" width="16" height="16"></svg>
         Location
        </a>
      </li>
      <li onClick={() => handleClick('/home/importdata')} className={activeMenu === '/home/asset-item' ? "nav-item active" : "nav-item"}>
        <a className="nav-link ">
          <svg className="bi pe-none me-2" width="16" height="16"></svg>
          Import Data
        </a>
      </li>
    </ul>
  </div>
  )
}
