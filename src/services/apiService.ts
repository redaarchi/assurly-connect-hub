
import axios, { AxiosResponse } from 'axios';
import { ApiResponse, PersonalInfo, PaymentCard, ElectronicSignature, Notification, Contract, DashboardStats } from '@/types/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Create axios instance with interceptors
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Dashboard
  getDashboardStats: (): Promise<ApiResponse<DashboardStats>> =>
    apiClient.get('/dashboard/stats').then(res => res.data),

  // Personal Info
  getPersonalInfo: (): Promise<ApiResponse<PersonalInfo>> =>
    apiClient.get('/profile/personal-info').then(res => res.data),

  updatePersonalInfo: (data: Partial<PersonalInfo>): Promise<ApiResponse<PersonalInfo>> =>
    apiClient.put('/profile/personal-info', data).then(res => res.data),

  uploadProfileImage: (file: File): Promise<ApiResponse<{ imageUrl: string }>> => {
    const formData = new FormData();
    formData.append('profileImage', file);
    return apiClient.post('/profile/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(res => res.data);
  },

  // Electronic Signature
  getElectronicSignature: (): Promise<ApiResponse<ElectronicSignature | null>> =>
    apiClient.get('/signature/current').then(res => res.data),

  saveElectronicSignature: (signatureData: string): Promise<ApiResponse<ElectronicSignature>> =>
    apiClient.post('/signature/save', { signatureData }).then(res => res.data),

  deleteElectronicSignature: (): Promise<ApiResponse<void>> =>
    apiClient.delete('/signature/current').then(res => res.data),

  // Payment Cards
  getPaymentCards: (): Promise<ApiResponse<PaymentCard[]>> =>
    apiClient.get('/payment/cards').then(res => res.data),

  addPaymentCard: (cardData: any): Promise<ApiResponse<PaymentCard>> =>
    apiClient.post('/payment/cards', cardData).then(res => res.data),

  deletePaymentCard: (cardId: string): Promise<ApiResponse<void>> =>
    apiClient.delete(`/payment/cards/${cardId}`).then(res => res.data),

  setDefaultCard: (cardId: string): Promise<ApiResponse<void>> =>
    apiClient.put(`/payment/cards/${cardId}/set-default`).then(res => res.data),

  // Notifications
  getNotifications: (): Promise<ApiResponse<Notification[]>> =>
    apiClient.get('/notifications').then(res => res.data),

  markNotificationAsRead: (notificationId: string): Promise<ApiResponse<void>> =>
    apiClient.put(`/notifications/${notificationId}/read`).then(res => res.data),

  markAllNotificationsAsRead: (): Promise<ApiResponse<void>> =>
    apiClient.put('/notifications/mark-all-read').then(res => res.data),

  // Contracts
  getContracts: (): Promise<ApiResponse<Contract[]>> =>
    apiClient.get('/contracts').then(res => res.data),

  getContract: (contractId: string): Promise<ApiResponse<Contract>> =>
    apiClient.get(`/contracts/${contractId}`).then(res => res.data),

  signContract: (contractId: string, signatureId: string): Promise<ApiResponse<Contract>> =>
    apiClient.post(`/contracts/${contractId}/sign`, { signatureId }).then(res => res.data),

  downloadContractPdf: (contractId: string): Promise<Blob> =>
    apiClient.get(`/contracts/${contractId}/pdf`, { responseType: 'blob' }).then(res => res.data),

  // Insurance Requests
  createInsuranceRequest: (requestData: any): Promise<ApiResponse<any>> =>
    apiClient.post('/insurance/requests', requestData).then(res => res.data),

  getInsuranceRequests: (): Promise<ApiResponse<any[]>> =>
    apiClient.get('/insurance/requests').then(res => res.data),
};
