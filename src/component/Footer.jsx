import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 p-4 ">
            <div className="container mx-auto text-center text-white">
                <p>&copy; {new Date().getFullYear()} Smart Irrigation. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer; 