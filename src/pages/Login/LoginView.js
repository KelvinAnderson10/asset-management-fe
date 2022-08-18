import './LoginView.css'
import logo from '../../assets/images/narindo_logo_black.svg';
import React, { useEffect, useState } from 'react'
import AuthCode from 'react-auth-code-input';
import { Card } from 'react-bootstrap'
import { Auth } from 'two-step-auth';


export const LoginView =  () => {
    const [email, setEmail] = useState('')
    const [showOTPForm, setShowOTPForm] = useState()
    const [OTP, setOTP] = useState()
    const [OTPInput, setOTPInput] = useState()

    const validateEmail = async (e) => {
        // hardcode
        if (email !== 'kelvinanders17@gmail.com'){
            e.preventDefault()
            alert("Email not registered yet, Please input a valid email")
        }else{
            e.preventDefault()
            try {
                await login(email)
            } catch (error) {
                alert(error)
            } finally{
                setShowOTPForm(true)
            }
        }
    }

    const login = async (emailAddress) => {
        const response = await Auth(emailAddress, "Narindo Asset Management")
        console.log(response);
        console.log(response.mail);
        console.log(response.OTP);
        console.log(response.success);
        setOTP(response.OTP)
    }

    const validateOTP = () => {
        console.log(OTPInput);
        if (OTPInput == OTP) {
            alert("Redirected to homepage")
        }else{
            alert("Wrong OTP")
        }
        setShowOTPForm(false)
    }


    return (
        <div className='rowContainerLogin'>
            <div>Test</div>
            <div className='columnContainerLogin'>
                <img src={logo} alt='logo'></img>
                <p>ASSET MANAGEMENT</p>
                <h4>Log In to Dashboard</h4>
                <h6>Enter your email below</h6>
                <form className='formContainer'>
                    <label>EMAIL</label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='kelvinanders17@gmail.com' ></input>
                    <button onClick={(e) => {validateEmail(e)}} type='submit'>Log In</button>
                </form>
            </div>
            {showOTPForm &&  <div className='otpForm'>
                <Card className="card">
                    <h3>Please Input Your OTP Number</h3>
                    <Card.Body>
                        <AuthCode onChange={(e) => {setOTPInput(e)}} containerClassName='otpContainer' inputClassName='otpInputContainer'></AuthCode>
                        <br></br>
                        <button onClick={validateOTP} className='btn btn-primary btn-sm'>Submit</button>
                    </Card.Body>
                </Card>
            </div>}

        </div>

    )
}
