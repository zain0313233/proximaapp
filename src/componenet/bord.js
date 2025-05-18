"use client"
import { useState } from 'react'

const Board = () => {
  const [tasks, setTasks] = useState([
    { 
      id: 't1', 
      title: 'Website Redesign', 
      description: 'Update the company website with new branding',
      assignee: 'Alex Wong',
      dueDate: '2025-06-15',
      priority: 'high',
      status: 'todo',
      tags: ['design', 'frontend']
    },
    { 
      id: 't2', 
      title: 'API Integration', 
      description: 'Connect the app with payment gateway API',
      assignee: 'Sarah Chen',
      dueDate: '2025-06-10',
      priority: 'medium',
      status: 'inProgress',
      tags: ['backend', 'api']
    },
    { 
      id: 't3', 
      title: 'User Testing', 
      description: 'Conduct user testing sessions for new features',
      assignee: 'Mark Johnson',
      dueDate: '2025-06-05',
      priority: 'high',
      status: 'inProgress',
      tags: ['research', 'ux']
    },
    { 
      id: 't4', 
      title: 'Documentation', 
      description: 'Update user documentation for v2.0 release',
      assignee: 'Alex Wong',
      dueDate: '2025-05-30',
      priority: 'low',
      status: 'done',
      tags: ['documentation']
    },
    { 
      id: 't5', 
      title: 'Database Migration', 
      description: 'Migrate user data to new database structure',
      assignee: 'Sarah Chen',
      dueDate: '2025-06-20',
      priority: 'medium',
      status: 'todo',
      tags: ['database', 'backend']
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'todo': return 'bg-purple-100 text-purple-800';
      case 'inProgress': return 'bg-blue-100 text-blue-800';
      case 'done': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'todo': return 'To Do';
      case 'inProgress': return 'In Progress';
      case 'done': return 'Done';
      default: return status;
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filterStatus === 'all') return true;
    return task.status === filterStatus;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Task Board</h1>
        <p className="text-gray-600">Manage and track your project tasks</p>
      </div>
      
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div>
          <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
          <select 
            id="filterStatus" 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Tasks</option>
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
          <select 
            id="sortBy" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
          <div className="col-span-5 font-medium text-gray-700">Task</div>
          <div className="col-span-2 font-medium text-gray-700">Assignee</div>
          <div className="col-span-2 font-medium text-gray-700">Due Date</div>
          <div className="col-span-1 font-medium text-gray-700">Priority</div>
          <div className="col-span-2 font-medium text-gray-700">Status</div>
        </div>
        
        {sortedTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No tasks match your filters
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {sortedTasks.map((task) => (
              <div key={task.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50">
                <div className="col-span-5">
                  <h3 className="font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {task.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">{task.assignee}</span>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className="text-sm text-gray-700">{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
                
                <div className="col-span-1 flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-md ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-md ${getStatusColor(task.status)}`}>
                    {getStatusLabel(task.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Board