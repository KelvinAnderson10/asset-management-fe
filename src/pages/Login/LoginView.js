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
                <form className='formContainer'>
                    <label>EMAIL</label>
                    <input type='email' placeholder='Email address'></input>
                    <label>PASSWORD</label>
                    <input type='password' placeholder='Password'></input>
                    <button type='submit'>Log In</button>
                </form>
            </div>
        </div>
    )
}
