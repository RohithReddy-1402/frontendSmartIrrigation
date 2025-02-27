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
            prevMotorState.current = buttonState; // ✅ Update previous state AFTER API call
        }
    }, [buttonState]);
    

    return (
        <>
            <div className={"flex justify-center  pt-8 text-3xl"}><h1  className={"backdrop-blur"} style={{width:"max-content"}}>Smart Irrigation</h1></div>
    <div style={{width: "100%", height: "50rem"}} className={"flex"}>




            <div className="min-h-screen  flex justify-center text-white items-center rounded-xl -mt-16">

                <table className="border-collapse border border-gray-500 w-[500px] h-[500px] backdrop-blur-sm rounded-xl" >
                    <tbody>
                    <tr className="border border-gray-500">
                        <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">
                            <h1 className={"-ml-48"}>Crop-1</h1>
                            <DonutChart percentage={(() => {
                                try {
                                    return sensorData[0][1];
                                } catch (err) {
                                    return 0;
                                }
                            })()} name={"Crop-1"}/>

                            <FormControlLabel
                                sx={{ display: 'block' }}
                                control={
                                    <Switch
                                        checked={buttonState[0]}
                                        onClick={()=>handleClick(0)}
                                        name="Pump"
                                        color="primary"
                                    />
                                }
                                label="Pump"
                            />
                        </td>
                        <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">
                            <h1 className={"-ml-48"}>Crop-2</h1>
                            <DonutChart percentage={(() => {
                                try {
                                    return sensorData[1][1];
                                } catch (err) {
                                    return 0;
                                }
                            })()} name={"Crop-2"} />
                            <FormControlLabel
                                sx={{ display: 'block' }}
                                control={
                                    <Switch
                                        checked={buttonState[1]}
                                        onClick={()=>handleClick(1)}
                                        name="Pump"
                                        color="primary"
                                    />
                                }
                                label="Pump"
                            />

                        </td>
                    </tr>
                    <tr className="border border-gray-500">
                        <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">
                            <h1 className={"-ml-48"}>Crop-3</h1>
                            <DonutChart percentage={(() => {
                                try {
                                    return sensorData[2][1];
                                } catch (err) {
                                    return 0;
                                }
                            })()} name={"Crop-3"}/>

                            <FormControlLabel
                                sx={{display: 'block'}}
                                control={
                                    <Switch
                                        checked={buttonState[2]}
                                        onClick={() => handleClick(2)}
                                        name="Pump"
                                        color="primary"
                                    />
                                }
                                label="Pump"
                            />

                        </td>
                        <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">

                            <h1 className={"-ml-48"}>Crop-4</h1>
                            <DonutChart percentage={(() => {
                                try {
                                    return sensorData[3][1];
                                } catch (err) {
                                    return 0;
                                }
                            })()} name={"Crop-4"}/>

                            <FormControlLabel
                                sx={{display: 'block'}}
                                control={
                                    <Switch
                                        checked={buttonState[3]}
                                        onClick={() => handleClick(3)}
                                        name="Pump"
                                        color="primary"
                                    />
                                }
                                label="Pump"
                            />

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div style={{width: "60%", height: "100%"}} >
                <div className={"flex-col mt-16 backdrop-blur text-white"} style={{height:"30%",marginLeft:"80% "}}>
                <DonutChart percentage={Math.floor(temp_val-273)} name={"Temperature"}/>
                <DonutChart percentage={perciptate_val} name={"Percipitate"}/>
                    <DonutChart percentage={humidity_val} name={"Humidity"}/>
                </div>
                <div>

                </div>
            </div>


    </div>
        </>
    );

    
};

export default SensorData;
