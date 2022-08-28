import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './UseAuth'

export const ProtectedPage = () => {
    const {userOTP} = useAuth()
    return userOTP ? <Outlet></Outlet> : <Navigate to='/'></Navigate>
}

