import React from "react";
import { useNavigate } from "react-router-dom";
import '../HomePage/HomeView.css'

export const HomeView = () => {
    const navigate = useNavigate();
    const onButton = () => {
      navigate('/main', {replace: true})
    }

    const onLogout = () => {
        navigate('/', {replace: true})
    }
    return (
        <div className="home-container">
            <div className= "home-header">
                <img src='.../../src/assets/images/default.png'/>
                <div className="home-header-right">
                    <p>Home</p>
                    <p onClick={onLogout}>Logout</p> 
                </div>
            </div>
            <div className= "home-box">
                <div className= "outlier"/>
                    <div className= "image-box">
                        <p style={{'top':'400px'}}>ASSET</p>
                        <p style={{'top':'550px'}}>MANAGEMENT</p>
                    </div>
            </div>
            <button className="home-button" onClick={onButton}>
                <p>Manage your asset</p>
            </button>
        </div>
    )
}