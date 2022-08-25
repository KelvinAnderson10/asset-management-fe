import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const onLogin = (userCred) => {
        window.localStorage.setItem('userCred', userCred);
        setUser(userCred)
        navigate('/home', {replace: true})
    }
    const onLogout = () => {
        window.localStorage.clear();
        setUser(null)
        navigate('/', {replace: true})
    }
    return (
        <AuthContext.Provider value={{user, onLogin, onLogout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth= () => {
    return useContext(AuthContext);
}