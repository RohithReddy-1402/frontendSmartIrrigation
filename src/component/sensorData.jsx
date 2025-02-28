import { useEffect, useState, useRef } from "react";
import DonutChart from "./test.jsx";
let data;
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

let temp_val=0;
let perciptate_val=0;
let humidity_val=0;

const temp = async () => {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=29.9534804&lon=76.8146376&appid=89426cce37c0080d35b7780c2b4bfe1f");
        if (!response.ok) throw new Error("Failed to fetch data");
        data = await response.json();

        temp_val=data.main.temp;
        perciptate_val = data.rain?.["1h"] || 0;
        humidity_val=data.main.humidity||0;
        


    } catch (error) {
        console.error("Error fetching sensor data:", error);
    }
};

temp()
const SensorData = () => {
    const [sensorData, setSensorData] = useState([
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0],
    ]);
    const [buttonState, setButtonState] = useState([false,false,false,false]);
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
        <>
            <div className="flex justify-center text-3xl title">
                <h1 className="backdrop-blur" style={{ width: "max-content" }}>Smart Irrigation</h1>
            </div>

            <div
                className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-center lg:h-[50rem] p-4">

                <div className="min-h-screen flex justify-center text-white items-center rounded-xl lg:-mt-16">
                    <table
                        className="border-collapse border  w-[90%] sm:w-[500px] h-auto sm:h-[500px]  bg-black/10 backdrop-blur-sm rounded-xl text-sm sm:text-base">
                        <tbody>
                        <tr className="border border-gray-500">
                            <td className="border border-gray-500 p-4 w-[50%] sm:w-[250px] h-[200px] sm:h-[250px] text-center">
                                <h1 className="text-xs sm:text-base">Crop-1</h1>
                                <DonutChart percentage={sensorData[0]?.[1] || 0} name="Crop-1"/>
                                <FormControlLabel
                                    sx={{display: "block"}}
                                    control={
                                        <Switch checked={buttonState[0]} onClick={() => handleClick(0)} name="Pump"
                                                color="primary"/>
                                    }
                                    label="Pump"
                                />
                            </td>
                            <td className="border border-gray-500 p-4 w-[50%] sm:w-[250px] h-[200px] sm:h-[250px] text-center">
                                <h1 className="text-xs sm:text-base">Crop-2</h1>
                                <DonutChart percentage={sensorData[1]?.[1] || 0} name="Crop-2"/>
                                <FormControlLabel
                                    sx={{display: "block"}}
                                    control={
                                        <Switch checked={buttonState[1]} onClick={() => handleClick(1)} name="Pump"
                                                color="primary"/>
                                    }
                                    label="Pump"
                                />
                            </td>
                        </tr>
                        <tr className="border border-gray-500">
                            <td className="border border-gray-500 p-4 w-[50%] sm:w-[250px] h-[200px] sm:h-[250px] text-center">
                                <h1 className="text-xs sm:text-base">Crop-3</h1>
                                <DonutChart percentage={sensorData[2]?.[1] || 0} name="Crop-3"/>
                                <FormControlLabel
                                    sx={{display: "block"}}
                                    control={
                                        <Switch checked={buttonState[2]} onClick={() => handleClick(2)} name="Pump"
                                                color="primary"/>
                                    }
                                    label="Pump"
                                />
                            </td>
                            <td className="border border-gray-500 p-4 w-[50%] sm:w-[250px] h-[200px] sm:h-[250px] text-center">
                                <h1 className="text-xs sm:text-base">Crop-4</h1>
                                <DonutChart percentage={sensorData[3]?.[1] || 0} name="Crop-4"/>
                                <FormControlLabel
                                    sx={{display: "block"}}
                                    control={
                                        <Switch checked={buttonState[3]} onClick={() => handleClick(3)} name="Pump"
                                                color="primary"/>
                                    }
                                    label="Pump"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="w-full lg:w-3/5 ">
    <table className="border border-gray-300 rounded-lg bg-black/10 backdrop-blur-sm shadow-md text-white w-auto mx-auto">
        <tbody>
            <tr className="border-b border-gray-300">
                <td className="p-6 flex justify-center items-center min-w-[150px] min-h-[150px]">
                    <DonutChart percentage={Math.floor(temp_val - 273)} name="Temperature"/>
                </td>
            </tr>
            <tr className="border-b border-gray-300">
                <td className="p-6 flex justify-center items-center min-w-[150px] min-h-[150px]">
                    <DonutChart percentage={perciptate_val} name="Precipitate"/>
                </td>
            </tr>
            <tr>
                <td className="p-6 flex justify-center items-center min-w-[150px] min-h-[150px]">
                    <DonutChart percentage={humidity_val} name="Humidity"/>
                </td>
            </tr>
        </tbody>
    </table>
</div>







            </div>

        </>
    );


};

export default SensorData;
