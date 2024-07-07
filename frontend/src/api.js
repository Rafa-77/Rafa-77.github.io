// INTERCEPTORS: TO INTERCEPT ANY REQUEST MADE AND AUTOMATICLY ADD HEADERS
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiURL =
  "https://b02e4bfe-d65c-42a5-adf9-e0006463ba3b-dev.e1-us-east-azure.choreoapis.dev/proyect02/backend/v1";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiURL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
