import { apiClient } from '../../services/apiClient';

export const login = (email: string, password: string) =>
  apiClient.post('/auth/login', { email, password });

export const getCurrentUser = () => apiClient.get('/auth/me');
