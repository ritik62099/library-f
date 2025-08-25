// services/api.js
import axios from "axios";

export const API = axios.create({
  baseURL: "https://library-api-sable.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
