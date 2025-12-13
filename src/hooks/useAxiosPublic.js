import { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/lessons', // backend public lessons base
});

const useAxiosPublic = (endpoint, params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get(endpoint, { params });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, JSON.stringify(params)]); // refetch if endpoint or params change

  return { data, loading, error, refetch: fetchData };
};

export default useAxiosPublic;
