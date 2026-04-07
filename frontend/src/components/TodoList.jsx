import TodoItem from "./TodoItem";

const TodoList = ({ todos, onDelete, onUpdate }) => {
  if (todos.length === 0) {
    return (
      <p className="text-center text-stone-400 py-10">
        No tasks yet. Add one above! 🎯
      </p>
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