import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { DashboardView } from '../pages/Dashboard/DashboardView'
import Location from '../pages/Location/Location'


import { LoginView } from '../pages/Login/LoginView'
import { Vendor } from '../pages/Vendor/Vendor'
import { VendorView } from '../pages/Vendor/VendorView'


import { AppLayout } from '../shared/components/AppLayout/AppLayout'

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<LoginView></LoginView>}></Route>
            <Route path='/home' element={<AppLayout/>}> 
            <Route path='dashboard' element={<DashboardView/>}/>
            <Route path='vendor' element={<Vendor/>}/>
            <Route path='location' element={<Location/>}/>
            
        </Route>
        </Routes>
    )
}
