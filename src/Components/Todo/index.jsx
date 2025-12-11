import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Add from "../Todo/Add";
import Edit from "../Todo/Edit";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleAdd = (newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleUpdate = (updated) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Silinsin?",
      text: "Bu əməliyyat geri qaytarıla bilməz!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Bəli, sil!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/todos/${id}`, {
          method: "DELETE",
        }).then(() => {
          setTodos((prev) => prev.filter((t) => t.id !== id));
          Swal.fire("Silindi!", "Todo silindi.", "success");
        });
      }
    });
  };

  return (
    <div className="p-4">

      <Add onAdd={handleAdd} />

      <table className="w-full border mt-4">
        <tbody>
          {todos.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-3">{item.todo}</td>

              <td className="p-3 flex gap-3">
                <button
                  className="bg-orange-500 text-white px-3 py-1 rounded"
                  onClick={() => setEditData(item)}
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editData && (
        <Edit
          data={editData}
          onUpdate={handleUpdate}
          close={() => setEditData(null)}
        />
      )}
    </div>
  );
}
