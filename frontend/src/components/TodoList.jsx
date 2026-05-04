import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onUpdate }) => {
  if (todos.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <span style={{
          fontSize: "52px",
          display: "block",
          marginBottom: "16px",
          animation: "float 3s ease-in-out infinite",
        }}>
          🎯
        </span>
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "20px",
          fontWeight: 700,
          color: "#f0f0f0",
          marginBottom: "6px",
        }}>
          All clear!
        </p>
        <p style={{ fontSize: "14px", color: "#6b6b7a" }}>
          Add a task above to get started.
        </p>
      </div>
    );
  }

  return (
    <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </ul>
  );
};

export default TodoList;