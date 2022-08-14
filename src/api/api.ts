import axios, { AxiosInstance, AxiosRequestConfig, Cancel } from 'axios';
import {
  ApiError,
  ApiExecutor,
  ApiExecutorArgs,
  ApiRequestConfig,
  WithAbortFn,
} from './types/api.types';

// Default config for axios
const axiosParams: AxiosRequestConfig = {
  baseURL:
    process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:4173' : '/',
};

// Create axios instance
const axiosInstance = axios.create(axiosParams);

export const didAbort = (
  error: unknown
): error is Cancel & { aborted: boolean } => axios.isCancel(error);

const getCancelSource = () => axios.CancelToken.source();

export const isApiError = (error: unknown): error is ApiError => {
  return axios.isAxiosError(error);
};

const withAbort = <T>(fn: WithAbortFn) => {
  const executor: ApiExecutor<T> = async (...args: ApiExecutorArgs) => {
    const originalConfig = args[args.length - 1] as ApiRequestConfig;
    // Extract abort property from config
    const { abort, ...config } = originalConfig;

    // Create cancel token and abort method only if abort function was passed
    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      if (args.length > 2) {
        const [url, body] = args;
        return await fn<T>(url, body, config);
      } else {
        const [url] = args;
        return await fn<T>(url, config);
      }
    } catch (error) {
      console.log('api error', error);
      // Add "aborted" property to error object if the request was aborted
      if (didAbort(error)) {
        error.aborted = true;
      }

      throw error;
    }
  };
  return executor;
};

// api functions
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.get)(url, config),

    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.delete)(url, config),

    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.post)(url, body, config),

    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.patch)(url, body, config),

    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      withAbort<T>(axios.put)(url, body, config),
  };
};

export default api(axiosInstance);
