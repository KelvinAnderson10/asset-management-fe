import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { HomeView } from '../pages/HomePage/HomeView'
import { LoginView } from '../pages/Login/LoginView'
import { Overview } from '../pages/Overview/Overview'
import { Location } from '../pages/Location/Location'
import { VendorManage } from '../pages/Vendor/Vendor'
import { ImportData } from '../pages/Import Data/ImportData'

import { PageNotFound } from '../pages/PageNotFound/PageNotFound'
import { AssetCategory } from '../pages/AssetCategory/AssetCategory'
import UploadAndDisplayImage from '../pages/AssetItem/tesimg'
import { AssetItem } from '../pages/AssetItem/AssetItem'


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<LoginView></LoginView>}></Route>
            <Route path='/home' element={<HomeView/>}/>  
            <Route path='/main' element={<Overview/>}/>
            <Route path='/data-management'element={<UploadAndDisplayImage/>}/> 
            <Route path='/data-management/asset-item' element = {<AssetItem/>}/>
            <Route path='/data-management/asset-category'element={<AssetCategory/>}/>
            <Route path='/data-management/vendor'element={<VendorManage/>}/>
            <Route path='/data-management/location'element={<Location/>}/>
            <Route path='/upload-data' element={<ImportData/>} />
           
            
            
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}
