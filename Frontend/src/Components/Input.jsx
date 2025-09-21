import React, { useState } from "react";
import axios from "axios";

function Input() {
  const [task, setTask] = useState();
  const HandleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/add", { task: task });
      console.log("task added successfully", res.data.message);

      setTask("");
    } catch (err) {
      console.log(`Error in posting data : ${err}`);
    }
  };

  return (
    <div className="input-cnt w-screen">
      <form onSubmit={HandleAdd} className="flex justify-center items-center">
        <input
          className="w-[40%] h-10 py-2 px-4 border-2 border-black font-bold text-black rounded-tl-xl rounded-bl-xl focus:outline-none"
          type="text"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          placeholder="Enter the task..."
          required
        />
        <button
          type="submit"
          className="text-white h-10 bg-black py-2 px-4 font-bold font-serif rounded-tr-xl rounded-br-xl "
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default Input;
