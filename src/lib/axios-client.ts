import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BASE_URL || "";

/** Shared axios instance for all app API calls */
const axiosClient = axios.create({
  baseURL,
  timeout: 30_000,
  headers: {
    Accept: "text/plain",
    "Content-Type": "application/json-patch+json",
    "authorised-key": "apikeyprodweb",
    "access-mode": "WEB",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lc3RhbXAiOiIxNzczNzY1NjU2LjMzMTI0MzUiLCJwYXJ0bmVySWQiOiJWSVNITlUiLCJ1c2VyY29kZSI6bnVsbCwicmVxaWQiOiJQcm94eVBheV8xNzAzMjAyNjIyMTA1NiJ9.2C5yNCL-MmxIuUrWPrXH-TPDwWgNyzD-F_jsMCEc2Xg",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    try {
      const stored = localStorage.getItem("edu_auth");
      if (stored) {
        const { token } = JSON.parse(stored) as { token?: string };
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // ignore malformed auth storage
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default axiosClient;
