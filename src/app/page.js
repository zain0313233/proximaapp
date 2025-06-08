"use client"
import React, { useState } from "react";
import NavBar from "../componenet/navbar";
import { Home, BarChart2, Settings, Layers, Building2, ChevronRight, ChevronDown } from "lucide-react";
import AppHome from "../componenet/Home";
import Bord from "../componenet/bord";
import Analytics from "../componenet/analytic";
import Createtask from "@/componenet/createtask";
import AppSettings from "../componenet/appsetting";

const ProjectView = ({ project }) => (
  <div className="text-white">
    <h2 className="text-xl font-bold mb-4">{project.name}</h2>
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Description</h3>
        <p className="text-gray-300">{project.description}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Status</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${
          project.status === 'Active' ? 'bg-green-600' : 
          project.status === 'In Progress' ? 'bg-yellow-600' : 'bg-gray-600'
        }`}>
          {project.status}
        </span>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Team Members</h3>
        <div className="flex flex-wrap gap-2">
          {project.team.map((member, index) => (
            <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
              {member}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Tasks</h3>
        <ul className="space-y-2">
          {project.tasks.map((task, index) => (
            <li key={index} className="bg-gray-800 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span>{task.name}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  task.status === 'Completed' ? 'bg-green-600' : 
                  task.status === 'In Progress' ? 'bg-yellow-600' : 'bg-red-600'
                }`}>
                  {task.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Main = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [organizationExpanded, setOrganizationExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Mock projects data - replace with your actual data
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      description: "Complete overhaul of the company website with modern design and improved user experience.",
      status: "In Progress",
      team: ["John Doe", "Jane Smith", "Mike Johnson"],
      tasks: [
        { name: "Design mockups", status: "Completed" },
        { name: "Frontend development", status: "In Progress" },
        { name: "Content migration", status: "Pending" },
        { name: "Testing & QA", status: "Pending" }
      ]
    },
    {
      id: 2,
      name: "Mobile App Development",
      description: "Development of iOS and Android mobile applications for better customer engagement.",
      status: "Active",
      team: ["Sarah Wilson", "Tom Brown", "Lisa Davis"],
      tasks: [
        { name: "Requirements gathering", status: "Completed" },
        { name: "UI/UX Design", status: "Completed" },
        { name: "iOS Development", status: "In Progress" },
        { name: "Android Development", status: "In Progress" }
      ]
    },
    
  ];
  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> ,component: <AppHome/> },
    { name: "Board", icon: <Layers size={20} />, component: <Bord/> },
    { name: "Analytics", icon: <BarChart2 size={20} />, component: <Analytics/>},
    { name: "Organization", icon: <Building2 size={20} />, component: <Createtask/> },
    
    { name: "Settings", icon: <Settings size={20} /> ,component: <AppSettings/>}
  ];
  const handleMenuClick = (itemName) => {
    if (itemName === "Organization") {
      setOrganizationExpanded(!organizationExpanded);
      if (!organizationExpanded) {
        setActiveMenu(itemName);
        setSelectedProject(null);
      }
    } else {
      setActiveMenu(itemName);
      setOrganizationExpanded(false);
      setSelectedProject(null);
    }
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setActiveMenu("Organization");
  };

  const getActiveComponent = () => {
    if (activeMenu === "Organization" && selectedProject) {
      return <ProjectView project={selectedProject} />;
    }
    return menuItems.find(item => item.name === activeMenu)?.component;
  };
  const getPageTitle = () => {
    if (activeMenu === "Organization" && selectedProject) {
      return `Organization - ${selectedProject.name}`;
    }
    return activeMenu;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
     
      <header className="w-full bg-black shadow-sm">
        <NavBar setActiveComponent={setActiveMenu} />
      </header>

    
      <div className="flex flex-1">
       
        <aside className="w-64 bg-gray-800 border-r md:block hidden ">
          <div className="p-4"> 
           <div className="grid grid-cols-2">
             <h2 className="text-xl font-semibold text-gray-200 mb-6">Menu</h2>
              <h2 className="text-xl font-semibold text-gray-200 mb-6 justify-self-end"><Createtask/></h2>
              
 </div>
            <nav className="space-y-2">
             {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => handleMenuClick(item.name)}
                    className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                      activeMenu === item.name
                        ? "bg-gray-500 text-gray-100"
                        : "text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                    
                    {item.name === "Organization" && (
                      <span className="ml-auto">
                        {organizationExpanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </span>
                    )}
                    
                    {activeMenu === item.name && item.name !== "Organization" && (
                      <span className="ml-auto w-1 h-6 bg-gray-600 rounded-full"></span>
                    )}
                  </button>
                  
                
                  {item.name === "Organization" && organizationExpanded && (
                    <div className="ml-6 mt-2 px-4 py-2 bg-gray-700 rounded-lg">
                      <div className="flex items-center text-sm text-gray-300 flex-wrap">
                        <span className="font-medium text-gray-200 mr-2">Organization</span>
                        <ChevronRight size={14} className="mr-2" />
                        {projects.map((project, index) => (
                          <React.Fragment key={project.id}>
                            <button
                              onClick={() => handleProjectClick(project)}
                              className={`hover:text-white transition-colors p-1 ${
                                selectedProject?.id === project.id
                                  ? "text-blue-400 font-medium"
                                  : "text-gray-300"
                              }`}
                            >
                              {project.name}
                            </button>
                            {index < projects.length - 1 && (
                              <span className="mx-2 text-gray-500">,</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </aside>

      
        <main className="flex-1 md:p-6">
          <div className="bg-gray-900 rounded-lg shadow-sm p-6 md:p-2">
            <h1 className="text-2xl font-bold text-gray-200 mb-6">{getPageTitle()}</h1>
            {getActiveComponent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;