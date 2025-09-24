import { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import fetchContext from "./Context/fetch";
import axios from "axios";

function App() {
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
  return (
    <>
      <fetchContext.Provider value={{ todos, setTodos, FetchTasks }}>
        <Home />
      </fetchContext.Provider>
    </>
  );
}

export default App;
