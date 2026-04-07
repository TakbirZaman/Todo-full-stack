import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onUpdate }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-14">
        <p className="text-6xl mb-4">🎯</p>
        <p className="text-xl text-gray-400 font-medium">No tasks here!</p>
        <p className="text-base text-gray-300">Add one above to get started.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default TodoList;