import { useState } from "react";

const TaskModal = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [category, setCategory] = useState(task?.category || "To-Do");

  const handleSave = () => {
    if (!title.trim()) return alert("Title is required");
    onSave({ ...task, title, description, category });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add Task"}</h2>
        <input
          type="text"
          placeholder="Title"
          maxLength="50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <textarea
          placeholder="Description (optional)"
          maxLength="200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-400 rounded text-white">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-[#5f1a89] hover:bg-[#0F1035] rounded text-white">Save</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
