// // services/api.js
// import axios from "axios";

// export const API = axios.create({
//   baseURL: "https://library-api-sable.vercel.app/api",
//   headers: { "Content-Type": "application/json" },
// });

// // API.interceptors.request.use((config) => {
// //   const token = localStorage.getItem("token");
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });


import axios from "axios";

const API = axios.create({
  baseURL: "https://library-api-sable.vercel.app/api", // 🔄 Vercel backend ka URL dalna
});

// Interceptor → token sirf admin/private routes ke liye
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ✅ sirf private routes me token bhejna
  if (token) {
    if (
      config.url.startsWith("/students") ||
      config.url.startsWith("/auth/me") ||
      config.url.startsWith("/attendance/today")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export { API };
