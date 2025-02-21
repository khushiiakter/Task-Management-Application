import { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TaskColumn = ({ title, tasks, columnId, addTask, updateTask, deleteTask }) => {
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(columnId, newTask);
      setNewTask("");
    }
  };

  return (
    <div className="w-80 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-2 bg-white shadow-md flex justify-between items-center"
                  >
                    <CardContent>{task.title}</CardContent>
                    <Button size="sm" onClick={() => deleteTask(task.id)}>X</Button>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="mt-4 flex gap-2">
        <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter task" />
        <Button onClick={handleAddTask}>Add</Button>
      </div>
    </div>
  );
};

export default TaskColumn;
