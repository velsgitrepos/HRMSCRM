import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { loadRuntimeConfig, API_URL, SERVER_BASE_URL, getApiUrl } from '../config/appConfig';

export const AuthContext = createContext();

// Re-export API_URL and SERVER_BASE_URL for components
export { API_URL, SERVER_BASE_URL };

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const storedAdmin = localStorage.getItem('talent_carpet_admin');
    if (storedAdmin) {
      try {
        return JSON.parse(storedAdmin);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  // Load runtime config.json and check if admin is logged in on mount
  useEffect(() => {
    const initApp = async () => {
      await loadRuntimeConfig();
      axios.defaults.baseURL = getApiUrl();
      
      const storedAdmin = localStorage.getItem('talent_carpet_admin');
      if (storedAdmin) {
        try {
          const parsedAdmin = JSON.parse(storedAdmin);
          // Verify token validity by calling profile
          const res = await axios.get(`${API_URL}/auth/profile`, {
            headers: {
              Authorization: `Bearer ${parsedAdmin.token}`,
            },
          });
          if (res.data) {
            setAdmin(parsedAdmin);
          } else {
            localStorage.removeItem('talent_carpet_admin');
            setAdmin(null);
          }
        } catch (error) {
          console.error('Session restoration failed:', error.message);
          localStorage.removeItem('talent_carpet_admin');
          setAdmin(null);
        }
      }
    };

    initApp();
  }, []);

  // Login action
  const login = async (username, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { username, password });
      if (res.data && res.data.token) {
        localStorage.setItem('talent_carpet_admin', JSON.stringify(res.data));
        setAdmin(res.data);
        return { success: true };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      const msg = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message: msg };
    }
  };

  // Logout action
  const logout = () => {
    localStorage.removeItem('talent_carpet_admin');
    setAdmin(null);
  };

  // Helper to make authenticated requests
  const getAuthHeaders = () => {
    return {
      headers: {
        Authorization: `Bearer ${admin?.token}`,
      },
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#1E378B] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#75BB3F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, getAuthHeaders }}>
      {children}
    </AuthContext.Provider>
  );
};
