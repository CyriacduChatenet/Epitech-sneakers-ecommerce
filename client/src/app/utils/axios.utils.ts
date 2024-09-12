import axios from "axios";

export const API = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    timeout: 1000,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = window.localStorage.getItem("access_token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      if (error.response && error.response.status === 500) {
        window.location.href = '/500';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};
