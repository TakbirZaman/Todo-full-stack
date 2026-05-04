import { useState } from "react";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [hovered, setHovered] = useState(false);

  const handleToggle = () => {
    onUpdate(todo.id, { title: todo.title, completed: !todo.completed });
  };

  const handleEditSave = () => {
    if (editTitle.trim() === "") return;
    onUpdate(todo.id, { title: editTitle, completed: todo.completed });
    setIsEditing(false);
  };

  return (
    <li
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#16161a",
        border: `1.5px solid ${hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "16px",
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
        transition: "border-color 0.2s, transform 0.2s, box-shadow 0.2s",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        boxShadow: hovered ? "0 4px 20px rgba(0,0,0,0.3)" : "none",
        opacity: todo.completed ? 0.55 : 1,
      }}
    >
      {/* Custom Checkbox */}
      <div
        onClick={handleToggle}
        style={{
          width: "22px",
          height: "22px",
          border: `2px solid ${todo.completed ? "#c8f135" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          background: todo.completed ? "#c8f135" : "#1e1e24",
          flexShrink: 0,
          transition: "all 0.2s",
        }}
      >
        {todo.completed && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4.5L4 7.5L10 1" stroke="#0d0d0f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Title or Edit Input */}
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          autoFocus
          onChange={(e) => setEditTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEditSave();
            if (e.key === "Escape") setIsEditing(false);
          }}
          style={{
            flex: 1,
            background: "#1e1e24",
            border: "1.5px solid #c8f135",
            borderRadius: "8px",
            padding: "6px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            color: "#f0f0f0",
            outline: "none",
            boxShadow: "0 0 0 3px rgba(200,241,53,0.1)",
          }}
        />
      ) : (
        <span
          style={{
            flex: 1,
            fontSize: "15px",
            color: todo.completed ? "#6b6b7a" : "#f0f0f0",
            textDecoration: todo.completed ? "line-through" : "none",
            transition: "color 0.2s",
          }}
        >
          {todo.title}
        </span>
      )}

      {/* Action Buttons */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateX(0)" : "translateX(6px)",
          transition: "opacity 0.2s, transform 0.2s",
        }}
      >
        {isEditing ? (
          <button
            onClick={handleEditSave}
            style={{
              background: "rgba(82,255,184,0.12)",
              color: "#52ffb8",
              border: "1.5px solid rgba(82,255,184,0.2)",
              borderRadius: "8px",
              padding: "6px 12px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: "#1e1e24",
              color: "#6b6b7a",
              border: "1.5px solid rgba(255,255,255,0.07)",
              borderRadius: "8px",
              padding: "6px 12px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          style={{
            background: "rgba(255,82,82,0.1)",
            color: "#ff5252",
            border: "1.5px solid rgba(255,82,82,0.15)",
            borderRadius: "8px",
            padding: "6px 12px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;