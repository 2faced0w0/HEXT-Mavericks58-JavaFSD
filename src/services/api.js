import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Add a request interceptor to add the token to requests
api.interceptors.request.use(
  (config) => {
    // Skip attaching the Bearer token for auth endpoints to prevent overriding Basic Auth or sending invalid tokens
    if (config.url && config.url.includes('/auth/')) {
      return config;
    }

    const token = localStorage.getItem('token');
    if (token) {
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
    auth: { username, password } // The backend login endpoint seems to use Basic Auth to get the token, wait... let me check AuthController
  }),
  signup: (data) => api.post('/auth/signup', data),
};

export const vehicleService = {
  searchVehicles: (params) => api.get('/vehicles/search', { params }),
  addVehicle: (data) => api.post('/vehicles/add', data),
  updateVehicle: (id, data) => api.put(`/vehicles/${id}`, data),
  deleteVehicle: (id) => api.delete(`/vehicles/${id}`),
  updateStatus: (id, isAvailable) => api.put(`/vehicles/${id}/status`, null, { params: { isAvailable } })
};

export const adminService = {
  createAgent: (data) => api.post('/admin/create-agent', data),
  getUsers: () => api.get('/users'),
  deactivateUser: (id) => api.put(`/users/${id}/deactivate`),
  activateUser: (id) => api.put(`/users/${id}/activate`),
  getPromotions: () => api.get('/promotions'),
  addPromotion: (data) => api.post('/promotions/add', data),
  getReports: () => api.get('/reports')
};

export const reservationService = {
  createReservation: (data) => api.post('/reservations/add', data),
  getMyReservations: (pageable) => api.get('/reservations/my/past', { params: pageable }),
  checkIn: (id, condition) => api.post(`/reservations/${id}/check-in`, null, { params: { finalCondition: condition } }),
  checkOut: (id, condition) => api.post(`/reservations/${id}/check-out`, null, { params: { initialCondition: condition } })
};

export const maintenanceService = {
  getRecords: (params) => api.get('/maintenance', { params }),
  addRecord: (data) => api.post('/maintenance/add', data)
};

export default api;
