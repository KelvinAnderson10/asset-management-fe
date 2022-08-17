import React from 'react'
import './AppLayout.css'
import { AppSidebar } from '../AppSidebar/AppSidebar'
import { AppHeader } from '../AppHeader/AppHeader'
import { Outlet } from 'react-router-dom'

export const AppLayout = () => {
  return (
    <div className='AppLayout'>
        <AppHeader />
        <div className='d-flex flex-row'>
            <div>
                <AppSidebar />
            </div>
            <div className='Content p-3'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}
