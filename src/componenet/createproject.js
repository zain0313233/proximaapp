"use client";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import {CirclePlus, X } from "lucide-react";

const ProjectPopup = ({ selectedOrganization }) => {
const [isModelopen, setIsModelOpen] = useState(false);
  const { user, token } = useUser();
  const [formData, setFormData] = useState({
    projectName: "",
    organization_id: selectedOrganization?.id || "",
    owner_id: user?.id || "",
    status: "",
    type: "",
    dueDate: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      projectName: "",
      organization_id: selectedOrganization?.id || "",
      owner_id: user?.id || "",
      status: "",
      type: "",
      dueDate: "",
      description: ""
    });
    setSuccess(false);
  };
  const handleClose = () => {
    resetForm();
    setIsModelOpen(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      name: formData.projectName,
      organization_id: formData.organization_id,
      owner_id: formData.owner_id,
      status: formData.status,
      type: formData.type,
      start_date: new Date().toISOString().split("T")[0],
      end_date: formData.dueDate,
      description: formData.description
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects/create-project`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.status === 201) {
        console.log("Project created successfully:", response.data);
        setSuccess(true);
        setTimeout(() => {
          handleClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    } finally {
      setIsModelOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
     <button 
       onClick={() => setIsModelOpen(true)}
       className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
     >
       <CirclePlus size={24} />
     </button>
     {isModelopen && (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gray-900 px-8 py-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Create New Project
            </h2>
            <p className="text-blue-100 mt-1">
              {selectedOrganization ? `For ${selectedOrganization.name}` : "Please provide the information below"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 max-h-[calc(90vh-120px)] overflow-y-auto">
          {success ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Project Created Successfully!</h3>
              <p className="text-gray-600">Your project has been created and is ready to go.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Project Name
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.projectName}
                      placeholder="Enter your project name"
                      onChange={(e) => handleInputChange("projectName", e.target.value)}
                      className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300 text-gray-800 placeholder-gray-400"
                      required
                      disabled={loading}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Project Status
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300 text-gray-800 appearance-none"
                      required
                      disabled={loading}
                    >
                      <option value="">Select status</option>
                      <option value="active">📋 Active</option>
                      <option value="on_hold">🚀 On Hold</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Project Type
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.type}
                      placeholder="e.g., Web Development, Mobile App, etc."
                      onChange={(e) => handleInputChange("type", e.target.value)}
                      className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300 text-gray-800 placeholder-gray-400"
                      required
                      disabled={loading}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Due Date
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange("dueDate", e.target.value)}
                      className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 bg-gray-50 focus:bg-white hover:border-gray-300 text-gray-800"
                      required
                      disabled={loading}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Project Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={5}
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 resize-none bg-gray-50 focus:bg-white hover:border-gray-300 text-gray-800 placeholder-gray-400"
                    placeholder="Describe your project goals, requirements, and key deliverables..."
                    required
                    disabled={loading}
                  />
                  <div className="absolute top-4 right-4">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-center gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-8 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors duration-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative px-12 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 focus:ring-4 focus:ring-blue-200 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Create Project
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
     )}
    </>
  );
};

export default ProjectPopup;