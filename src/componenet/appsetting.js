"use client"
import { useState } from 'react'
import { Bell, User, Globe, Shield, Moon, Sun, Save, ChevronDown } from 'lucide-react'

const AppSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      darkMode: false,
      compactView: true,
      autoSave: true,
      language: 'english'
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      taskReminders: true,
      weeklyDigest: false,
      mentionAlerts: true
    },
    privacy: {
      shareTaskData: false,
      profileVisibility: 'team',
      activityTracking: true,
      saveHistory: true
    },
    account: {
      name: 'Alex Johnson',
      email: 'alex.johnson@example.com',
      role: 'Project Manager',
      company: 'Acme Inc.'
    }
  });

  const handleToggle = (section, setting) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [setting]: !settings[section][setting]
      }
    });
  };

  const handleSelect = (section, setting, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [setting]: value
      }
    });
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <Globe size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <Shield size={16} /> },
    { id: 'account', label: 'Account', icon: <User size={16} /> }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'chinese', label: 'Chinese' },
  ];

  const profileVisibilityOptions = [
    { value: 'public', label: 'Public' },
    { value: 'team', label: 'Team Only' },
    { value: 'private', label: 'Private' }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  const renderGeneralSettings = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Dark Mode</h3>
          <p className="text-xs text-gray-500">Enable dark theme for the application</p>
        </div>
        <button 
          onClick={() => handleToggle('general', 'darkMode')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.general.darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle dark mode</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.general.darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
          <span className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
            {settings.general.darkMode ? <Moon size={12} className="text-white" /> : <Sun size={12} className="text-gray-400" />}
          </span>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Compact View</h3>
          <p className="text-xs text-gray-500">Show more content with reduced spacing</p>
        </div>
        <button 
          onClick={() => handleToggle('general', 'compactView')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.general.compactView ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle compact view</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.general.compactView ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Auto Save</h3>
          <p className="text-xs text-gray-500">Automatically save changes to tasks</p>
        </div>
        <button 
          onClick={() => handleToggle('general', 'autoSave')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.general.autoSave ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle auto save</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.general.autoSave ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <div>
        <label htmlFor="language" className="block text-sm font-medium text-gray-800">Language</label>
        <p className="text-xs text-gray-500 mb-2">Select your preferred language</p>
        <select 
          id="language" 
          value={settings.general.language} 
          onChange={(e) => handleSelect('general', 'language', e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>{lang.label}</option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Email Alerts</h3>
          <p className="text-xs text-gray-500">Receive notifications via email</p>
        </div>
        <button 
          onClick={() => handleToggle('notifications', 'emailAlerts')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.notifications.emailAlerts ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle email alerts</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.notifications.emailAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Push Notifications</h3>
          <p className="text-xs text-gray-500">Receive browser push notifications</p>
        </div>
        <button 
          onClick={() => handleToggle('notifications', 'pushNotifications')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.notifications.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle push notifications</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Task Reminders</h3>
          <p className="text-xs text-gray-500">Get reminders for upcoming tasks</p>
        </div>
        <button 
          onClick={() => handleToggle('notifications', 'taskReminders')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.notifications.taskReminders ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle task reminders</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.notifications.taskReminders ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Weekly Digest</h3>
          <p className="text-xs text-gray-500">Receive weekly summary of activities</p>
        </div>
        <button 
          onClick={() => handleToggle('notifications', 'weeklyDigest')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.notifications.weeklyDigest ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle weekly digest</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.notifications.weeklyDigest ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Mention Alerts</h3>
          <p className="text-xs text-gray-500">Get notified when you're mentioned</p>
        </div>
        <button 
          onClick={() => handleToggle('notifications', 'mentionAlerts')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.notifications.mentionAlerts ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle mention alerts</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.notifications.mentionAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Share Task Data</h3>
          <p className="text-xs text-gray-500">Allow your task data to be used for improvements</p>
        </div>
        <button 
          onClick={() => handleToggle('privacy', 'shareTaskData')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.privacy.shareTaskData ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle share task data</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.privacy.shareTaskData ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <div>
        <label htmlFor="profileVisibility" className="block text-sm font-medium text-gray-800">Profile Visibility</label>
        <p className="text-xs text-gray-500 mb-2">Choose who can see your profile</p>
        <select 
          id="profileVisibility" 
          value={settings.privacy.profileVisibility} 
          onChange={(e) => handleSelect('privacy', 'profileVisibility', e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {profileVisibilityOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Activity Tracking</h3>
          <p className="text-xs text-gray-500">Track your activity for productivity insights</p>
        </div>
        <button 
          onClick={() => handleToggle('privacy', 'activityTracking')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.privacy.activityTracking ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle activity tracking</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.privacy.activityTracking ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-gray-800">Save History</h3>
          <p className="text-xs text-gray-500">Save change history for your tasks</p>
        </div>
        <button 
          onClick={() => handleToggle('privacy', 'saveHistory')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full flex-shrink-0 ${settings.privacy.saveHistory ? 'bg-blue-600' : 'bg-gray-200'}`}
        >
          <span className="sr-only">Toggle save history</span>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.privacy.saveHistory ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-800">Name</label>
        <input 
          type="text" 
          id="name" 
          value={settings.account.name} 
          onChange={(e) => handleSelect('account', 'name', e.target.value)}
          className="mt-1 w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
        <input 
          type="email" 
          id="email" 
          value={settings.account.email}
          onChange={(e) => handleSelect('account', 'email', e.target.value)}
          className="mt-1 w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="role" className="block text-sm font-medium text-gray-800">Role</label>
        <input 
          type="text" 
          id="role" 
          value={settings.account.role}
          onChange={(e) => handleSelect('account', 'role', e.target.value)}
          className="mt-1 w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-800">Company</label>
        <input 
          type="text" 
          id="company" 
          value={settings.account.company}
          onChange={(e) => handleSelect('account', 'company', e.target.value)}
          className="mt-1 w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="pt-4">
        <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md font-medium flex items-center justify-center">
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'privacy':
        return renderPrivacySettings();
      case 'account':
        return renderAccountSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-50 sm:bg-transparent">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Settings</h1>
        <p className="text-gray-600 text-sm sm:text-base">Customize your application preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Mobile Tab Selector */}
        <div className="sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 text-left border-b border-gray-200"
          >
            <div className="flex items-center">
              <span className="mr-2">{currentTab.icon}</span>
              <span className="text-sm font-medium text-gray-800">{currentTab.label}</span>
            </div>
            <ChevronDown size={16} className={`text-gray-500 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {mobileMenuOpen && (
            <div className="border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium ${
                    activeTab === tab.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden sm:flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="p-4 sm:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default AppSettings