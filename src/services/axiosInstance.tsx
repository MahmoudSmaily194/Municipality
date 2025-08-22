import axios, {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "../stores/useAuthStore";

// --- Refresh Token Lock ---
let isRefreshing = false;

// --- Queue for Failed Requests during Token Refresh ---
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

// --- Process Failed Requests After Refresh Token is Done ---
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

// --- Axios Instance Config ---
const axiosInstance = axios.create({
  baseURL: "https://municipalityapipostgersql-production.up.railway.app/api",
  withCredentials: true, // Important for HttpOnly Cookies (refresh token)
});

// --- Request Interceptor: Inject Access Token in Headers ---
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// --- Response Interceptor: Handle 401 & Token Refresh Logic ---
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 🔴 Case 1: 401 from refresh-token endpoint → refresh token expired/revoked
    if (
      error.response?.status === 401 &&
      originalRequest?.url?.includes("/Auth/refresh-token")
    ) {
      useAuthStore.getState().logout(); // logout handles redirect + clearing cache
      return Promise.reject(error);
    }

    // 🔴 Case 2: Access token expired → try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axiosInstance.post(
          "/Auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout(); // centralized logout
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 🔴 Case 3: Any other 401 → logout
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
