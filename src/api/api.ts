import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  Cancel,
} from 'axios';
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
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:3000'
      : 'http://127.0.0.1:3000',
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

const withLogger = async <T>(promise: AxiosPromise<T>) =>
  promise.catch((error: ApiError) => {
    /*
    Always log errors in dev environment
    if (process.env.NODE_ENV !== 'development') throw error
  */
    // Log error only if REACT_APP_DEBUG_API env is set to true
    if (!process.env.REACT_APP_DEBUG_API) throw error;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      // in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    console.log(error.config);

    throw error;
  });

// api functions
const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.get)(url, config)),

    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.delete)(url, config)),

    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.post)(url, body, config)),

    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.patch)(url, body, config)),

    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      withLogger<T>(withAbort<T>(axios.put)(url, body, config)),
  };
};

export default api(axiosInstance);
