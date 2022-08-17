import './LoginView.css'
import logo from '../../assets/images/narindo_logo_black.svg';
import React, { useEffect, useState } from 'react'
import AuthCode from 'react-auth-code-input';
import { Card } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader';


export const LoginView = () => {
    const [email, setEmail] = useState('')
    const [showOTPForm, setShowOTPForm] = useState()


    // useEffect(() => {
    //     setShowOTPForm(true)
    // }, [showOTPForm])

    const validateEmail = (e) => {
        if (email !== 'admin@gmail.com'){
            e.preventDefault()
            alert("Email not registered yet, Please input a valid email")
        }else{
            e.preventDefault()
            setShowOTPForm(true)
        }
    }
    



    return (
        <div className='rowContainerLogin'>
            
            <div className='columnContainerLogin'>
                <img src={logo} alt='logo'></img>
                <h4>ASSET MANAGEMENT</h4>
                <h5>Log In to Dashboard</h5>
                <h6>Enter your email below</h6>
                <form className='formContainer'>
                    <label>EMAIL</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='admin@gmail.com' ></input>
                    <button onClick={(e) => {validateEmail(e)}} type='submit' className="btn btn-danger">Log In</button>
                </form>
            </div>
            {showOTPForm &&  <div className='otpForm'>
            
                <Card className="card">
                <div className="x">
                    <button className="btn">
                        <strong>&#x2715;</strong>
                    </button>
                </div>
                    <h3>Please Input Your OTP Number</h3>
                    <Card.Body>
                        
                        <AuthCode containerClassName='otpContainer' inputClassName='otpInputContainer'></AuthCode>
                        <br></br>
                        <button className='btn btn-primary btn-sm'>Submit</button>
                        <a href="/">
                        <strong>Resend OTP</strong>
                </a>
                    </Card.Body>
                </Card>
            </div>}

        </div>

    )
}
