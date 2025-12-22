import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-hot-toast";

const API_BASE_URL = "https://lessons-backend-six.vercel.app/api";

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

// ✅ RESPONSE INTERCEPTOR – 404 এ toast দেখাবে না (যাতে "User not found" বা অন্য 404 এ বিরক্ত না করে)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // শুধু 404 হলে toast দেখাবে না (যেমন ভুল রুটে কল করলে)
    if (error.response?.status !== 404) {
      toast.error(error.response?.data?.message || "Server Error");
    }
    return Promise.reject(error);
  }
);

export default api;