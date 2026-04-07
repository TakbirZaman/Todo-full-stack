import { useState } from "react";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  // Toggle complete/incomplete
  const handleToggle = () => {
    onUpdate(todo.id, { title: todo.title, completed: !todo.completed });
  };

  // Save edited title
  const handleEditSave = () => {
    if (editTitle.trim() === "") return;
    onUpdate(todo.id, { title: editTitle, completed: todo.completed });
    setIsEditing(false);
  };

  return (
    <li className="flex items-center gap-3 p-4 bg-stone-700 rounded-xl border border-stone-600 group">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-4 h-4 accent-blue-500 cursor-pointer"
      />

      {/* Title or Edit Input */}
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
          className="flex-1 px-3 py-1 rounded-lg bg-stone-600 border border-stone-500 
                     text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 text-sm ${
            todo.completed ? "line-through text-stone-400" : "text-white"
          }`}
        >
          {todo.title}
        </span>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <button
            onClick={handleEditSave}
            className="text-xs px-3 py-1 bg-green-500 hover:bg-green-400 
                       text-white rounded-lg transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs px-3 py-1 bg-stone-500 hover:bg-stone-400 
                       text-white rounded-lg transition"
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="text-xs px-3 py-1 bg-red-500 hover:bg-red-400 
                     text-white rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;