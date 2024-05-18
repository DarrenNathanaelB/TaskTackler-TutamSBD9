const { Pool } = require("pg");

const pool = new Pool({
    user: "darrennb30_owner",
    password: "deGm8cWg7ZMa",
    host: "ep-orange-union-a1ecgx1f.ap-southeast-1.aws.neon.tech",
    database: "tutam09",

    ssl: {
        require: true,
    },
});

pool.connect().then(() => {
    console.log("Connected to PostgreSQL database");
});

async function addTask(req, res) {
    const { judul, deskripsi, due_date, Prioritas } = 
        req.body;

    try {
        const result = await pool.query(
        `INSERT INTO tasks (judul, deskripsi, due_date, Prioritas) VALUES ($1, $2, $3, $4) RETURNING *`,
        [judul, deskripsi, due_date, Prioritas]
        );

        const newTask = result.rows[0];
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getTask(req, res) {
    try {
        const result = await pool.query('SELECT * FROM tasks');
        const tasks = result.rows;
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getTaskById(req, res) {
    const taskId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM tasks WHERE task_id=$1', [taskId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        const task = result.rows[0];
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function updateTask(req, res) {
    const taskId = req.params.id;
    const { judul, deskripsi, due_date, Prioritas } = req.body;

    try {
        const result = await pool.query(
            `UPDATE tasks SET judul = $1, deskripsi = $2, due_date = $3, Prioritas = $4 WHERE task_id = $5 RETURNING *`,
            [judul, deskripsi, due_date, Prioritas, taskId]
        );        
        const updatedTask = result.rows[0];
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

async function deleteTask(req, res) {
    const taskId = req.params.id;

    try {
        const result = await pool.query('DELETE FROM tasks WHERE task_id=$1 RETURNING *', [taskId]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Task not found or already deleted' });
        }
        const deletedTask = result.rows[0];
        return res.status(200).json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addTask,
    getTask,
    getTaskById,
    updateTask,
    deleteTask
};
