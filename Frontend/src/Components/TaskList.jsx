import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function TaskList() {
  const [todos, setTodos] = useState([]);

  const FetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/getTask");
      console.log("Tasks fetched Successfully", res.data.message);

      setTodos(res.data.data);
    } catch (err) {
      console.log("Error while fetching tasks", err);
    }
  };

  // const UpdateTask = async () => {
  //   try {
  //     const res = await axios.put("http://localhost:5000/update");
  //   } catch (err) {
  //     console.log("Failed to update task", err);
  //   }
  // };

  useEffect(() => {
    FetchTasks();
  }, []);

  return (
    <div className="todoList">
      {todos.length === 0 ? (
        <h2>No Records</h2>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className="todo w-[40vw] bg-black text-white my-4 py-3 px-4 rounded-lg font-serif font-bold text-xl flex justify-between items-center"
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              value={todo.is_completed}
            />
            <h3
              className={`${
                todo.isCompleted ? "line-through text-slate-400" : ""
              }`}
            >
              {todo.task}
            </h3>
            <button className="text-3xl">🗑</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;
