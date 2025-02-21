import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const TaskBoard = () => {
    const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
  
    axios.post("http://localhost:5000/tasks", newTask).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Task added successfully.",
          icon: "success",
        });
  
        // Refetch tasks to get the latest list
        axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  
        setNewTask({ title: "", description: "", category: "To-Do" });
        setIsModalOpen(false);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to add task. Please try again.",
          icon: "error",
        });
      }
    });
  };
  

  return (
    <div className="p-4">
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add New Task
      </button>
      
      <div className="flex gap-4">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <div key={category} className="w-1/3 bg-gray-200 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">{category}</h2>
            {tasks.filter((task) => task.category === category).map((task) => (
              <div key={task._id} className="p-2 bg-white rounded-md shadow mb-2">
                <div>
                  <strong>{task.title}</strong>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="w-96 p-6 bg-white rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={addTask}>
              <div className="mb-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Task Title"
                  maxLength="50"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <textarea
                  name="description"
                  placeholder="Description (optional)"
                  maxLength="200"
                  value={newTask.description}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-4">
                <select
                  name="category"
                  value={newTask.category}
                  onChange={handleInputChange}
                  className="p-2 border rounded w-full"
                >
                  <option value="To-Do">To-Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                  Add Task
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white p-2 rounded w-full">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
