import { useEffect, useState } from "react";

const SensorData = () => {
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://smartirrigationbackend.onrender.com/get-command");
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
        const interval = setInterval(fetchData, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: "100%",height:"50rem"}} className={"flex"}>
            <div style={{ width: "40%" ,height:"100%"}} className={"bg-pink-200"}>
            </div>
            <div style={{ width: "60%",height:"100%" }}>

            </div>
        </div>
    );
};

export default SensorData;
