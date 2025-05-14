import React from 'react'
import { Settings, LogOut, CheckSquare } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className="bg-black text-white h-16 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center space-x-2">
        <CheckSquare className="w-6 h-6 text-blue-400" />
        <span className="text-xl font-bold">Proxima</span>
      </div>

      <div className="hidden md:flex items-center">
        <ul className="flex space-x-8 text-sm font-bold">
          <li className="hover:text-blue-400 transition-colors cursor-pointer">Dashboard</li>
          <li className="hover:text-blue-400 transition-colors cursor-pointer">My Tasks</li>
          <li className="hover:text-blue-400 transition-colors cursor-pointer">Projects</li>
          <li className="hover:text-blue-400 transition-colors cursor-pointer">Calendar</li>
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
          <button className="hover:text-blue-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar