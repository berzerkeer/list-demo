import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Default config for axios
const axiosParams: AxiosRequestConfig = {
  baseURL:
    process.env.NODE_ENV === 'development' ? ' http://127.0.0.1:4173' : '/',
};

// Create axios instance
const axiosInstance = axios.create(axiosParams);

// api functions
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),

    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),

    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),

    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),

    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),
  };
};

export default api(axiosInstance);
