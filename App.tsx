
import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from './types';
import Dashboard from './components/Dashboard';
import KanbanBoard from './components/KanbanBoard';
import Assistant from './components/Assistant';

const initialTasks: Task[] = [
  { id: '1', title: 'Design System Update', description: 'Refresh the primary color palette and component library documentation.', status: 'in-progress', priority: 'high', assignee: 'Alex', dueDate: 'Oct 24' },
  { id: '2', title: 'API Integration', description: 'Connect the frontend dashboard to the new Gemini model endpoint.', status: 'todo', priority: 'medium', assignee: 'Jordan', dueDate: 'Oct 25' },
  { id: '3', title: 'Bug: Navigation Flicker', description: 'Investigate and fix the layout shift on initial route load.', status: 'review', priority: 'high', assignee: 'Sam', dueDate: 'Oct 22' },
  { id: '4', title: 'Mobile Responsiveness', description: 'Optimize the Kanban board for tablet and mobile viewport sizes.', status: 'done', priority: 'low', assignee: 'Taylor', dueDate: 'Oct 20' },
  { id: '5', title: 'User Feedback Loop', description: 'Implement a feedback collection modal for beta testers.', status: 'todo', priority: 'medium', assignee: 'Jordan', dueDate: 'Oct 28' },
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'board'>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleUpdateStatus = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-slate-200 transition-all duration-300 flex flex-col z-20`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-blue-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          {sidebarOpen && <span className="font-bold text-xl text-slate-800 tracking-tight">Nexus AI</span>}
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button 
            onClick={() => setActiveTab('board')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'board' ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7"/></svg>
            {sidebarOpen && <span>Task Board</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
           <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-xl">
              <img src="https://picsum.photos/100" alt="Profile" className="w-8 h-8 rounded-full" />
              {sidebarOpen && (
                <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold text-slate-800 truncate">Sarah Chen</p>
                  <p className="text-[10px] text-slate-500 truncate">Lead Architect</p>
                </div>
              )}
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              {activeTab === 'dashboard' ? 'Project Analytics' : 'Development Sprint'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200">
              <svg className="w-4 h-4 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input type="text" placeholder="Search resources..." className="bg-transparent border-none outline-none text-sm w-48 text-slate-600" />
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-full">
            <div className="flex-1">
              {activeTab === 'dashboard' ? <Dashboard tasks={tasks} /> : <KanbanBoard tasks={tasks} onUpdateStatus={handleUpdateStatus} />}
            </div>
            
            {/* AI Side Panel - Always accessible */}
            <div className="w-full lg:w-96 shrink-0 lg:sticky lg:top-0 h-[600px]">
              <Assistant tasks={tasks} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
