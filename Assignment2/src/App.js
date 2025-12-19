import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTaskId, setEditingTaskId] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: input,
        completed: false,
      },
    ]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, newName) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, name: newName } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>To-Do List</h1>

      <div className="add-task">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
          disabled={editingTaskId !== null}
        />
        <button onClick={addTask}
          disabled={editingTaskId !== null}
        >
          Add
        </button>
      </div>

      <div className="filters">
        <button onClick={() => setFilter("all")} className={filter === "all" ? "active" : ""}>All</button>
        <button onClick={() => setFilter("active")} className={filter === "active" ? "active" : ""}>Active</button>
        <button onClick={() => setFilter("completed")} className={filter === "completed" ? "active" : ""}>Completed</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty">No Tasks</p>
      ) : (
        filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            editTask={editTask}
            editingTaskId={editingTaskId}
            setEditingTaskId={setEditingTaskId}
          />
        ))
      )}
    </div>
  );
}

export default App;
