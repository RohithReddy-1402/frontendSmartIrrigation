import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
const Navbar = () => {
    const [isMenuOpen,setIsMenuOpen]=useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    document.getElementById('sidenav').style.display = isMenuOpen ? 'none' : 'block';

  };
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto md:flex justify-between items-center">
                <Link to="/">
                    <h1 className="head text-2xl font-bold">Smart Irrigation</h1>
                </Link>
                <div className='items hidden md:flex gap-14'>
                    <ul>
                        <li><Link to="/" className=" mx-2">Home</Link></li>
                        <li><Link to="/about" className=" mx-2">About Us</Link></li>
                        <li><Link to="/contact" className=" mx-2">Contact Us</Link></li>
                        <li><Link to="/sensor-data" className=" mx-2">Sensor Data</Link></li>
                    </ul>
                </div>
                <div className='md:hidden absolute right-4 top-5'>
                    <button onClick={toggleMenu} className="text-white">
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <div id='sidenav' className="md:hidden absolute  z-[1000]  bg-red " style={{width:"100%",height:"100%"}}>
                    <div className="items absolute right-16">
                        <ul className='flex-col'>
                            <li>Home </li>
                            <li>About Us</li>
                            <li>Sensor Data</li>
                            <li>Contact Us</li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 