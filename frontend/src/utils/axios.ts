// utils/axios.ts
import axios, { AxiosRequestConfig, AxiosError } from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // send cookies automatically
});

// Response interceptor: refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        // Call refresh endpoint; cookies are sent automatically
        await axios.post("/api/auth/refresh", null, { withCredentials: true });

        // Retry original request
        return api.request(error.config as AxiosRequestConfig);
      } catch {
        // Refresh failed, user is logged out
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
