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
import { responsiveProperty } from "@mui/material/styles/cssUtils";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [showOTPForm, setShowOTPForm] = useState();
  const [counter, setCounter] = useState(0);
  const [isDisabled, SetIsDisabled] = useState(true)
  const [buttonDisabled, setButttonDisabled] = useState(false)
  const [OTP, setOTP] = useState();
  const [OTPInput, setOTPInput] = useState('');
  const { userService } = useDeps();
  const navigate = useNavigate();
  const { setCookie } = useAuth();
  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useState({
    name:'',
    role:'',
    level_approval:'',
    location_id:'',
    tap:'',
    cluster:'',
    department: ''
  })

  const validateEmail = async (e) => {
    setLoading(true)
   e.preventDefault()
    try {
      const response = await userService.getUserByEmail(email); 
      setEmail(response.data.email);
      setUser(prevObj=>({...prevObj,name:(response.data.name), role:(response.data.role), level_approval:(response.data.level_approval), location_id:(response.data.location_id), tap:(response.data.TAP), cluster:(response.data.Cluster), department:(response.data.department)}))
      setOTP(response.otp);
      setCounter(59);
      setShowOTPForm(true);
    } catch (error) {
      Failed("Email not registered yet, Please input a valid email");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
      const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
      if (counter === 0 ) {
        SetIsDisabled(false)
      } 
      return () => clearInterval(timer);
  }, [counter])

  const resendOtp = async () => {
    // setLoading(true)
    setButttonDisabled(true)
    try {
      const response = await userService.getUserByEmail(email); 
      setEmail(response.data.email);
      setUser(prevObj=>({...prevObj,name:(response.data.name), role:(response.data.role), level_approval:(response.data.level_approval), location_id:(response.data.location_id), tap:(response.data.TAP), cluster:(response.data.Cluster), department:(response.data.department)}))
      setOTP(response.otp);
      setCounter(59);
      setShowOTPForm(true);
      SetIsDisabled(true)
    } catch (e) {
      Failed("Email not registered yet, Please input a valid email");
    } finally{
      setButttonDisabled(false)
    }
  }

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
  useEffect(()=>{
    validateOTP();
  },[OTPInput])

  const validateOTP = () => {
    if(OTPInput.length === 6){
      if (OTPInput == OTP) {
        setCookie("user",user,200)
      } else {
        Failed("Wrong OTP");
      }
      setShowOTPForm(false);
    }
    
  };

  const handleExit = () => {
    setShowOTPForm(false);
  };

  document.querySelector("body").style.overflow = "auto";
  return (
    
  
    <div>
      {getCookie("user") &&  <Navigate to='/main'></Navigate>}

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
                  allowedCharacters="numeric"
                ></AuthCode>
                <h6 className="message">If you cant'find the OTP in your inbox, please check your spam folder</h6>
                <div className="counter">
                  00:{counter}
                </div>
                {!isDisabled && 
                <>
                  <div className="text-otp">OTP not received? 
                    <button className="btn btn-link" disabled={buttonDisabled} onClick={resendOtp}>Resend</button>
                  </div>
                  
                </>
                }
              </Card.Body>
            </Card>
          </div>
        )}
        {isLoading && <Loading/> }
      </div>
    </div>
                
  );
};
