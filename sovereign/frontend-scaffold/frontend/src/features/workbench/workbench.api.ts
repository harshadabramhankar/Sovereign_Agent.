import { apiClient } from '../../services/apiClient';

export const createTask = (payload: FormData) => apiClient.post('/tasks', payload);
export const getTask = (taskId: string) => apiClient.get(`/tasks/${taskId}`);
export const streamTask = (taskId: string) => `/api/tasks/${taskId}/stream`;
export const approveTask = (taskId: string) => apiClient.post(`/tasks/${taskId}/approve`);
export const rejectTask = (taskId: string) => apiClient.post(`/tasks/${taskId}/reject`);
