import { apiClient } from '../../services/apiClient';

export const uploadDocument = (payload: FormData) => apiClient.post('/documents/upload', payload);
export const listDocuments = () => apiClient.get('/documents');
export const getDocument = (documentId: string) => apiClient.get(`/documents/${documentId}`);
export const deleteDocument = (documentId: string) => apiClient.delete(`/documents/${documentId}`);
