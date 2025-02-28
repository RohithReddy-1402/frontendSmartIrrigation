import { Route, Routes } from 'react-router-dom';
import Navbar from "./component/Navbar.jsx";
import Hero from "./component/Hero.jsx";
import SensorPage from "./component/SensorPage.jsx";
import AboutUs from "./component/AboutUs.jsx";
import ContactUs from "./component/ContactUs.jsx";
import Footer from "./component/Footer.jsx";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/sensor-data" element={<SensorPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
