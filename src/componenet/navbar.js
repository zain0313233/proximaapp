"use client"
import { useState } from 'react'
import { Settings, LogOut, CheckSquare, Home, Layers, BarChart2, X, Menu } from 'lucide-react'
import AppHome from "./Home";
import Board from "./bord";
import Analytics from "./analytic";
import AppSettings from "./appsetting";

const Navbar = ({ setActiveComponent }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, component: <AppHome /> },
    { name: "Board", icon: <Layers size={20} />, component: <Board /> },
    { name: "Analytics", icon: <BarChart2 size={20} />, component: <Analytics /> },
    { name: "Settings", icon: <Settings size={20} />, component: <AppSettings /> }
  ];

  const handleMenuClick = (component) => {
    setActiveComponent(component);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white h-16 flex items-center justify-between px-6 shadow-lg relative z-20">
      <div className="flex items-center space-x-2">
        <CheckSquare className="w-6 h-6 text-blue-400" />
        <span className="text-xl font-bold">Proxima</span>
      </div>

      <div className="hidden md:flex items-center">
        <ul className="flex space-x-8 text-sm font-bold">
          <li 
            className="hover:text-blue-400 transition-colors cursor-pointer"
            // onClick={() => handleMenuClick(menuItems[0].component)}
          >
            Dashboard
          </li>
          <li 
            className="hover:text-blue-400 transition-colors cursor-pointer"
            // onClick={() => handleMenuClick(menuItems[1].component)}
          >
            My Tasks
          </li>
          <li 
            className="hover:text-blue-400 transition-colors cursor-pointer"
            // onClick={() => handleMenuClick(menuItems[2].component)}
          >
            Projects
          </li>
          <li 
            className="hover:text-blue-400 transition-colors cursor-pointer"
            // onClick={() => handleMenuClick(menuItems[3].component)}
          >
            Calendar
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-5">
        <button className="hover:text-blue-400 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="hover:text-blue-400 transition-colors">
          <LogOut className="w-5 h-5" />
        </button>
        <div className="md:hidden">
          <button 
            className="hover:text-blue-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-black border-t border-gray-700 md:hidden z-10">
          <div className="flex flex-col">
            {menuItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleMenuClick(item.component)}
                className="flex items-center space-x-3 px-6 py-4 hover:bg-gray-800 w-full text-left"
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar