import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/task');
      const sortedTasks = response.data.sort((a, b) => {
        if (a.prioritas === "High") return -1;
        if (a.prioritas === "Medium" && b.prioritas === "Low") return -1;
        return 1;
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/delete/${id}`);
      setTasks(tasks.filter(task => task.task_id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleMarkAsDone = async (id) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error('Error marking task as done:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-purple-900 min-h-screen">
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">Task Tackler</div>
        <div className="flex space-x-4">
          <Link to="/addTask" className="hover:text-gray-400">Add Task</Link>
        </div>
      </nav>
      <div className="text-xl font-bold mb-4 text-center text-white mt-4">Get Things Done!</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {tasks.map((task) => (
          <div key={task.task_id} className="bg-gray-800 rounded-lg p-4 transition duration-300 ease-in-out transform hover:bg-gray-700 hover:scale-105">
            <div>
              <div className="text-sm text-white font-bold mb-1">{task.judul}</div>
              <p className="text-sm text-gray-400">Deskripsi: {task.deskripsi}</p>
              <p className="text-sm text-gray-400">Due Date: {task.due_date}</p>
              <p className="text-sm text-gray-400">Prioritas: <span className="font-bold">{task.prioritas}</span></p>
              <div className="flex justify-between mt-2">
                <button onClick={() => handleMarkAsDone(task.task_id)} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Mark as Done</button>
                <Link to={`/updateTask/${task.task_id}`} className="bg-green-500 text-white px-4 py-2 rounded-lg">Update</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
