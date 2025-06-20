"use client";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { CirclePlus, X } from "lucide-react";
import axios from "axios";
const Createtask = () => {
  const [isModelopen, setIsModelOpen] = useState(false);
  const { user,token} = useUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: ""
  });

  const handleInputChange = (field,value) => {
  setFormData((prev) => ({
      ...prev,
     [field]: value
    }));
  };
  console.log("formData:", formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const payload = {
        name: formData.title,
        description: formData.description,
        priority: formData.priority,
        dueDate: formData.dueDate,
        created_by : user?.id || ""
      };
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/create-Task`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201) {
        console.log("Task created successfully:", response.data);
      } else {
        console.error("Failed to create task:", response.statusText);
      }

    }catch (error) {
      console.error("Error creating task:", error);
    }finally{
    setIsModelOpen(false);
    setFormData({
      title: "",
      description: "",
      priority: "",
      dueDate: ""
    });
    console.log("Task created successfully:", formData);
  }
  };

  const closeModal = () => {
    setIsModelOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsModelOpen(true)}>
        <CirclePlus />
      </button>
      {isModelopen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                Create New Task
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                  className="w-full px-4 py-2 font-medium border border-gray-300 text-sm text-black rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Enter task title..."
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 font-medium text-sm text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                  placeholder="Describe your task..."
                />
              </div>

              <div>
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  className="w-full px-4 py-2 font-medium text-sm text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className="w-full px-4 py-2  font-medium text-sm text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4  font-medium text-[17px] py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex-1 px-4 font-medium text-[17px]  py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Createtask;
