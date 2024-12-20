import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../component/navbar";
import TaskForm from "../component/addEditTask";
import UpdateTask from "../component/updateTask";
const api=import.meta.env.VITE_BACKEND_API;

const Tasklist = () => {
  const [task, settask] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [ismodalopen, setismodalopen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleAdd = () => {
    setismodalopen((prev)=>{return !prev});
    setEditMode(false);
  };

  const handleEdit = (taskToEdit) => {
    setCurrentTask(taskToEdit);
    setEditMode(true);
    setismodalopen((prev)=>{return !prev});
  };

  const handleDelete = async () => {
    try {
      if (selectedTasks.length > 0) {
        await axios.delete("https://taskman-backend-8lr2.onrender.com/deleteTask", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
          data: { taskIds: selectedTasks },
        });
        fetchData();
      } else {
        alert("No tasks selected!");
      }
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  const handleSelectTask = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const fetchData = async () => {
    const response = await axios.get("https://taskman-backend-8lr2.onrender.com/gettask", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      withCredentials: true,
    });

    let filteredTasks = response.data;

    if (sortOrder) {
      switch (sortOrder) {
        case "1":
          filteredTasks = filteredTasks.sort((a, b) =>
            new Date(a.startTime) - new Date(b.startTime)
          );
          break;
        case "2":
          filteredTasks = filteredTasks.sort((a, b) =>
            new Date(b.startTime) - new Date(a.startTime)
          );
          break;
        case "3":
          filteredTasks = filteredTasks.sort((a, b) =>
            new Date(a.endTime) - new Date(b.endTime)
          );
          break;
        case "4":
          filteredTasks = filteredTasks.sort((a, b) =>
            new Date(b.endTime) - new Date(a.endTime)
          );
          break;
        default:
          break;
      }
    }

    if (priorityFilter && priorityFilter !== "remove") {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === Number(priorityFilter)
      );
    }

    if (statusFilter && statusFilter !== "remove") {
      filteredTasks = filteredTasks.filter(
        (task) => task.status === statusFilter
      );
    }

    settask(filteredTasks);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [sortOrder, priorityFilter, statusFilter]);

  return (
    <>
      <div className="absolute top-20 left-[40%] z-30">
        {!editMode && ismodalopen &&(<TaskForm
          isOpen={ismodalopen}
          onClose={() => setismodalopen(false)}
        />)}
        
        {editMode && currentTask && ismodalopen &&(
          <UpdateTask
            isOpen={ismodalopen}
            onClose={() => setismodalopen(false)}
            task={currentTask}
          />
        )}
      </div>

      <div
        className={`flex flex-col justify-center gap-10 z-20 ${ismodalopen ? " blur-xl" : ""}`}
      >
        <div>
          <Card />
        </div>

        <div className="flex">
          <p className="text-[30px] font-bold pl-10">Tasklist</p>
        </div>

        <div className="flex justify-between px-4 py-2 bg-gray-100 rounded-md">
          <div className="flex gap-6 font-medium">
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              + Add Task
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete Selected
            </button>
          </div>

          <div className="flex gap-4">
            <div>
              <select
                name="sortDropdown"
                className="px-4 py-2 border rounded-md"
                onChange={handleSortChange}
                value={sortOrder}
              >
                <option value="" disabled>
                  Sort
                </option>
                <option value="1">Start Time: ASC</option>
                <option value="2">Start Time: DESC</option>
                <option value="3">End Time: ASC</option>
                <option value="4">End Time: DESC</option>
                <option value="5">Remove Sort</option>
              </select>
            </div>

            <div>
              <select
                name="priorityDropdown"
                className="px-4 py-2 border rounded-md"
                onChange={handlePriorityFilterChange}
                value={priorityFilter}
              >
                <option value="" disabled>
                  Priority
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="remove">Remove filter</option>
              </select>
            </div>

            <div>
              <select
                name="statusDropdown"
                className="px-4 py-2 border rounded-md"
                onChange={handleStatusFilterChange}
                value={statusFilter}
              >
                <option value="" disabled>
                  Status: Finished
                </option>
                <option value="pending">Pending</option>
                <option value="finished">Finished</option>
                <option value="remove">Remove filter</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">
                  <input type="checkbox" />
                </th>
                <th className="p-2">Task ID</th>
                <th className="p-2">Title</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
                <th className="p-2">Start Time</th>
                <th className="p-2">End Time</th>
                <th className="p-2">Total Time to Finish</th>
                <th className="p-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              {task.map((task, index) => (
                <tr key={index} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      onChange={() => handleSelectTask(task._id)}
                      checked={selectedTasks.includes(task._id)}
                    />
                  </td>
                  <td className="p-2">{task._id}</td>
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">{task.priority}</td>
                  <td className="p-2">{task.status}</td>
                  <td className="p-2">{new Date(task.startTime).toLocaleDateString()}</td>
                  <td className="p-2">{new Date(task.endTime).toLocaleDateString()}</td>
                  <td className="p-2">
                    {Math.max(
                      new Date(task.endTime) - new Date(task.startTime),
                      0
                    ) / 3600000}{" "}
                    hour
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Tasklist;
