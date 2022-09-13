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
        cValue=JSON.stringify(cValue)
        document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
        setUserOTP(cName, cValue, expMinutes)
        navigate('/main', {replace: true})
    }
    const getCookie = (cname) => {
        var name = cname + '=';
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    const eraseCookie =() =>{
        // document.cookie = name + '=; Max-Age=0'
        // document.cookie = "OTP= ; expires = Thu, 01 Jan 1970 00:00:00 GMT" 
        document.cookie = "user= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        } 
    return (
        <AuthContext.Provider value={{userOTP,setCookie,eraseCookie,getCookie}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth= () => {
    return useContext(AuthContext);
}