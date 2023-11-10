import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Welcome = () => {
    let navigate = useNavigate();

    const navigateToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <div className="welcomeContainer">
            <h1 className="welcomeTitle">Welcome to Trendemics!</h1>
            <button className="welcomeButton" onClick={navigateToDashboard}>Get Started</button>
        </div>
    );
};

export default Welcome;