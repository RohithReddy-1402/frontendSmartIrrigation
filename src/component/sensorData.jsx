import { useEffect, useState, useRef } from "react";
import DonutChart from "./test.jsx";
import PumpControl from "./PumpControl.jsx";

let temp_val = 0;
let perciptate_val = 0;
let humidity_val = 0;

const temp = async () => {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=29.9534804&lon=76.8146376&appid=89426cce37c0080d35b7780c2b4bfe1f");
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();

        temp_val = data.main.temp;
        perciptate_val = data.rain?.["1h"] || 0;
        humidity_val = data.main.humidity || 0;
    } catch (error) {
        console.error("Error fetching sensor data:", error);
    }
};

temp();

const SensorData = () => {
    const [sensorData, setSensorData] = useState([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
    ]);
    const [buttonState, setButtonState] = useState([false, false, false, false]);
    const prevMotorState = useRef(buttonState);

    const sendData = async () => {
        try {
            const response = await fetch("https://9fx3gmg3-3000.inc1.devtunnels.ms/motor-post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(buttonState),
            });

            if (response.ok) {
                console.log("Data sent successfully!");
            } else {
                console.error("Error sending data:", response.statusText);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const handleClick = (index) => {
        setButtonState(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[index] = !newStatus[index];
            return newStatus;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://9fx3gmg3-3000.inc1.devtunnels.ms/get-command");
                if (!response.ok) throw new Error("Failed to fetch data");

                const data = await response.json();
                setSensorData(data);
                setButtonState((prevState) => {
                    const updatedMotorStates = data.map(([id, value]) => {
                        if (value >= 85) return false;
                        if (value <= 30) return true;
                        return prevState[id];
                    });

                    if (JSON.stringify(prevState) !== JSON.stringify(updatedMotorStates)) {
                        console.log("Updating motor state:", updatedMotorStates);
                        return updatedMotorStates;
                    }
                    return prevState;
                });
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (JSON.stringify(buttonState) !== JSON.stringify(prevMotorState.current)) {
            console.log("Sending motor-post API with:", buttonState);
            sendData();
            prevMotorState.current = buttonState;
        }
    }, [buttonState]);

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-4 mt-8">Sensor Data</h2>
            <div className="flex flex-wrap justify-center mb-8">
                {sensorData.map((sensor, index) => (
                    <div key={index} className="bg-black/10 backdrop-blur-sm rounded-lg border border-gray-500 m-4 p-4 w-64 h-64 flex flex-col items-center">
                        <h1 className="text-lg font-bold">Crop-{index + 1}</h1>
                        <DonutChart percentage={sensor[1]} name={`Crop-${index + 1}`} />
                        <div className="mt-2">
                            <PumpControl 
                                isActive={buttonState[index]} 
                                onToggle={() => handleClick(index)} 
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Environmental Data Section */}
            <h2 className="text-3xl font-bold text-white mb-4 mt-8">Environmental Data</h2>
            <div className="flex flex-wrap justify-center">
                <div className="bg-black/10 backdrop-blur-sm rounded-lg border border-gray-500 m-4 p-4 w-64 h-64 flex flex-col items-center">
                    <h1 className="text-lg font-bold">Temperature</h1>
                    <DonutChart percentage={Math.floor(temp_val - 273)} name="Temperature" />
                </div>
                <div className="bg-black/10 backdrop-blur-sm rounded-lg border border-gray-500 m-4 p-4 w-64 h-64 flex flex-col items-center">
                    <h1 className="text-lg font-bold">Precipitate</h1>
                    <DonutChart percentage={perciptate_val} name="Precipitate" />
                </div>
                <div className="bg-black/10 backdrop-blur-sm rounded-lg border border-gray-500 m-4 p-4 w-64 h-64 flex flex-col items-center">
                    <h1 className="text-lg font-bold">Humidity</h1>
                    <DonutChart percentage={humidity_val} name="Humidity" />
                </div>
            </div>
        </div>
    );
};

export default SensorData;
