import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);

// VEHICLES
export const getAllVehicles = () => api.get('/vehicles/all');
export const getAvailableVehicles = () => api.get('/vehicles/available');
export const getVehicleById = (id) => api.get(`/vehicles/${id}`);
export const searchVehicles = (keyword) => api.get(`/vehicles/search?keyword=${keyword}`);
export const getVehiclesByCategory = (category) => api.get(`/vehicles/category?category=${category}`);
export const addVehicle = (formData) => api.post('/vehicles/add', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateVehicle = (id, formData) => api.put(`/vehicles/update/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteVehicle = (id) => api.delete(`/vehicles/delete/${id}`);

// RESERVATIONS
export const createReservation = (data) => api.post('/reservations/create', data);
export const getAllReservations = () => api.get('/reservations/all');
export const getUserReservations = (userId) => api.get(`/reservations/user/${userId}`);
export const cancelReservation = (id) => api.put(`/reservations/cancel/${id}`);
export const confirmReservation = (id) => api.put(`/reservations/confirm/${id}`);

// PAYMENTS
export const processPayment = (data) => api.post('/payments/pay', data);
export const getUserPayments = (userId) => api.get(`/payments/user/${userId}`);
export const getTotalRevenue = () => api.get('/payments/revenue');

export default api;