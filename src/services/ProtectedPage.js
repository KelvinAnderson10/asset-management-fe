import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './UseAuth'

export const ProtectedPage = () => {
    const getCookie = (cName) => {
        const name = cName + "=";
        const cDecoded = decodeURIComponent(document.cookie); //to be careful
        const cArr = cDecoded .split('; ');
        let res;
        cArr.forEach(val => {
            if (val.indexOf(name) === 0) res = val.substring(name.length);
        })
        console.log("ini get cookie",res);
        return (res)
    }
    return getCookie("OTP") ? <Outlet></Outlet> : <Navigate to='/'></Navigate>
}

