import React from "react";
import Input from "./Input";
import TaskList from "./TaskList";

function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl font-serif font-bold py-3">Todo List</h1>
      <Input />
      <TaskList />
    </div>
  );
}

export default Home;
