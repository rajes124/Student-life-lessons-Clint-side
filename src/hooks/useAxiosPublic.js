import { useState, useEffect } from "react";
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/lessons",
});

const useAxiosPublic = (endpoint, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get(endpoint, { params });

      // ✅ ensure array
      setData(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      setError(err.response?.data || err.message);
      setData([]); // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error, refetch: fetchData };
};

export default useAxiosPublic;
