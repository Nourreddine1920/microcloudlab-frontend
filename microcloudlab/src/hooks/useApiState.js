import { useState, useEffect, useCallback } from 'react';

export const useApiState = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  const execute = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(params);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('API Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (apiFunction) {
      fetchData();
    }
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    execute,
  };
};

export const useApiMutation = (apiFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(params);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'An error occurred');
      console.error('API Error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  return {
    mutate,
    loading,
    error,
    data,
  };
}; 