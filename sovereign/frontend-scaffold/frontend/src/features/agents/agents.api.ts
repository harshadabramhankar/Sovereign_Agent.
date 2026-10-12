import { apiClient } from '../../services/apiClient';

export const listAgents = () => apiClient.get('/agents');
export const listModels = () => apiClient.get('/models');
