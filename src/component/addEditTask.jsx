import axios from "axios";
import { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
const api=import.meta.env.VITE_BACKEND_API;

const TaskForm = (props) => {
   

    if(!props.isOpen) return null;
  const [formData, setFormData] = useState({
    title: "",
    priority: "1",
    status: "pending", 
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const handleSubmit = async(e) => {
    e.preventDefault();
        const response = await axios.post("https://taskman-backend-ii9p.onrender.com/addtask",formData,{
            headers: {
              "Authorization": "Bearer " + sessionStorage.getItem('accessToken')
            }
        });
        if(response.status===200)
        alert("Task Added");
        Navigate(to="/task")
    
    
   
  }

  return (
    <div className="">
      <button
      onClick={()=>{props.onClose()}}
        className="w-full py-2 mt-4 bg-gray-100 text-gray-950 font-semibold rounded-md hover:bg-red-600 "
      >
        Close
      </button>
       
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter task title"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="priority" className="block text-sm font-semibold text-gray-700">Priority</label>
        <select
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
        >
          <option value="1">1 (Highest)</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 (Lowest)</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-semibold text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="finished">Finished</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="startTime" className="block text-sm font-semibold text-gray-700">Start Time</label>
        <input
          type="date"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="endTime" className="block text-sm font-semibold text-gray-700">End Time</label>
        <input
          type="date"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleInputChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
    </div>
  );
};

export default TaskForm;
