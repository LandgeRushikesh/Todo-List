import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import connectDB from "./db/index.js"
import { Todo } from "./models/todo.model.js"


const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

// Database Connection
connectDB()
    .then((res) => {
        console.log("Database connected Successfully");

        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    })
    .catch((err) => {
        console.log("Failed to connect DB", err);

    })

app.get('/getTask', async (req, res) => {
    try {
        const tasks = await Todo.find()
        console.log("Data fetched successfully!!!");
        res.status(201).json({
            data: tasks,
            message: "Data Fetched successfully!!!"
        })

    }
    catch (err) {
        console.log(`Failed to fetch data from DB`);
        res.status(401).json({
            message: "Unable to fetch tasks from DB"
        })
    }
})

app.post('/add', async (req, res) => {
    const task = req.body.task
    try {
        const newTodo = await Todo.create({
            task: task
        })
        res.status(201).json({
            message: "Task added Successfully",
            data: newTodo
        })
    }
    catch (err) {
        console.log("Error occured while adding task:", err);
        res.status(400).json({
            message: "Error occured while adding task"
        })
    }

})

app.put('/update/:id', async (req, res) => {
    let id = req.params.id
    try {
        let task = await Todo.findById(id)
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        task.isCompleted = !task.isCompleted
        await task.save()
        res.status(201).json({
            message: "Task updated Successfully",
            data: task
        })
    }
    catch (err) {
        res.status(400).json({
            message: "Error occured while updating a task"
        })
    }
})

app.delete('/delete/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            message: "Task deleted Successfully..."
        })
    }
    catch (err) {
        res.status(400).json({
            message: "Failed to Delete task..."
        })
    }
})