import React from 'react'
import { Link } from 'react-router-dom'

import BackgroundImage from '../../assets/images/bg.png';
import homeLogo from '../../assets/images/Home_HAL_logo.png';
import './page.css'

export default function LandingPage() {
    console.log("landing page");
    return (
        <header style={ HeaderStyle } className='login'>
            <div className="headerimg text-center">
                <img src={homeLogo} alt=""/>
            </div>
            <h1 className="main-title text-center">Welcome to HAL Smart Township</h1>
            <p className="main-para text-center">login / register</p>
            <div className="buttons text-center">
                <Link to="/admin">
                    <button className="primary-button reg_btn" ><span>Admin </span></button>
                </Link>
                <Link to="/user">
                    <button className="primary-button reg_btn" ><span>User </span></button>
                </Link>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    background: `url(${BackgroundImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}

