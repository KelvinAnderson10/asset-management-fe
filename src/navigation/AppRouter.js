import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AssetItem } from '../pages/AssetItem/AssetItem'
import { HomeView } from '../pages/HomePage/HomeView'
import { LoginView } from '../pages/Login/LoginView'
import { Overview } from '../pages/Overview/Overview'

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<LoginView></LoginView>}></Route>
            <Route path='/home' element={<HomeView/>}/>  
            <Route path='/main' element={<Overview/>}/>
            <Route path='/data-management'element={<AssetItem/>}/>

        </Routes>
    )
}
