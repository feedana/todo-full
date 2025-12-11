// src/Components/Todo/Edit.jsx
import { useState } from "react";
import Swal from "sweetalert2";

export default function Edit({ data, onUpdate, close }) {
  const [todoText, setTodoText] = useState(data?.todo ?? "");
  const [loading, setLoading] = useState(false);

  async function handleUpdate(e) {
    e.preventDefault();
    const trimmed = todoText.trim();
    if (!trimmed) {
      Swal.fire("Empty", "Todo text cannot be empty", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3001/todos/${data.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          todo: trimmed,
          completed: data.completed ?? false
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed: ${res.status}`);
      }

      const updated = await res.json();
      onUpdate(updated);
      Swal.fire("Saved!", "Todo updated", "success");
      close();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded shadow-md w-[90%] max-w-md"
      >
        <h2 className="text-lg font-semibold mb-3">Edit Todo</h2>

        <input
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          autoFocus
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={close}
            className="px-3 py-1 rounded border"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded bg-green-600 text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
