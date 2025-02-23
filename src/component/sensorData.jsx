import { useEffect, useState } from "react";

const SensorData = () => {
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://9fx3gmg3-3000.inc1.devtunnels.ms/get-command");
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                // console.log(data[data.length - 1]);
                setSensorData(data[data.length-1].sensors || []);
                // console.log(data[data.length-1].sensors);
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000); // Refresh every 2 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Sensor Data</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="px-4 py-2">Sensor ID</th>
                    <th className="px-4 py-2">Temperature (°C)</th>
                    <th className="px-4 py-2">Humidity (%)</th>
                </tr>
                </thead>
                <tbody>
                {sensorData.length > 0 ? (
                    sensorData.map((sensor) => (
                        <tr key={sensor.id} className="border-b">
                            <td className="px-4 py-2 text-center text-black">{sensor.id}</td>
                            <td className="px-4 py-2 text-center text-black">{sensor.temperature}</td>
                            <td className="px-4 py-2 text-center text-black">{sensor.humidity}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="3" className="px-4 py-2 text-center">
                            No Data Available
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default SensorData;
