import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Reservation API calls
export const reservationAPI = {
  getAll: () => axios.get(`${API_URL}/reservations`),
  
  getById: (id) => axios.get(`${API_URL}/reservations/${id}`),
  
  create: (reservationData) => axios.post(`${API_URL}/reservations`, reservationData),
  
  update: (id, reservationData) => axios.put(`${API_URL}/reservations/${id}`, reservationData),
  
  cancel: (id) => axios.delete(`${API_URL}/reservations/${id}`),
  
  getAvailableSlots: (date, partySize) => 
    axios.get(`${API_URL}/reservations/available-slots`, {
      params: { date, partySize }
    })
};

// Table API calls
export const tableAPI = {
  getAll: () => axios.get(`${API_URL}/tables`),
  
  getById: (id) => axios.get(`${API_URL}/tables/${id}`),
  
  updateAvailability: (id, isAvailable) => 
    axios.put(`${API_URL}/tables/${id}/availability`, { isAvailable })
};
