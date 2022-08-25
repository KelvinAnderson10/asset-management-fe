import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { HomeView } from '../pages/HomePage/HomeView'
import { LoginView } from '../pages/Login/LoginView'
import { Overview } from '../pages/Overview/Overview'
import { Location } from '../pages/Location/Location'
import { VendorManage } from '../pages/Vendor/Vendor'
import { ImportData } from '../pages/Import Data/ImportData'
import { Asset } from '../pages/AssetItem/Asset'


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<LoginView></LoginView>}></Route>
            <Route path='/home' element={<HomeView/>}/>  
            <Route path='/main' element={<Overview/>}/>
            <Route path='/data-management'element={<Asset/>}/> 
            <Route path='/data-management/asset-inventory'element={<Asset/>}/>
            <Route path='/data-management/product'element={<Asset/>}/>
            <Route path='/data-management/vendor'element={<VendorManage/>}/>
            <Route path='/data-management/location'element={<Location/>}/>
            <Route path='/upload-data' element={<ImportData/>} />
           
            
        </Routes>
    )
}
