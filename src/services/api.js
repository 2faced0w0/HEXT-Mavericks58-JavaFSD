import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

// Add a request interceptor to add the token to requests
api.interceptors.request.use(
  (config) => {
    // Skip attaching the Bearer token for auth endpoints to prevent overriding Basic Auth or sending invalid tokens
    if (config.url && config.url.includes('/auth/')) {
      return config;
    }

    const token = localStorage.getItem('token');
    if (token && token !== 'null' && token !== 'undefined') {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: (username, password) => api.get('/auth/login', {
    auth: { username, password }
  }),
  signup: (data) => api.post('/auth/signup', data),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
};

export const customerService = {
  getProfile: () => api.get('/customers/profile'),
  updateProfile: (data) => api.put('/customers/profile', data)
};

export const promotionService = {
  validatePromoCode: (code) => api.get('/promotions/validate', { params: { code } }),
  deletePromotion: (id) => api.delete(`/promotions/${id}`),
  setActiveBanner: (id) => api.put(`/promotions/${id}/set-banner`)
};

export const vehicleService = {
  searchVehicles: (params) => api.get('/vehicles/search', { params }),
  addVehicle: (data) => api.post('/vehicles/add', data),
  updateVehicle: (id, data) => api.put(`/vehicles/${id}`, data),
  deleteVehicle: (id) => api.delete(`/vehicles/${id}`),
  updateStatus: (id, status) => api.put(`/vehicles/${id}/status`, null, { params: { status } }),
  finishMaintenance: (id) => api.put(`/vehicles/${id}/finish-maintenance`),
  getAllBrands: () => api.get('/vehicles/brands'),
  uploadImage: (fileData) => api.post('/vehicles/upload-image', fileData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAgentVehicles: (pageable) => api.get('/vehicles/agent', { params: pageable })
};

export const adminService = {
  createAgent: (data) => api.post('/admin/create-agent', data),
  getUsers: () => api.get('/users'),
  deactivateUser: (id) => api.put(`/users/${id}/deactivate`),
  activateUser: (id) => api.put(`/users/${id}/activate`),
  getPromotions: () => api.get('/promotions'),
  addPromotion: (data) => api.post('/promotions/add', data),
  getReports: () => api.get('/reports'),
  getRequests: () => api.get('/admin/requests'),
  resolvePasswordRequest: (id, newPassword) => api.post(`/admin/requests/${id}/resolve-password`, { newPassword }),
  resolveMaintenanceRequest: (id) => api.post(`/admin/requests/${id}/resolve-maintenance`),
  setActiveBanner: (id) => api.put(`/promotions/${id}/set-banner`)
};

export const reservationService = {
  createReservation: (data) => api.post('/reservations/add', data),
  getMyReservations: (pageable) => api.get('/reservations/my', { params: pageable }),
  getAgentReservations: (pageable) => api.get('/reservations/agent', { params: pageable }),
  cancelReservation: (id) => api.put(`/reservations/${id}/cancel`),
  modifyReservation: (id, data) => api.put(`/reservations/${id}`, data),
  confirmReservation: (id) => api.put(`/reservations/${id}/confirm`),
  checkIn: (id, condition) => api.post(`/reservations/${id}/check-in`, null, { params: { finalCondition: condition } }),
  checkOut: (id, condition) => api.post(`/reservations/${id}/check-out`, null, { params: { initialCondition: condition } })
};

export const maintenanceService = {
  getRecords: (params) => api.get('/maintenance', { params }),
  addRecord: (data) => api.post('/maintenance/add', data)
};

export const brandService = {
  getAllBrands: () => api.get('/vehicles/brands')
};

export default api;
