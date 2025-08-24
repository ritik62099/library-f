import { useState, useEffect } from "react";
import { API } from "../services/api"; // axios instance

// Generic fetch hook
export function useFetch(url, options = {}, autoLoad = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(autoLoad);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await API.request({
        url,
        method: options.method || "GET",
        ...options,
      });
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}
