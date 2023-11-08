import React from 'react';
import '../App.css'; // Adjust the import statement to the correct path

const Welcome = () => {
    return (
        <div className="welcomeContainer">
            <h1 className="welcomeTitle">Welcome to Trendemics!</h1>
            <button className="welcomeButton">Get Started</button>
        </div>
    );
};

export default Welcome;
