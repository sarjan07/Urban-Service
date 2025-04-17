/**
 * Authentication service for handling user registration, login, and session management
 */
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:4000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and user data on unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Don't redirect here, let the components handle navigation
    }
    return Promise.reject(error);
  }
);

class AuthService {
  // Set auth token
  static setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    }
  }

  // Get auth token
  static getToken() {
    return localStorage.getItem('token');
  }

  // Register new user
  static async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        this.setToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  }

  // Login user
  static async login(credentials) {
    try {
      const response = await api.post('/user/login', credentials);
      if (response.data.token) {
        this.setToken(response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  }

  // Logout user
  static logout() {
    this.setToken(null);
    localStorage.removeItem('user');
    // Return true to indicate successful logout
    return true;
  }

  // Get current user
  static async getCurrentUser() {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      // Don't logout here, let the components handle it
      return null;
    }
  }

  // Update user profile
  static async updateProfile(userData) {
    try {
      const response = await api.put('/auth/profile', userData);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Profile update failed' };
    }
  }

  // Change password
  static async changePassword(passwordData) {
    try {
      const response = await api.put('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password change failed' };
    }
  }

  // Request password reset
  static async requestPasswordReset(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset request failed' };
    }
  }

  // Reset password
  static async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  }

  // Verify email
  static async verifyEmail(token) {
    try {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Email verification failed' };
    }
  }

  // Resend verification email
  static async resendVerificationEmail() {
    try {
      const response = await api.post('/auth/resend-verification');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to resend verification email' };
    }
  }
}

export default AuthService; 