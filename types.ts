
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
}

export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  ongoingTasks: number;
  efficiency: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
