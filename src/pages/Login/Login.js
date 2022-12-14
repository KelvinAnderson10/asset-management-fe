import React, { useEffect, useState } from "react";
import logo from "../../assets/images/narindo_logo_black.svg";
import { Auth } from "two-step-auth";
import { useDeps } from "../../shared/context/DependencyContext";
import { useNavigate, Navigate } from "react-router-dom";
import { Failed } from "../../shared/components/Notification/Failed";
import "./Login.css";
import AuthCode from 'react-auth-code-input';
import { Card } from "react-bootstrap";
import { useAuth } from "../../services/UseAuth";
import Loading from "../../shared/components/Loading/Loading";
import { useRef } from "react";
import background from "../../assets/images/img.svg"
import { TypeAnimation } from 'react-type-animation';
import icon from '../../assets/images/3075759.jpg';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [showOTPForm, setShowOTPForm] = useState();
  const [counter, setCounter] = useState(59);
  const [isDisabled, SetIsDisabled] = useState(true)
  const [buttonDisabled, setButttonDisabled] = useState(false)
  const [OTP, setOTP] = useState();
  const [OTPInput, setOTPInput] = useState('');
  const { userService } = useDeps();
  const navigate = useNavigate();
  const { setCookie } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [errDisabled, setErrDisabled] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [clearOtp, setClearOtp] = useState();
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
      console.log(response.otp)
      setCounter(59);
      SetIsDisabled(true)
      setShowOTPForm(true);
      setErrDisabled(false)
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
        // setOTP()
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
      console.log('resend otp', response.otp);
      setCounter(59);
      setShowOTPForm(true);
      SetIsDisabled(true)
      setErrMsg('')
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
      if (counter === 0) {
        setOTP()
        SetIsDisabled(false)
        if (OTPInput !== OTP) {
          setOTPInput('')
          const resetKey = Math.random().toString().slice(0.8)
          setClearOtp(resetKey)
          setErrDisabled(true);
          setErrMsg('Wrong OTP! Please input valid OTP.')
        }
      } else {
        if (OTPInput == OTP) {
          setCookie("user",user,200)
        } else {
          // Failed("Wrong OTP");
          setOTPInput('')
          const resetKey = Math.random().toString().slice(0.8)
          setClearOtp(resetKey)
          setErrDisabled(true);
          setErrMsg('Wrong OTP! Please input valid OTP.')
        }
      }
      // setShowOTPForm(false);
    }
    
  };

  const handleExit = () => {
    setShowOTPForm(false);
  };

  // document.querySelector("body").style.overflow = "auto";
  return (
    
    
  
    <div>
      {getCookie("user") &&  <Navigate to='/main'></Navigate>}

      <div className="body-login">
        <div className='bg'>
          <div className='container-login'>
            <div className='white-container'>
              <div className='left-container'>
                <div className='carousel-div'>
                <img src={icon} width={'110%'} height={'85%'}></img>
                <div className="tagline">
                    <h2 style={{textAlign: 'center', marginBottom: '12px', fontSize: '24px', fontFamily: 'Poppins', fontWeight: '600'}}>Manage Your Asset</h2>
                    <TypeAnimation
                      // Same String at the start will only be typed once, initially
                      sequence={[
                      'EFFICIENTLY',
                      2000,
                      'EXCELLENTLY',
                      2000,
                      'EFFECTIVELY',
                      2000,
                      ]}
                      speed={40} // Custom Speed from 1-99 - Default Speed: 40
                      style={{fontWeight: 'bolder', fontSize: '1.5em', width: '220px', textAlign: 'center' , backgroundColor: '#bd1722', color:'white', paddingLeft:'10px', borderRadius: '5px'}}
                      wrapper="span" // Animation will be rendered as a <span>
                      repeat={Infinity} // Repeat this Animation Sequence infinitely
                    />
                </div>
                </div>
              </div>
              <div className='right-container'>
                <img src={logo} width={'40%'} height={'12%'}></img>
                <div className="title-h1">Welcome to Namaste!</div>
                <p id='login-txt'>Login to your account</p>
                <p id='email'>Email</p>
                <input className='input' placeholder='Email Address' required=""
                    onChange={(e) => setEmail(e.target.value)}></input>
                <button className='login-btn' onClick={(e) => {
                      validateEmail(e);
                    }}><span>Login</span></button>
              </div>
            </div>
          </div>
          </div>
        {/* <div className="row">
          <div className="col-lg-8 col-md-5 d-none d-md-block image-container">
            <div>
        
            </div>
          </div>
          <div className="col-lg-4 col-md-7 form-container">
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
        </div> */}
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
              <h3 style={{textAlign: 'center'}}>OTP Verification</h3>
              <h5> Enter the OTP sent to your email</h5>
              {errDisabled && 
                <>
                  <div className="text-err">{errMsg} 
                  </div>
                </>
                }
              <Card.Body>
                <AuthCode
                  onChange={(e) => {
                    setOTPInput(e);
                  }}
                  containerClassName="otpContainer"
                  inputClassName="otpInputContainer"
                  allowedCharacters="numeric"
                  key={clearOtp}
                ></AuthCode>
                <h6 className="message-otp">If you cant'find the OTP in your inbox, please check your spam folder</h6>
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
