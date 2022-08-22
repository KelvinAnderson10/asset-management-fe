import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AssetItem } from '../pages/AssetItem/AssetItem'
import { HomeView } from '../pages/HomePage/HomeView'
import { LoginView } from '../pages/Login/LoginView'
import { Overview } from '../pages/Overview/Overview'
import {Location} from '../pages/Location/Location'
import {Vendor} from '../pages/Vendor/Vendor'
import { PageNotFound } from '../pages/PageNotFound/PageNotFound'
import { AssetCategory } from '../pages/AssetCategory/AssetCategory'
// import { AssetCategoryView } from '../pages/AssetCategory/AssetCategoryView'
export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<LoginView></LoginView>}></Route>
            <Route path='/home' element={<HomeView/>}/>  
            <Route path='/main' element={<Overview/>}/>
            <Route path='/data-management'element={<AssetItem/>}/> 
            <Route path='/data-management/asset-item'element={<AssetItem/>}/>
            <Route path='/data-management/asset-category'element={<AssetCategory/>}/>
            <Route path='/data-management/vendor'element={<Vendor/>}/>
            <Route path='/data-management/location'element={<Location/>}/>
            
            
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    )
}
