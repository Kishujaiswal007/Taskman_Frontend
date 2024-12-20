import { useState, useEffect } from "react";
import axios from "axios";
import Box from "../component/Box";
import Card from "../component/navbar";
const api=import.meta.env.VITE_BACKEND_API;

const Dashboard = () => {
    const [task, settask] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://taskman-backend-ii9p.onrender.com/dashboard",{
                    headers: {
                      "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
                    },
                    withCredentials:true
                });
                settask(response.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

const obj=task.dashboardstats;

    return (
        <>
        {<Card/>}
        <div>
            <p className="text-[30px] font-bold pl-10">Dashboard</p>
        <div className="p-10 grid sm:grid-cols-4 grid-cols-1 gap-10">
            {<Box name={"TotalTask"} value={task.totalTasks}/>}
            {<Box name={"Task Completed"} value={`${task.completedPercent} %`}/>}
            {<Box name={"Task Pending"} value={`${task.pendingPercent}%`}/>}
            {<Box name={"Average time per completed task"} value={`${task.avgCompletionTime}%`}/>}
        </div>
        <p className="text-[30px] font-bold pl-10">Pending Task Summery</p>
        <div className="p-10 grid sm:grid-cols-4 grid-cols-1 gap-10">
            {<Box name={"Pending Tasks"} value={task.pendingTasks}/>}
            {<Box name={"Total Time Lapsed"} value={`${task.timeLapsed} Hr`}/>}
            {<Box name={"Total time left"} value={`${task.timeLeft}Hr`}/>}
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Task Prioriry</th>
                <th className="p-2">pending Task</th>
                <th className="p-2">Time Lapsed</th>
                <th className="p-2">Time To finish</th>
              </tr>
            </thead>
            <tbody>
            {obj && obj.map((task, index) => (
 
    <tr key={index} className="border-t hover:bg-gray-50">
      <td className="p-2">{task._id}</td>
      <td className="p-2">{task.count}</td>
      <td className="p-2">{task.totalTimeLapsed.toFixed(2)} hours</td>
      <td className="p-2">{task.totalTimeLeft.toFixed(2)} hours</td>
    </tr>
))}

            </tbody>
          </table>
        </div>

        </div>
        </>
    );
};

export default Dashboard;
