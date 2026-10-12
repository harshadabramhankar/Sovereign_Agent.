import { apiClient } from '../../services/apiClient';

export const listAuditLogs = () => apiClient.get('/audit-logs');
