import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LoginView } from '../pages/Login/LoginView'

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<LoginView></LoginView>}></Route>
        </Routes>
    )
}
