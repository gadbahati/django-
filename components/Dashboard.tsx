
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { Task } from '../types';

const data = [
  { name: 'Mon', tasks: 4, completed: 2 },
  { name: 'Tue', tasks: 7, completed: 5 },
  { name: 'Wed', tasks: 5, completed: 4 },
  { name: 'Thu', tasks: 8, completed: 6 },
  { name: 'Fri', tasks: 12, completed: 8 },
  { name: 'Sat', tasks: 6, completed: 5 },
  { name: 'Sun', tasks: 3, completed: 3 },
];

const pieData = [
  { name: 'To Do', value: 400, color: '#94a3b8' },
  { name: 'In Progress', value: 300, color: '#3b82f6' },
  { name: 'Review', value: 200, color: '#eab308' },
  { name: 'Done', value: 500, color: '#10b981' },
];

const StatCard = ({ title, value, change, color }: { title: string, value: string, change: string, color: string }) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
    <div className="flex items-end justify-between mt-2">
      <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${color}`}>
        {change}
      </span>
    </div>
  </div>
);

const Dashboard: React.FC<{ tasks: Task[] }> = ({ tasks }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Velocity" value="84%" change="+12%" color="bg-emerald-100 text-emerald-700" />
        <StatCard title="Active Sprints" value="3" change="Steady" color="bg-blue-100 text-blue-700" />
        <StatCard title="Total Tasks" value={tasks.length.toString()} change={`+${tasks.length}`} color="bg-slate-100 text-slate-700" />
        <StatCard title="Team Morale" value="High" change="Peak" color="bg-purple-100 text-purple-700" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Task Completion Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="tasks" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTasks)" strokeWidth={2} />
                <Area type="monotone" dataKey="completed" stroke="#10b981" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Status Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-800">72%</span>
              <span className="text-xs text-slate-500">Done</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}}></div>
                <span className="text-sm text-slate-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
