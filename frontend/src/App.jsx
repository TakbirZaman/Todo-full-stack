import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const API = "http://localhost:5000/api/todos";

const App = () => {
  const [todos, setTodos] = useState([]); // ✅ always starts as array
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // ✅ track errors

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setTodos(data); // ✅ only set if it's actually an array
        } else {
          setTodos([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Could not connect to server. Is your backend running?");
        setTodos([]); 
        setLoading(false);
      });
  }, []);

  const handleAdd = async (title) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const newTodo = await res.json();
      if (newTodo && newTodo.id) {
        setTodos((prev) => [newTodo, ...prev]);
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const updated = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 flex items-center justify-center px-4">
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 opacity-10 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-lg bg-stone-800 border border-stone-700 rounded-2xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white tracking-tight">📝 My Todo App</h1>
          <p className="text-stone-400 text-sm mt-1">
            {completedCount} of {todos.length} tasks completed
          </p>
        </div>

        {/* ✅ Show error banner if backend is down */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <TodoForm onAdd={handleAdd} />

        <div className="flex gap-2 mb-5">
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-stone-700 text-stone-400 hover:bg-stone-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-stone-400">Loading...</p>
        ) : (
          <TodoList todos={filteredTodos} onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
      </div>
    </div>
  );
};

export default App;