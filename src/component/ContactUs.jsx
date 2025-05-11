import React from 'react';

const ContactUs = () => {
    const handleEmailClick = () => {
        const recipient = "r14v18@gmail.com";
        const subject = "Inquiry";
        const body = "Hello, I would like to ask about your product ";
        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.open(gmailUrl, "_blank");
  };
    return (
        <div className="h-screen bg-image flex flex-col items-center justify-center text-white">
            <div className="bp text-center md:w-3/5 w-11/12 h-2/5" >
                <h1 className="text-4xl font-bold mt-8  mb-4">Contact Us</h1>
                <p className="md:text-2xl text-lg w-full mt-32">
                For inquiries, please reach out to us at:{" "}
                <a  onClick={handleEmailClick} className="text-blue-400 text-center underline">
                    hackbytech@gmail.com
                </a>
                </p>
            </div>
        </div>


    );
};

export default ContactUs; 