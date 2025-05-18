"use client"
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Analytics = () => {
  const [timeFrame, setTimeFrame] = useState('week');
  
  // Sample data for task statistics
  const tasksByStatus = [
    { name: 'To Do', value: 12, color: '#9333ea' },
    { name: 'In Progress', value: 8, color: '#3b82f6' },
    { name: 'Done', value: 21, color: '#22c55e' }
  ];
  
  const tasksByPriority = [
    { name: 'High', value: 9, color: '#ef4444' },
    { name: 'Medium', value: 18, color: '#f59e0b' },
    { name: 'Low', value: 14, color: '#10b981' }
  ];
  
  const taskCompletionData = [
    { day: 'Mon', completed: 3 },
    { day: 'Tue', completed: 5 },
    { day: 'Wed', completed: 2 },
    { day: 'Thu', completed: 7 },
    { day: 'Fri', completed: 4 },
    { day: 'Sat', completed: 1 },
    { day: 'Sun', completed: 0 }
  ];
  
  const teamPerformanceData = [
    { name: 'Alex', tasks: 12 },
    { name: 'Sarah', tasks: 9 },
    { name: 'Mark', tasks: 7 },
    { name: 'Lisa', tasks: 11 },
    { name: 'Ryan', tasks: 6 }
  ];
  
  // Time frame options
  const timeFrames = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p className="text-gray-600">Task performance and productivity metrics</p>
      </div>
      
      <div className="mb-6">
        <div className="inline-flex rounded-md shadow-sm">
          {timeFrames.map((frame) => (
            <button
              key={frame.value}
              onClick={() => setTimeFrame(frame.value)}
              className={`px-4 py-2 text-sm font-medium ${
                timeFrame === frame.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } ${
                frame.value === 'week'
                  ? 'rounded-l-md'
                  : frame.value === 'quarter'
                  ? 'rounded-r-md'
                  : ''
              } border border-gray-300`}
            >
              {frame.label}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tasks by Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tasksByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {tasksByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Tasks by Priority</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tasksByPriority}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {tasksByPriority.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Task Completion Over Time</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={taskCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Tasks Completed" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Performance</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" name="Tasks Completed" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <h3 className="text-sm font-medium text-purple-800">Total Tasks</h3>
            <p className="text-3xl font-bold text-purple-900 mt-2">41</p>
            <p className="text-sm text-purple-700 mt-1">+12% from last week</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800">Completion Rate</h3>
            <p className="text-3xl font-bold text-blue-900 mt-2">51%</p>
            <p className="text-sm text-blue-700 mt-1">+5% from last week</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-100">
            <h3 className="text-sm font-medium text-green-800">On-time Delivery</h3>
            <p className="text-3xl font-bold text-green-900 mt-2">87%</p>
            <p className="text-sm text-green-700 mt-1">+2% from last week</p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <h3 className="text-sm font-medium text-yellow-800">Avg. Completion Time</h3>
            <p className="text-3xl font-bold text-yellow-900 mt-2">3.2 days</p>
            <p className="text-sm text-yellow-700 mt-1">-0.5 days from last week</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics