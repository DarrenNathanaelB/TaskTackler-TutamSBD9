import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate();
    const [judul, setJudul] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [prioritas, setPrioritas] = useState('');

    const handleAddTask = async () => {
        try {
            const newTask = {
                judul: judul,
                deskripsi: deskripsi,
                due_date: dueDate,
                Prioritas: prioritas,
            };
            await axios.post('/addtask', newTask);
            navigate('/');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-indigo-800 to-purple-900 min-h-screen">
            <div className="text-xl font-bold mb-4 text-center text-white mt-4">Add Task</div>
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
                            type="text" // Change type to text
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="prioritas" className="text-white font-bold">Prioritas</label>
                        <input
                            type="text" // Change type to text
                            id="prioritas"
                            value={prioritas}
                            onChange={(e) => setPrioritas(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white"
                        />
                    </div>
                    <button
                        onClick={handleAddTask}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
