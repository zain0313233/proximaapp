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
    <div className="flex flex-col min-h-screen bg-gray-900">
     
      <header className="w-full bg-black shadow-sm">
        <NavBar setActiveComponent={setActiveMenu} />
      </header>

    
      <div className="flex flex-1">
       
        <aside className="w-64 bg-gray-800 border-r md:block hidden ">
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-200 mb-6">Menu</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors ${
                    activeMenu === item.name
                      ? "bg-gray-500 text-gray-100"
                      : "text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                  {activeMenu === item.name && (
                   <>
                    <span className="ml-auto w-1 h-6 bg-gray-600 rounded-full"></span>
                   
                   </>
                    
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

      
        <main className="flex-1 md:p-6">
          <div className="bg-gray-900 rounded-lg shadow-sm p-6 md:p-2">
            <h1 className="text-2xl font-bold text-gray-200 mb-6">{activeMenu}</h1>
            {activeComponent}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Main;