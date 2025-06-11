"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/context/UserContext";
import ProjectPopup from "../componenet/createproject";

const GetProject = ({ selectedOrganization }) => {
  const { user, token } = useUser();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id || !token || !selectedOrganization?.id) {
        setLoading(false);
        if (!selectedOrganization?.id) {
          setError("No organization selected");
        } else {
          setError("User not authenticated");
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);

        console.log("Fetching projects for user:", user.id);
        console.log("Organization ID:", selectedOrganization.id);
        console.log("Token available:", !!token);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects/get-org-project?owner_id=${user.id}&organization_id=${selectedOrganization.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        console.log("Response data:", response.data);
        const projectsData = response.data;
        
        if (Array.isArray(projectsData)) {
          setProjects(projectsData);
        } else if (projectsData && Array.isArray(projectsData.projects)) {
          setProjects(projectsData.projects);
        } else if (
          projectsData &&
          projectsData.data &&
          Array.isArray(projectsData.data)
        ) {
          setProjects(projectsData.data);
        } else {
          console.warn("Unexpected response format:", projectsData);
          setProjects([]);
        }
      } catch (error) {
        console.error("Error occurred:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);

        if (error.response?.status === 403) {
          setError("Access forbidden. Please check your permissions.");
        } else {
          setError(
            error.response?.data?.message ||
              error.message ||
              "Failed to fetch projects"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, token, selectedOrganization?.id]);

  if (loading) {
    return (
      <section className="bg-gray-900 h-screen w-auto flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-900 h-screen w-auto flex items-center justify-center">
        <div className="text-center bg-gray-800 p-8 rounded-xl border border-red-500">
          <div className="text-red-400 text-xl mb-2">⚠️ Error</div>
          <div className="text-red-300">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 min-h-screen w-auto p-3">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-white mb-2">
              Projects Dashboard
            </h1>
            <p className="text-gray-400">
              {selectedOrganization ? 
                `Managing projects for ${selectedOrganization.name}` : 
                "Select an organization to view projects"
              }
            </p>
          </div>
          <ProjectPopup selectedOrganization={selectedOrganization}/>
        </div>

        {!Array.isArray(projects) || projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl">
              {!Array.isArray(projects)
                ? "Error loading projects"
                : selectedOrganization 
                ? `No projects found for ${selectedOrganization.name}`
                : "No organization selected"}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-blue-600 transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white truncate">
                      {item.name || "Unnamed Project"}
                    </h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.status === "active"
                          ? "bg-green-900 text-green-300"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {item.status || "Unknown"}
                    </span>
                  </div>

                  <div className="mb-4">
                    <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {item.type || "Project"}
                    </span>
                  </div>

                  <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                    {item.description || "No description available"}
                  </p>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Project ID</span>
                      <span className="text-blue-400 font-mono text-sm">
                        #{item.id}
                      </span>
                    </div>

                    {item.organization_id && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">
                          Organization
                        </span>
                        <span className="text-white text-sm">
                          {selectedOrganization?.name || `Org #${item.organization_id}`}
                        </span>
                      </div>
                    )}

                    {item.owner_id && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Owner</span>
                        <span className="text-white text-sm">
                          User #{item.owner_id}
                        </span>
                      </div>
                    )}

                    {(item.start_date || item.end_date) && (
                      <div className="border-t border-gray-700 pt-3 mt-4">
                        {item.start_date && (
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400 text-sm">
                              Start Date
                            </span>
                            <span className="text-green-400 text-sm">
                              {new Date(item.start_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                        {item.end_date && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm">
                              End Date
                            </span>
                            <span className="text-red-400 text-sm">
                              {new Date(item.end_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GetProject;