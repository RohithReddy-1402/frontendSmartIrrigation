import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/">
                    <h1 className="text-white text-2xl font-bold">Smart Irrigation</h1>
                </Link>
                <div>
                    <Link to="/" className="text-white mx-2">Home</Link>
                    <Link to="/about" className="text-white mx-2">About Us</Link>
                    <Link to="/contact" className="text-white mx-2">Contact Us</Link>
                    <Link to="/sensor-data" className="text-white mx-2">Sensor Data</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 