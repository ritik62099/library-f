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


// import axios from "axios";

// const API = axios.create({
//   baseURL: "https://library-api-sable.vercel.app/api", // 🔄 Vercel backend ka URL dalna
// });

// // Interceptor → token sirf admin/private routes ke liye
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");

//   if (
//     token &&
//     (config.url.startsWith("/students") ||
//       config.url.startsWith("/auth") ||
//       config.url.startsWith("/attendance/today"))
//   ) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export { API };


import axios from "axios";

const API = axios.create({
  baseURL: "https://library-api-sable.vercel.app/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // ⚡ Public routes
  const publicRoutes = ["/attendance/mark"];

  const isPublic = publicRoutes.some((route) =>
    config.url.startsWith(route)
  );

  // Sirf non-public routes pe token bhejo
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization; // ⚡ remove token if public
  }

  return config;
});


export { API };
