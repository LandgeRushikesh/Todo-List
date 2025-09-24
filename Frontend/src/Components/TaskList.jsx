import axios from "axios";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import fetchContext from "../Context/fetch";

function TaskList() {
  const { todos, FetchTasks } = useContext(fetchContext);

  const UpdateTask = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/update/${id}`);
      console.log("Tasks updated Successfully", res.data.message);
      FetchTasks();
    } catch (err) {
      console.log("Failed to update task", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/delete/${id}`);
      console.log("Tasks deleted Successfully", res.data.message);
      FetchTasks();
    } catch (err) {
      console.log("Failed to delete task...", err);
    }
  };

  useEffect(() => {
    FetchTasks();
  }, []);

  return (
    <div className="todoList">
      {todos?.length === 0 ? (
        <h2>No Records</h2>
      ) : (
        todos?.map((todo) => (
          <div
            key={todo._id}
            className="todo w-[40vw] bg-black text-white my-4 py-3 px-4 rounded-lg font-serif font-bold text-xl flex justify-between items-center"
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              value={todo.isCompleted}
              onChange={() => UpdateTask(todo._id)}
            />
            <h3
              className={`${
                todo.isCompleted ? "line-through text-slate-400" : ""
              }`}
            >
              {todo.task}
            </h3>
            <button
              className="text-3xl"
              onClick={() =>
                !todo.isCompleted
                  ? alert("Task is not Completed...")
                  : deleteTask(todo._id)
              }
            >
              🗑
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
