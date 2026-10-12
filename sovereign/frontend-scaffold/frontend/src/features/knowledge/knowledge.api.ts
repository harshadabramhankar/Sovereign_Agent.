import { apiClient } from '../../services/apiClient';

export const listKnowledgeSources = () => apiClient.get('/knowledge/sources');
export const indexKnowledge = (payload: FormData) => apiClient.post('/knowledge/index', payload);
