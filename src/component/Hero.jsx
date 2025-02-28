import React from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    const navigateToSensorData = () => {
        navigate('/sensor-data');
    };

    return (
        <div className="hero h-screen flex flex-col justify-center items-center text-white relative">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-center">
                <h1 className="text-5xl font-bold mb-4">Smart Irrigation System</h1>
                <p className="text-xl mb-6">Optimize your irrigation with real-time data and control.</p>
                <button 
                    onClick={navigateToSensorData} 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default Hero; 