import axios from 'axios';

// Define the base URL for the API
const API_BASE_URL = 'http://localhost:3000/api/payment';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Service methods for payment operations
const paymentService = {
  // Get all payment methods
  getAllPayments: async () => {
    try {
      const response = await api.get('/get');
      return response.data;
    } catch (error) {
      console.error('Error fetching payment methods:', error);
      throw error;
    }
  },

  // Create a new payment method
  createPaymentMethod: async (paymentData) => {
    try {
      const response = await api.post('/create', paymentData);
      return response.data;
    } catch (error) {
      console.error('Error creating payment method:', error);
      throw error;
    }
  },

  // Update an existing payment method
  updatePaymentMethod: async (id, paymentData) => {
    try {
      const response = await api.put(`/updatepay/${id}`, paymentData);
      return response.data;
    } catch (error) {
      console.error('Error updating payment method:', error);
      throw error;
    }
  },

  // Delete a payment method
  deletePaymentMethod: async (id) => {
    try {
      const response = await api.delete(`/delpay/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting payment method:', error);
      throw error;
    }
  }
};

export default paymentService; 