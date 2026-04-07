import { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("Please enter a todo item");
      return;
    }
    onAdd(title);
    setTitle("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 rounded-xl bg-stone-700 border border-stone-600 
                     text-white placeholder-stone-400 focus:outline-none 
                     focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white 
                     font-semibold rounded-xl transition duration-200 shadow-lg"
        >
          Add
        </button>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </form>
  );
};

export default TodoForm;