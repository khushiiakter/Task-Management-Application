import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const TaskModal = ({ task, onClose, onSave }) => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "To-Do",
    order: 0,
    timestamp: new Date().toISOString(),
    dueDate: "", // New field for due date
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { ...formData, userEmail: user?.email };
    onSave(taskData);
  };

  // Function to check if the task is overdue and apply color
  const getDueDateColor = () => {
    if (!formData.dueDate) return ""; // If no due date, no color change
    const now = new Date();
    const taskDueDate = new Date(formData.dueDate);
    
    // Ensure to reset time part for accurate comparison
    taskDueDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    // If task due date is before today's date, it's overdue
    if (taskDueDate < now) return "bg-red-500"; // Overdue
    return "";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-96 p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-xl font-bold text-black mb-4">
          {task ? "Edit Task" : "Add New Task"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              maxLength="50"
              value={formData.title}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              name="description"
              placeholder="Description (optional)"
              maxLength="200"
              value={formData.description}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="p-2 border rounded w-full"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className={`p-2 border rounded w-full ${getDueDateColor()}`}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-white hover:bg-gray-300 font-semibold bg-[#0F1035] hover:text-black p-2 rounded w-full"
            >
              {task ? "Update Task" : "Add Task"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white font-semibold p-2 rounded w-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
