import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hook/UseLocalStorage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token', null);
    const [user, setUser] = useLocalStorage('user', null);

    const onLogin = (useCred) => {
        setUser(useCred)
        navigate('dashboard', { replace: true });
    };
    const onLogout = () => {
        setUser(null)
        navigate('/', { replace: true });
    };
    return (
        <AuthContext.Provider value={{ user, onLogin, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
};