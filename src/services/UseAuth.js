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
    return (
        <AuthContext.Provider value={{userOTP,setCookie}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth= () => {
    return useContext(AuthContext);
}