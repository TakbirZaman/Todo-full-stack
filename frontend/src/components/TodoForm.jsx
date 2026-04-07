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
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setError(""); }}
          placeholder="What needs to be done? ✍️"
          className="flex-1 px-5 py-4 rounded-2xl border-2 border-violet-200 
                     text-gray-700 text-lg placeholder-gray-300
                     focus:outline-none focus:border-violet-500 transition"
        />
        <button
          type="submit"
          className="px-6 py-4 bg-gradient-to-r from-violet-500 to-pink-500 
                     hover:from-violet-600 hover:to-pink-600 text-white text-lg 
                     font-bold rounded-2xl transition duration-200 shadow-md"
        >
          + Add
        </button>
      </div>
      {error && <p className="text-red-400 text-base font-medium pl-2">{error}</p>}
    </form>
  );
};

export default TodoForm;