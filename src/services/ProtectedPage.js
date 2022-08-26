import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './UseAuth'

export const ProtectedPage = () => {
    const {user} = useAuth()
    return user ? <Outlet></Outlet> : <Navigate to='/'></Navigate>
}

