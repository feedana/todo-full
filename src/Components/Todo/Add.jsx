import { useState } from "react";

export default function Add({ onAdd }) {
  const [todo, setTodo] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();

    if (!todo.trim()) return;

    const newTodo = {
      todo,
      completed: false
    };

    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((data) => {
        onAdd(data);     
        setTodo("");     
      });
  };

  return (
    <form onSubmit={handleAdd} className="flex gap-3 p-4">
      <input
        type="text"
        className="border p-2 w-full"
        placeholder="Add new todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add
      </button>
    </form>
  );
}
