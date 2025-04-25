import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Create axios instance with base configuration
  const api = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to include auth token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add response interceptor for better error handling
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      return Promise.reject(error);
    }
  );

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const [eventsData, categoriesData] = await Promise.all([
          api.get('/events').then(res => res.data),
          api.get('/categories').then(res => res.data),
        ]);
        setEvents(eventsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      try {
        setLoading(true);
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch (err) {
        console.error('Error fetching current user:', err);
        localStorage.removeItem('token'); // Invalid token, clear it
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCurrentUser();
  }, []);

  // Auth functions
  const login = async (credentials) => {
    try {
      setError(null); // Clear any previous errors
      const { data } = await api.post('/auth/login', credentials);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      setAuthToken(data.token);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      const { data } = await api.post('/auth/register', userData);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError(null);
  };

  // Event functions
  const createEvent = async (eventData) => {
    try {
      setError(null);
      const { data } = await api.post('/events', eventData);
      setEvents([...events, data]);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create event.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateEvent = async (id, eventData) => {
    try {
      setError(null);
      const { data } = await api.put(`/events/${id}`, eventData);
      setEvents(events.map(event => event._id === id ? data : event));
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update event.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteEvent = async (id) => {
    try {
      setError(null);
      await api.delete(`/events/${id}`);
      setEvents(events.filter(event => event._id !== id));
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete event.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Category functions
  const createCategory = async (categoryData) => {
    try {
      setError(null);
      const { data } = await api.post('/categories', categoryData);
      setCategories([...categories, data]);
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to create category.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateCategory = async (id, categoryData) => {
    try {
      setError(null);
      const { data } = await api.put(`/categories/${id}`, categoryData);
      setCategories(categories.map(category => category._id === id ? data : category));
      return data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update category.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteCategory = async (id) => {
    try {
      setError(null);
      await api.delete(`/categories/${id}`);
      setCategories(categories.filter(category => category._id !== id));
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to delete category.';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const value = {
    user,
    events,
    categories,
    loading,
    error,
    login,
    register,
    logout,
    createEvent,
    updateEvent,
    deleteEvent,
    createCategory,
    updateCategory,
    deleteCategory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}; 