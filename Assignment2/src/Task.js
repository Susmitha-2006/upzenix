import { useState } from "react";

function Task({
  task,
  deleteTask,
  toggleTask,
  editTask,
  editingTaskId,
  setEditingTaskId,
}) {
  const [text, setText] = useState(task.name);

  const isEditing = editingTaskId === task.id;

  const saveEdit = () => {
    if (text.trim() === "") return;
    editTask(task.id, text);
    setEditingTaskId(null);
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        disabled={task.completed}
      />

      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <span className={task.completed ? "done" : ""}>
          {task.name}
        </span>
      )}

      {isEditing ? (
        <button onClick={saveEdit}>Save</button>
      ) : (
        !task.completed && (
          <button
            onClick={() => setEditingTaskId(task.id)}
            disabled={editingTaskId !== null}
          >
            Edit
          </button>
        )
      )}

      <button
        onClick={() => deleteTask(task.id)}
        disabled={isEditing}
      >
        Delete
      </button>
    </div>
  );
}

export default Task;
