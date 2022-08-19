import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../shared/context/AuthContext";


export const useAuth = () => {
    return useContext(AuthContext);
};