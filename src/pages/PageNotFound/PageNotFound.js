import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageNotFound/PageNotFound.css'

export const PageNotFound = () => {
    const navigate = useNavigate()
    const onButton = () => {
        navigate('/home', {replace: true})
    }

    return (
        <div className='page-not-found'>
                <div className='button' onClick={onButton}>
                    <p>BACK TO HOME</p>
                </div>
        </div>
    )
}
