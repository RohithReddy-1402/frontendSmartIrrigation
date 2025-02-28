import React from 'react';

const ContactUs = () => {
    return (
        <div className="bg-image flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-center max-w-2xl">
                For inquiries, please reach out to us at: <a href="mailto:info@example.com" className="text-blue-400">info@example.com</a>
            </p>
        </div>
    );
};

export default ContactUs; 