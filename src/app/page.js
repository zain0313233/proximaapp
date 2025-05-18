"use client"
import {React,useState} from "react";
import NavBar from "../componenet/navbar";
import { Home, BarChart2, Settings, Layers } from "lucide-react";
import AppHome from "../componenet/Home";
import Bord from "../componenet/bord";
import Analytics from "../componenet/analytic";
import AppSettings from "../componenet/appsetting";

const Main = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} /> ,component: <AppHome/> },
    { name: "Board", icon: <Layers size={20} />, component: <Bord/> },
    { name: "Analytics", icon: <BarChart2 size={20} />, component: <Analytics/>},
    { name: "Settings", icon: <Settings size={20} /> ,component: <AppSettings/>}
  ];
  const activeComponent = menuItems.find(item => item.name === activeMenu)?.component;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     
      <header className="w-full bg-white shadow-sm">
        <NavBar />
      </header>

    
      <div className="flex flex-1">
       
        <aside className="w-64 bg-white border-r border-gray-200">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Menu</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                    activeMenu === item.name
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  {activeMenu === item.name && (
                   <>
                    <span className="ml-auto w-1 h-6 bg-blue-600 rounded-full"></span>
                   
                   </>
                    
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

      
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{activeMenu}</h1>
            {activeComponent}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;