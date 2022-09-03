import React, { useEffect, useState } from "react";
import logo from "../../assets/images/narindo_logo_black.svg";
import { Auth } from "two-step-auth";
import { useDeps } from "../../shared/context/DependencyContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Failed } from "../../shared/components/Notification/Failed";
import "./Login.css";
import AuthCode from "react-auth-code-input";
import { Card } from "react-bootstrap";
import { useAuth } from "../../services/UseAuth";
import Loading from "../../shared/components/Loading/Loading";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [showOTPForm, setShowOTPForm] = useState();
  const [OTP, setOTP] = useState();
  const [OTPInput, setOTPInput] = useState();
  const { userService } = useDeps();
  const navigate = useNavigate();
  const { setCookie } = useAuth();
  const [isLoading, setLoading] = useState(false)
  



  const validateEmail = async (e) => {
    setLoading(true)
   e.preventDefault()
    try {
      const response = await userService.getUserByEmail(email); 
      setEmail(response.data.email);
      setOTP(response.otp);
      setShowOTPForm(true);
    } catch (error) {
      Failed("Email not registered yet, Please input a valid email");
    } finally {
      console.log("ini OTP",OTP)
      setLoading(false)
    }
  };

 

  const getCookie = (cName) => {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded .split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })

    return (res)
}

  const validateOTP = () => {
    if (OTPInput == OTP) {
      setCookie("OTP", OTP, 90);
    } else {
      Failed("Wrong OTP");
    }
    setShowOTPForm(false);
  };

  const handleExit = () => {
    setShowOTPForm(false);
  };

  return (
    
  
    <div>
      {getCookie("OTP") &&  <Navigate to='/main'></Navigate>}

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-9 col-md-5 d-none d-md-block image-container">
            <h1>MAKE YOUR</h1>
          <h2>WORK EASIER</h2>
          </div>
          <div className="col-lg-3 col-md-7 form-container">
            <div className="col-lg-10 col-md-12 col-sm-9 col-xs-12 form-box">
              <div className="logo">
                <img src={logo} alt="logo"/>
              </div>

              <h2>ASSET MANAGEMENT</h2>

              <h4>LOGIN TO DASHBOARD</h4>
              <h6>Enter your email below</h6>
              <form>
                <div className="form-input">
                  <span>
                    <i className="fa fa-envelope" />
                  </span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    required=""
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-6 d-flex">
                    <div className="custom-control custom-checkbox"></div>
                  </div>
                </div>
                <div className="text-left mb-3">
                  <button
                    type="submit"
                    className="btn"
                    onClick={(e) => {
                      validateEmail(e);
                    }}
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showOTPForm && (
          <div className="otpForm">
            <Card className="card">
              <div className="x">
                <button
                  value="submit"
                  className="btn btn-danger otp-button"
                  onClick={handleExit}
                >
                  <i className="fa fa-times"></i>
                </button>
              </div>
              <h3>OTP Verification</h3>
              <h5> Enter the OTP sent to your email</h5>
              <Card.Body>
                <AuthCode
                  onChange={(e) => {
                    setOTPInput(e);
                  }}
                  containerClassName="otpContainer"
                  inputClassName="otpInputContainer"
                ></AuthCode>
                <h6 className="message">If you cant'find the OTP in your inbox, please check your spam folder</h6>
                <button type="submit" onClick={validateOTP} className="btn">
                
                  SUBMIT
                </button>
              </Card.Body>
            </Card>
          </div>
        )}
        {isLoading && <Loading/> }
      </div>
    </div>
                
  );
};
