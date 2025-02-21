import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../provider/AuthProvider";
import useTask from "../components/hooks/useTask";
import TaskModal from "../components/TaskModal";
import { BsFillTrash3Fill } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskBoard = () => {
  const { user } = useContext(AuthContext);
  const [tasks, refetch] = useTask();
  const [selectedTask, setSelectedTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [localTasks, setLocalTasks] = useState([]);

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  // Add Task
  const addTaskMutation = useMutation({
    mutationFn: async (newTask) =>
      await axios.post("http://localhost:5000/tasks", newTask),
    onSuccess: () => {
      refetch();
      Swal.fire("Success!", "Task added successfully.", "success");
      setIsModalOpen(false);
    },
    onError: () => Swal.fire("Error!", "Failed to add task.", "error"),
  });

  // Update Task
  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      const { _id, ...taskData } = updatedTask;
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

  // Delete Task
  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:5000/tasks/${taskId}`);
        refetch();
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      }
    },
    onError: () => Swal.fire("Error!", "Failed to delete task.", "error"),
  });

  const handleAddTask = () => {
    setSelectedTask(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  
 
  const onDragEnd = async (result) => {
    if (!result.destination) return;
  
    const { source, destination, draggableId } = result;
    const taskId = draggableId;
  
    const updatedTasks = [...localTasks];
    const draggedTask = updatedTasks.find((task) => task._id === taskId);
  
    if (!draggedTask) return;
  
    if (source.droppableId === destination.droppableId) {
      // Reorder within the same category
      const categoryTasks = updatedTasks
        .filter((task) => task.category === source.droppableId)
        .sort((a, b) => a.order - b.order);
  
      // Remove the dragged task
      const [movedTask] = categoryTasks.splice(source.index, 1);
      categoryTasks.splice(destination.index, 0, movedTask);
  
      // Assign new order values
      categoryTasks.forEach((task, index) => {
        task.order = index;
      });
  
      // Update the localTasks state with the new order
      const newLocalTasks = updatedTasks.map((task) => {
        const updatedTask = categoryTasks.find((t) => t._id === task._id);
        return updatedTask ? updatedTask : task;
      });
  
      setLocalTasks(newLocalTasks);
  
      try {
        await axios.put("http://localhost:5000/tasks/reorder", { tasks: categoryTasks });
        console.log("Reorder success!");
      } catch (error) {
        console.error("Failed to reorder tasks:", error);
      }
    } else {
      // Move to another category
      const movedTasks = updatedTasks.map((task) =>
        task._id === taskId
          ? { ...task, category: destination.droppableId, order: destination.index }
          : task
      );
  
      setLocalTasks(movedTasks);
  
      try {
        await axios.put(`http://localhost:5000/tasks/${taskId}`, {
          category: destination.droppableId,
          order: destination.index,
        });
        console.log("Task category updated successfully!");
      } catch (error) {
        console.error("Failed to update task category:", error);
      }
    }
  };
  
  
  
  
  
  
  
  return (
    <div className="md:p-4 container mx-auto">
      <div className="flex justify-center">
        <button
          onClick={handleAddTask}
          className="md:text-xl px-5 py-3 text-black bg-gray-200 font-bold hover:bg-gray-300 rounded-full md:px-5 hover:border-white mb-4 sm:w-auto"
        >
          Add New Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-200 p-4 rounded-md shadow-md"
                >
                  <h2 className="text-lg font-bold mb-2">{category}</h2>
                  {localTasks
                    .filter((task) => task.category === category)
                    .sort((a, b) => a.order - b.order)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="py-2 px-3 bg-white rounded-md shadow mb-2 flex justify-between items-center"
                          >
                            <div>
                              <strong className="block">{task.title}</strong>
                              <p className="text-sm text-gray-600">
                                {task.description}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEditTask(task)}
                                className="text-xl hover:text-black"
                              >
                                <TiEdit />
                              </button>
                              <button
                                onClick={() =>
                                  deleteTaskMutation.mutate(task._id)
                                }
                                className="text-lg hover:text-red-700"
                              >
                                <BsFillTrash3Fill />
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {isModalOpen && (
        <TaskModal
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onSave={(task) =>
            isEditing
              ? updateTaskMutation.mutate(task)
              : addTaskMutation.mutate(task)
          }
        />
      )}
    </div>
  );
};

export default TaskBoard;
