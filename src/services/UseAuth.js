import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [userOTP, setUserOTP] = useState()

    const setCookie = (cName, cValue, expMinutes) => {
        let date = new Date();
        date.setTime(date.getTime() + (expMinutes*60*1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
        setUserOTP(cName, cValue, expMinutes)
        navigate('/home', {replace: true})
    }

    const eraseCookie =() =>{
        // document.cookie = name + '=; Max-Age=0'
        document.cookie = "OTP= ; expires = Thu, 01 Jan 1970 00:00:00 GMT" 
        } 
    return (
        <AuthContext.Provider value={{userOTP,setCookie,eraseCookie}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth= () => {
    return useContext(AuthContext);
}