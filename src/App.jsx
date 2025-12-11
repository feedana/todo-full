import Todos from "./Components/Todo";

export default function App() {
  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">FS-42 TODO APP!</h1>
      <Todos />
    </div>
  );
}
