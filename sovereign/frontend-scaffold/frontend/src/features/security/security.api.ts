import { apiClient } from '../../services/apiClient';

export const getNetworkStatus = () => apiClient.get('/security/network-status');
export const getExternalCalls = () => apiClient.get('/security/external-calls');
