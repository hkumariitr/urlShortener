import React from "react";
import "./LandingPage.css"
import { Link } from "react-router-dom";
const LandingPage = ()=>{
    return(
    <div className="main-landing-container">
        <div className="sub-container">
            <div className="main-head">
                Welcome to URL Shortener
            </div>
            <Link to = "/register" className="link">
                <button className="btn Register">
                    Register 
                </button>
            </Link>
            <Link to = "/login" className="link">
                <button className="btn Login">
                    Login 
                </button>
            </Link>
        </div>
    </div>
    )
}

export default LandingPage;