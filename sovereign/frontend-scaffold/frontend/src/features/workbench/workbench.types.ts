export interface Task {
  id: string;
  status: 'pending' | 'running' | 'awaiting_approval' | 'completed' | 'failed';
  modelSelected?: string;
}
