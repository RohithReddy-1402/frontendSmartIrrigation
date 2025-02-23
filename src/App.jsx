import DonutChart from "./component/test.jsx";

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            {/* Table Container */}
            <table className="border-collapse border border-gray-500 w-[500px] h-[500px]">
                <tbody>
                <tr className="border border-gray-500">
                    <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">
                        <DonutChart percentage={56}/>
                    </td>
                    <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">
                        <DonutChart percentage={20}/>
                    </td>
                </tr>
                <tr className="border border-gray-500">
                    <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">
                        <DonutChart percentage={100}/>
                    </td>
                    <td className="border border-gray-500 p-4 w-[250px] h-[250px] text-center">
                        <DonutChart percentage={90}/>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
