import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { LoginView } from '../pages/Login/LoginView'
import { AppLayout } from '../shared/components/AppLayout/AppLayout'

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<LoginView></LoginView>}></Route>
            <Route path='/home' element={<AppLayout/>}> 
            {/* <Route path='dashboard' element={<DashboardView />}/> */}
            
        </Route>
        </Routes>
    )
}
