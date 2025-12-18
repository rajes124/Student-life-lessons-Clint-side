import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Firebase token attach
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true); // refresh token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      toast.error(error.response.data?.message || "Server Error");
    } else {
      toast.error(error.message || "Network Error");
    }
    return Promise.reject(error);
  }
);

export default api;
