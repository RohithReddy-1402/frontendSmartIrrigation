import { useEffect, useState } from "react";
import DonutChart from "./test.jsx";
let data;
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
const SensorData = () => {
    const [sensorData, setSensorData] = useState([]);
    const [response,setResponse] = useState({});
    const [switchStates, setSwitchStates] = useState([false, false, false, false]);

    const handleClick = async (num) => {
        try {
            const updatedStates = [...switchStates];
            updatedStates[num] = !updatedStates[num];

            const res = await fetch("https://smartirrigationbackend.onrender.com/data-transfer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ switch:switchStates }),
            });

            setSwitchStates(updatedStates);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://smartirrigationbackend.onrender.com/get-command");
                if (!response.ok) throw new Error("Failed to fetch data");
                data = await response.json();
                // console.log(data[data.length - 1]);

                setSensorData(data[data.length-1].sensors || []);
                // console.log(data[data.length-1].sensors[0].temperature);
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 2000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div style={{width: "100%", height: "50rem"}} className={"flex"}>
            <div className="min-h-screen bg-gray-100 flex justify-center items-center">
                {/* Table Container */}
                <table className="border-collapse border border-gray-500 w-[500px] h-[500px]">
                    <tbody>
                    <tr className="border border-gray-500">
                        <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">

                            <DonutChart percentage={(() => {
                                try {
                                    return sensorData[0].moisture;
                                } catch (err) {
                                    return 0;
                                }
                            })()} />

                            <FormControlLabel
                                sx={{ display: 'block' }}
                                control={
                                    <Switch
                                        checked={switchStates[0]}
                                        onClick={()=>handleClick(0)}
                                        name="Pump"
                                        color="primary"
                                    />
                                }
                                label="Pump"
                            />
                        </td>
                        <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">
                            <DonutChart percentage={(() => {
                                try {
                                    return sensorData[0].moisture;
                                } catch (err) {
                                    return 0;
                                }
                            })()} />
                            <FormControlLabel
                                sx={{ display: 'block' }}
                                control={
                                    <Switch
                                        checked={switchStates[1]}
                                        onChange={()=>handleClick(1)}
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
                            <DonutChart percentage={(() => {
                                try {
                                    return sensorData[2].moisture;
                                } catch (err) {
                                    return 0;
                                }
                            })()} />

                            <FormControlLabel
                                sx={{ display: 'block' }}
                                control={
                                    <Switch
                                        checked={switchStates[2]}
                                        onClick={()=>handleClick(2)}
                                        name="Pump"
                                        color="primary"
                                    />
                                }
                                label="Pump"
                            />

                        </td>
                        <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">
                            <DonutChart percentage={(() => {
                                try {
                                    return sensorData[3].moisture;
                                } catch (err) {
                                    return 0;
                                }
                            })()} />

                            <FormControlLabel
                                sx={{ display: 'block' }}
                                control={
                                    <Switch
                                        checked={switchStates[3]}
                                        onClick={()=>handleClick(3)}
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

            <div style={{width: "60%", height: "100%"}}>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-2">Sensor ID</th>
                        <th className="px-4 py-2">Moisture</th>

                    </tr>
                    </thead>
                    <tbody>
                    {sensorData.length > 0 ? (
                        sensorData.map((sensor) => (
                            <tr key={sensor.id} className="border-b">
                                <td className="px-4 py-2 text-center">{sensor.id}</td>
                                <td className="px-4 py-2 text-center">{sensor.moisture}</td>

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

        </div>
    );
};

export default SensorData;
