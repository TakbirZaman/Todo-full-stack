import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const API = "http://localhost:5000/api/todos";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => { setTodos(data); setLoading(false); })
      .catch((err) => console.error(err));
  }, []);

  const handleAdd = async (title) => {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const newTodo = await res.json();
    setTodos([newTodo, ...todos]);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleUpdate = async (id, updatedData) => {
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const updated = await res.json();
    setTodos(todos.map((t) => (t.id === id ? updated : t)));
  };

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  const filterButtons = [
    { key: "all",       label: "All",       bg: "bg-violet-500 text-white", inactive: "bg-white text-violet-500 border border-violet-300 hover:bg-violet-50" },
    { key: "active",    label: "Active",    bg: "bg-orange-400 text-white", inactive: "bg-white text-orange-400 border border-orange-300 hover:bg-orange-50" },
    { key: "completed", label: "Completed", bg: "bg-emerald-500 text-white", inactive: "bg-white text-emerald-500 border border-emerald-300 hover:bg-emerald-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-orange-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 border border-violet-100">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500 mb-2">
            My Tasks ✅
          </h1>
          <p className="text-lg text-gray-500 font-medium">
            <span className="text-emerald-500 font-bold">{completedCount}</span>
            <span> of </span>
            <span className="text-violet-500 font-bold">{todos.length}</span>
            <span> tasks completed</span>
          </p>
        </div>

        {/* Form */}
        <TodoForm onAdd={handleAdd} />

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-6">
          {filterButtons.map(({ key, label, bg, inactive }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`flex-1 py-2.5 rounded-xl text-base font-semibold transition duration-200 ${
                filter === key ? bg : inactive
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <p className="text-center text-gray-400 text-lg py-10">Loading...</p>
        ) : (
          <TodoList
            todos={filteredTodos}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default App;