import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateTask = () => {
    const { id: taskId } = useParams(); 
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [prioritas, setPrioritas] = useState('');
    const [isFormDirty, setIsFormDirty] = useState(false); 

    useEffect(() => {
        fetchTask();
    }, []);

    useEffect(() => {
        if (task) {
            const isDirty =
                judul !== task.judul ||
                deskripsi !== task.deskripsi ||
                dueDate !== task.due_date ||
                prioritas !== task.prioritas;
            setIsFormDirty(isDirty);
        }
    }, [judul, deskripsi, dueDate, prioritas, task]);

    const fetchTask = async () => {
        try {
            const response = await axios.get(`/task/${taskId}`);
            const taskData = response.data;
            setTask(taskData);
            setJudul(taskData.judul);
            setDeskripsi(taskData.deskripsi);
            setDueDate(taskData.due_date);
            setPrioritas(taskData.prioritas);
            setIsFormDirty(false);
        } catch (error) {
            console.error('Error fetching task:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedTask = {
                judul,
                deskripsi,
                due_date: dueDate,
                Prioritas: prioritas,
            };
            await axios.put(`/update/${taskId}`, updatedTask);
            navigate('/');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    
    return (
        <div className="bg-gradient-to-r from-indigo-800 to-purple-900 min-h-screen">
            <div className="text-xl font-bold mb-4 text-center text-white mt-4">Update Task</div>
            <div className="flex justify-center">
                <div className="bg-gray-800 rounded-lg p-4 w-full max-w-md">
                    <div className="mb-4">
                        <label htmlFor="judul" className="text-white font-bold">Judul</label>
                        <input
                            type="text"
                            id="judul"
                            value={judul}
                            onChange={(e) => setJudul(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="deskripsi" className="text-white font-bold">Deskripsi</label>
                        <textarea
                            id="deskripsi"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dueDate" className="text-white font-bold">Due Date</label>
                        <input
                            type="text"  
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="prioritas" className="text-white font-bold">Prioritas</label>
                        <input
                            type="text" 
                            id="prioritas"
                            value={prioritas}
                            onChange={(e) => setPrioritas(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        disabled={!isFormDirty}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateTask;
