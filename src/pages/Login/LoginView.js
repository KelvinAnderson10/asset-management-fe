import './LoginView.css'
import logo from '../../assets/images/narindo_logo_black.svg';
import React from 'react'

export const LoginView = () => {
    return (
        <div className='rowContainerLogin'>
            <div>Test</div>
            <div className='columnContainerLogin'>
                <img src={logo} alt='logo'></img>
                <p>ASSET MANAGEMENT</p>
                <h4>Log In to Dashboard</h4>
                <h6>Enter your email and password below</h6>
            </div>
        </div>
    )
}
