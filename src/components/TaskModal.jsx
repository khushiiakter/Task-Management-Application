import { useState, useEffect } from "react";

const TaskModal = ({ task, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "To-Do",
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
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="w-96 p-6 bg-white rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add New Task"}</h2>
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
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
              {task ? "Update Task" : "Add Task"}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded w-full">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
