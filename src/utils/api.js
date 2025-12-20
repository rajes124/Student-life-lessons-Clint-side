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

// ✅ TOKEN AUTO ATTACH (Firebase)
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || "Server Error");
    return Promise.reject(error);
  }
);

export default api;
