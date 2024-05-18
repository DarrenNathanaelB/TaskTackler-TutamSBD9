const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRepo = require('./repositories/repositories.task');

const port = 5000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Endpoint
app.post('/addtask', taskRepo.addTask);
app.get('/task', taskRepo.getTask);
app.get('/task/:id', taskRepo.getTaskById);
app.put('/update/:id', taskRepo.updateTask);
app.delete('/delete/:id', taskRepo.deleteTask);

app.listen(port, () => {
    console.log("Server is running and listening on port", port);
});
