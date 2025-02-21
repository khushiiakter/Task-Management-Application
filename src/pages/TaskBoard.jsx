import { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import useTask from "../components/hooks/useTask";
import TaskModal from "../components/TaskModal";
import { BsFillTrash3Fill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";

const TaskBoard = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [tasks, refetch] = useTask();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Mutation to add a new task
  const addTaskMutation = useMutation({
    mutationFn: async (newTask) => await axios.post("http://localhost:5000/tasks", newTask),
    onSuccess: () => {
      refetch();
      Swal.fire("Success!", "Task added successfully.", "success");
      setIsModalOpen(false);
    },
    onError: () => Swal.fire("Error!", "Failed to add task.", "error"),
  });

  // Mutation to update an existing task
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      const { _id, ...taskData } = updatedTask; // Exclude _id
      return await axios.put(`http://localhost:5000/tasks/${_id}`, taskData);
    },
    onSuccess: () => {
      refetch();
      Swal.fire("Updated!", "Task updated successfully.", "success");
      setIsModalOpen(false);
      setIsEditing(false);
    },
    onError: () => Swal.fire("Error!", "Failed to update task.", "error"),
  });
  
  // Mutation to delete a task
  const deleteTaskMutation = useMutation({ 
    mutationFn: async (taskId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
        
        if (result.isConfirmed) {
            await axios.delete(`http://localhost:5000/tasks/${taskId}`);
            refetch();
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
        }
    },
    onError: () => Swal.fire("Error!", "Failed to delete task.", "error"),
});


  // Open modal for adding a task
  const handleAddTask = () => {
    setSelectedTask(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  // Open modal for editing a task
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add New Task
      </button>

      <div className="flex gap-4">
        {["To-Do", "In Progress", "Done"].map((category) => (
          <div key={category} className="w-1/3 bg-gray-200 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-2">{category}</h2>
            {tasks
              .filter((task) => task.category === category)
              .map((task) => (
                <div key={task._id} className="py-2 px-3 bg-white rounded-md shadow mb-2 flex justify-between">
                  <div>
                    <strong>{task.title}</strong>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="text-2xl"
                    >
                    <TiEdit />
                    </button>
                    <button
                      onClick={() => deleteTaskMutation.mutate(task._id)}
                      className=" text-lg"
                    >
                      <BsFillTrash3Fill />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <TaskModal
          task={selectedTask} // Pass selected task when editing
          onClose={() => setIsModalOpen(false)}
          onSave={(task) => (isEditing ? updateTaskMutation.mutate(task) : addTaskMutation.mutate(task))}
        />
      )}
    </div>
  );
};

export default TaskBoard;
