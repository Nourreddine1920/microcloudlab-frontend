import { useState, useEffect, useCallback } from 'react';

/**
 * @module useApiState
 */

/**
 * A custom hook for managing the state of an API request that fetches data.
 * It handles loading, error, and data states, and provides a `refetch` function.
 * The API call is automatically triggered when the component mounts or dependencies change.
 *
 * @param {Function} apiFunction - The asynchronous function that makes the API call.
 * @param {Array} [dependencies=[]] - A list of dependencies that, when changed, will trigger a refetch.
 * @returns {{
 *   data: any | null,
 *   loading: boolean,
 *   error: string | null,
 *   refetch: () => Promise<void>,
 *   execute: (params: any) => Promise<any>
 * }} An object containing the state of the API request and control functions.
 */
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

/**
 * A custom hook for managing the state of an API request that performs a mutation (e.g., create, update, delete).
 * It handles loading, error, and data states, and provides a `mutate` function to trigger the API call.
 *
 * @param {Function} apiFunction - The asynchronous function that makes the API call.
 * @returns {{
 *   mutate: (params: any) => Promise<any>,
 *   loading: boolean,
 *   error: string | null,
 *   data: any | null
 * }} An object containing the state of the mutation and the mutate function.
 */
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