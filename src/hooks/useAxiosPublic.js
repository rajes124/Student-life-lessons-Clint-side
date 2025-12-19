import { useState, useEffect } from "react";
import axios from "axios";

// 🔥 Base URL সঠিকভাবে set করা
const API = axios.create({
  baseURL: "http://localhost:5000/api/lessons",
  // যদি cookie বা auth header লাগে, পরে add করো
});

const useAxiosPublic = (endpoint, params = {}) => {
  const [data, setData] = useState(null);        // 🔥 null রাখলাম (array না)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.get(endpoint, { params });

      // 🔥 এখানে পুরো response data টা set করছি (object)
      setData(res.data);
    } catch (err) {
      console.error("Axios Public Error:", err);
      setError(err.response?.data?.message || err.message || "Network Error");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, JSON.stringify(params)]);

  // refetch function যাতে manually call করা যায়
  return { data, loading, error, refetch: fetchData };
};

export default useAxiosPublic;