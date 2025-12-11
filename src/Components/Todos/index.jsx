import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Todos() {
  const [todos, setTodos] = useState([]); 

  
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  
  const deleteTodo = (id) => {
    Swal.fire({
      title: "Silinsin?",
      text: "Bu todonu silmək istədiyinizə əminsiniz?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Bəli, sil",
      cancelButtonText: "Ləğv et",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/todos/${id}`, {
          method: "DELETE",
        }).then(() => {
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        });
      }
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Todos</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Todo</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((item) => (
            <tr key={item.id} className="border-b text-center">
              <td className="p-2">{item.todo}</td>

              <td className="p-2">
                {item.completed ? (
                  <span className="bg-green-500 text-white px-3 py-1 rounded">
                    completed
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-3 py-1 rounded">
                    not completed
                  </span>
                )}
              </td>

              <td className="p-2 flex justify-center gap-3">
                <button className="bg-orange-500 text-white px-3 py-1 rounded">
                  Edit
                </button>

                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => deleteTodo(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
