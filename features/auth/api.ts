import { apiClient } from 'libs/api';

export const loginReq = (user: { email: string; password: string }) =>
  apiClient.post('/sign-in', { user });

export const logout = () => apiClient.delete('/logout');
