"use client"
import React, { useState, useEffect } from "react";
import NavBar from "../componenet/navbar";
import { Home, BarChart2, Settings, Layers, Building2, ChevronRight, ChevronDown } from "lucide-react";
import AppHome from "../componenet/Home";
import Bord from "../componenet/bord";
import Analytics from "../componenet/analytic";
import Createtask from "@/componenet/createtask";
import GetProject from "../componenet/getprojects";
import AppSettings from "../componenet/appsetting";
import { useUser } from "@/context/UserContext";
import axios from "axios";

const Main = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [showOrgSubmenu, setShowOrgSubmenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = useUser();

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, component: <AppHome/> },
    { name: "Board", icon: <Layers size={20} />, component: <Bord/> },
    { name: "Analytics", icon: <BarChart2 size={20} />, component: <Analytics/>},
    { name: "Organization", icon: <Building2 size={20} />, component: <GetProject selectedOrganization={selectedOrganization}/> },
    { name: "Settings", icon: <Settings size={20} />, component: <AppSettings/>}
  ];

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (!user?.id || !token) return;
      
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/organizations/get-user-orgs?owner_id=${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        if (response.data.status === "success") {
          setOrganizations(response.data.data);
          if (response.data.data.length > 0) {
            setSelectedOrganization(response.data.data[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching organizations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [user?.id, token]);

  const handleMenuClick = (itemName) => {
    if (itemName === "Organization") {
      setShowOrgSubmenu(!showOrgSubmenu);
    } else {
      setActiveMenu(itemName);
      setShowOrgSubmenu(false);
    }
  };

  const handleOrganizationSelect = (org) => {
    setSelectedOrganization(org);
    setActiveMenu("Organization");
    setShowOrgSubmenu(false);
  };

  const getActiveComponent = () => {
    return menuItems.find(item => item.name === activeMenu)?.component;
  };

  const getPageTitle = () => {
    if (activeMenu === "Organization" && selectedOrganization) {
      return `${activeMenu} - ${selectedOrganization.name}`;
    }
    return activeMenu;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="w-full bg-black shadow-sm">
        <NavBar setActiveComponent={setActiveMenu} />
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 border-r md:block hidden">
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
                        {showOrgSubmenu ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </span>
                    )}
                  </button>
                  
                  {item.name === "Organization" && showOrgSubmenu && (
                    <div className="ml-6 mt-2 space-y-1">
                      {loading ? (
                        <div className="px-4 py-2 text-gray-400 text-sm">Loading...</div>
                      ) : organizations.length > 0 ? (
                        organizations.map((org) => (
                          <button
                            key={org.id}
                            onClick={() => handleOrganizationSelect(org)}
                            className={`flex items-center w-full px-4 py-2 text-left rounded-lg transition-colors text-sm ${
                              selectedOrganization?.id === org.id
                                ? "bg-blue-600 text-white"
                                : "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                            }`}
                          >
                            <Building2 size={14} className="mr-2" />
                            {org.name}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray-400 text-sm">No organizations found</div>
                      )}
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