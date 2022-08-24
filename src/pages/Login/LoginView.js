import "./LoginView.css";
import logo from "../../assets/images/narindo_logo_black.svg";
import React, { useEffect, useState } from "react";
import AuthCode from "react-auth-code-input";
import { Card } from "react-bootstrap";
import { Auth } from "two-step-auth";
import { useDeps } from "../../shared/context/DependencyContext";
import { useNavigate } from "react-router-dom";
import { Failed } from "../../shared/components/Notification/Failed";

export const LoginView = () => {
  const [email, setEmail] = useState("");
  const [showOTPForm, setShowOTPForm] = useState();
  const [OTP, setOTP] = useState();
  const [OTPInput, setOTPInput] = useState();
  const { userService } = useDeps();
  const navigate = useNavigate();
  
  useEffect(() => {
    validateEmail();
  }, []);

  

const validateEmail = async (e) => {
    e.preventDefault();
      try {
        const response = await userService.getUserByEmail(email);
        console.log('ini response email',response.data.email);
        setEmail(response.data.email)
        login(email);
        setShowOTPForm(true);
      } catch (error) {
       Failed('Email not registered yet, Please input a valid email')
      } finally {
        
      }
    
  };

  const login = async (emailAddress) => {
    const response = await Auth(emailAddress, "Narindo Asset Management");
    console.log(response);
    console.log(response.mail);
    console.log(response.OTP);
    console.log(response.success);
    setOTP(response.OTP);
  };

  const validateOTP = () => {
    console.log(OTPInput);
    if (OTPInput == OTP) {
        navigate('/home', {replace: true})
    } else {
      Failed('Wrong OTP')
    }
    setShowOTPForm(false);
  };

  return (
    <div className="rowContainerLogin">
      <div className="columnContainerLogin">
        <img src={logo} alt="logo"></img>
        <h4>ASSET MANAGEMENT</h4>
        <h5>Log In to Dashboard</h5>
        <h6>Enter your email below</h6>
        <form className="formContainer">
          <label>EMAIL</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email address"
          ></input>
          <button
            onClick={(e) => {
              validateEmail(e);
            }}
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
      {showOTPForm && (
        <div className="otpForm">
          <Card className="card">
            <div className="x">
              <button className="btn">
                <strong>&#x2715;</strong>
              </button>
            </div>
            <h3>Please Input Your OTP Number</h3>
            <Card.Body>
              <AuthCode
                onChange={(e) => {
                  setOTPInput(e);
                }}
                containerClassName="otpContainer"
                inputClassName="otpInputContainer"
              ></AuthCode>
              <br></br>
              <button onClick={validateOTP} className="btn btn-primary btn-sm">
                Submit
              </button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};
