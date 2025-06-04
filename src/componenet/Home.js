"use client";
import { useState, useEffect } from "react";
import axiox from "axios";
import { useUser } from "@/context/UserContext";
const Home = () => {
  const { user, accessToken } = useUser();
  const [taskss, setTaskss] = useState([]);
  console.log("user id is", user?.id);
  useEffect(() => {
    const featchData = async () => {
      const taskresponse = await axiox.get(
        `http://localhost:3001/api/tasks/getByUser/${user?.id}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setTaskss(taskresponse.data.tasks);
    };
    featchData();
  }, [user, accessToken]);
  console.log("tasks are", taskss);

  const [tasks, setTasks] = useState({
    pending: [],
    in_progress: [],
    completed: []
  });
  useEffect(() => {
    const pendingTasks = taskss.filter((task) => task.status === "pending");
    const inProgressTasks = taskss.filter(
      (task) => task.status === "in_progress"
    );
    const completedTasks = taskss.filter((task) => task.status === "completed");

    setTasks({
      pending: pendingTasks,
      in_progress: inProgressTasks,
      completed: completedTasks
    });
  }, [taskss]);

  const [draggedTask, setDraggedTask] = useState(null);
  const [dragSource, setDragSource] = useState(null);

  const handleDragStart = (task, column) => {
    setDraggedTask(task);
    setDragSource(column);
  };

  const handleDrop = async (targetColumn) => {
  if (!draggedTask || dragSource === targetColumn) return;
  
  try {
    const response = await axiox.put(
      `http://localhost:3001/api/tasks/status/${draggedTask.id}`, 
      {
        status: targetColumn
      }, 
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    
    
    if (response.status >= 200 && response.status < 300) {
      const updatedTask = { ...tasks };
      updatedTask[dragSource] = updatedTask[dragSource].filter((task) => task.id !== draggedTask.id);
      updatedTask[targetColumn].push({
        ...draggedTask,
        status: targetColumn
      });
      setTasks(updatedTask);
      console.log("Task status updated successfully:", response.data);
    } else {
      console.error("Failed to update task status:", response.data);
    }
  } catch (error) {
    console.error("Error updating task status:", error);
  
  }
  setDraggedTask(null);
  setDragSource(null);
};

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns = [
    { id: "pending", title: "pending", color: "bg-purple-50 border-purple-200" },
    {
      id: "in_progress",
      title: "In Progress",
      color: "bg-blue-50 border-blue-200"
    },
    { id: "completed", title: "completed", color: "bg-green-50 border-green-200" }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-200">
          Task Management Board
        </h1>
        <p className="text-gray-200">
          Drag and drop tasks between columns to update their status
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`rounded-lg border ${column.color} shadow-sm`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">{column.title}</h2>
                <span className="text-sm px-2 py-1 bg-white rounded-full text-gray-600">
                  {tasks[column.id].length}
                </span>
              </div>
            </div>

            <div className="p-4 min-h-96">
              {tasks[column.id].length === 0 ? (
                <div className="flex items-center justify-center h-24 border-2 border-dashed rounded-lg text-gray-400">
                  Drop tasks here
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks[column.id].map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task, column.id)}
                      className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm cursor-move hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-800">
                          {task.name}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>#{task.id}</span>
                        <span>Drag to move</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
