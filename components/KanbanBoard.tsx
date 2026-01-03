
import React, { useState } from 'react';
import { Task, TaskStatus } from '../types';

interface KanbanBoardProps {
  tasks: Task[];
  onUpdateStatus: (id: string, newStatus: TaskStatus) => void;
}

const columns: { id: TaskStatus; title: string; color: string }[] = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-100' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-50' },
  { id: 'review', title: 'Review', color: 'bg-amber-50' },
  { id: 'done', title: 'Done', color: 'bg-emerald-50' },
];

const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks, onUpdateStatus }) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    e.dataTransfer.setData('taskId', id);
  };

  const onDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('taskId');
    onUpdateStatus(id, status);
    setDraggingId(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full min-h-[600px] animate-fadeIn">
      {columns.map((column) => (
        <div 
          key={column.id} 
          className={`${column.color} rounded-2xl p-4 flex flex-col border border-slate-200/50`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, column.id)}
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-slate-700 uppercase text-xs tracking-widest">{column.title}</h3>
            <span className="bg-white px-2 py-0.5 rounded-full text-xs font-bold text-slate-500 shadow-sm">
              {tasks.filter(t => t.status === column.id).length}
            </span>
          </div>

          <div className="space-y-4 overflow-y-auto no-scrollbar flex-1">
            {tasks
              .filter((task) => task.status === column.id)
              .map((task) => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, task.id)}
                  className={`bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:border-blue-300 transition-colors group ${draggingId === task.id ? 'opacity-50' : ''}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      task.priority === 'high' ? 'bg-red-100 text-red-600' :
                      task.priority === 'medium' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {task.priority}
                    </span>
                    <button className="text-slate-300 group-hover:text-slate-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
                    </button>
                  </div>
                  <h4 className="font-semibold text-slate-800 text-sm mb-1">{task.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{task.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                        {task.assignee.charAt(0)}
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{task.dueDate}</span>
                  </div>
                </div>
              ))}
          </div>
          
          <button className="mt-4 w-full py-2 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 text-sm font-medium hover:border-slate-400 hover:text-slate-500 transition-all flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
            Add Task
          </button>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
