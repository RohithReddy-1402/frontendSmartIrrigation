import React from 'react';
import SensorData from './sensorData.jsx';

const SensorPage = () => {
    return (
        <div className="bg-image flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-3xl font-bold text-white mb-4">Sensor and Environmental Data</h2>
            <SensorData />
        </div>
    );
};

export default SensorPage; 