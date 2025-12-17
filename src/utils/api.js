// src/utils/api.js

import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000/api"; // backend base URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   Request Interceptor
   Firebase token auto add
   ========================= */
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   Response Interceptor
   Global error handling
   ========================= */
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;

    if (user) {
      const token = await user.getIdToken(true); // true = force refresh
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
