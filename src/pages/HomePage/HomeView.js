import React from "react";
import { useNavigate } from "react-router-dom";
import '../HomePage/HomeView.css'
import logo from '../../assets/images/default.png'
import { useAuth } from "../../services/UseAuth";

export const HomeView = () => {
    const navigate = useNavigate();
    const onButton = () => {
      navigate('/main', {replace: true})
    }

    const { eraseCookie } = useAuth()

    const onLogout = () => {
    eraseCookie("OTP")
    navigate('/', {replace: true})
    } 

    return (
        <div className="home-container">
            <div className= "home-header">
                <img src={logo}></img>
                <p onClick={onLogout}>Logout</p> 
            </div>
            <div className= "home-box">
                <div className= "outlier"/>
                    <div className= "image-box">
                        <p style={{'top':'35vh'}}>ASSET</p>
                        <p style={{'top':'48vh'}}>MANAGEMENT</p>
                    </div>
            </div>
            <button className="home-button" onClick={onButton}>
                <p>Click to continue</p>
            </button>
        </div>
    )
}