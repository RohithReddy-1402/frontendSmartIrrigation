import DonutChart from "./test.jsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

<div className={"flex justify-center  pt-8 text-3xl"}><h1 className={"backdrop-blur"}
                                                          style={{width: "max-content"}}>Smart
    Irrigation</h1></div>
<div style={{width: "100%", height: "50rem"}} className={"flex"}>


    <div className="min-h-screen  flex justify-center text-white items-center rounded-xl -mt-16">

        <table
            className="border-collapse border border-gray-500 w-[500px] h-[500px] backdrop-blur-sm rounded-xl">
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
                        sx={{display: 'block'}}
                        control={
                            <Switch
                                checked={buttonState[0]}
                                onClick={() => handleClick(0)}
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
                    })()} name={"Crop-2"}/>
                    <FormControlLabel
                        sx={{display: 'block'}}
                        control={
                            <Switch
                                checked={buttonState[1]}
                                onClick={() => handleClick(1)}
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

    <div style={{width: "60%", height: "100%"}}>
        <div className={"flex-col mt-16 backdrop-blur text-white"}
             style={{height: "30%", marginLeft: "80% "}}>
            <DonutChart percentage={Math.floor(temp_val - 273)} name={"Temperature"}/>
            <DonutChart percentage={perciptate_val} name={"Percipitate"}/>
            <DonutChart percentage={humidity_val} name={"Humidity"}/>
        </div>
        <div>

        </div>
    </div>


</div>