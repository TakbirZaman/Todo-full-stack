import { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") { setError("Please enter a task!"); return; }
    onAdd(title);
    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(""); }}
          placeholder="What needs to be done?"
          style={{
            flex: 1,
            background: "#16161a",
            border: "1.5px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            padding: "14px 20px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            color: "#f0f0f0",
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
          onFocus={e => {
            e.target.style.borderColor = "#c8f135";
            e.target.style.boxShadow = "0 0 0 3px rgba(200,241,53,0.1)";
          }}
          onBlur={e => {
            e.target.style.borderColor = "rgba(255,255,255,0.07)";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          type="submit"
          style={{
            background: "#c8f135",
            color: "#0d0d0f",
            border: "none",
            borderRadius: "16px",
            padding: "14px 22px",
            fontFamily: "'Syne', sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            transition: "transform 0.15s, box-shadow 0.15s",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={e => {
            e.target.style.transform = "translateY(-1px)";
            e.target.style.boxShadow = "0 6px 20px rgba(200,241,53,0.3)";
          }}
          onMouseLeave={e => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}
        >
          + Add
        </button>
      </div>
      {error && (
        <p style={{ fontSize: "13px", color: "#ff5252", paddingLeft: "4px" }}>
          {error}
        </p>
      )}
    </form>
  );
};

export default TodoForm;