// src/utils/api.js

import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-hot-toast";


const API_BASE_URL = "http://localhost:5000/api"; // তোমার backend port

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor – Firebase token automatically add করবে
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response interceptor – error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;