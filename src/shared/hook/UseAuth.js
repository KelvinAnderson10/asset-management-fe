import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';



export const useAuth = () => {
    return useContext(AuthContext);
};