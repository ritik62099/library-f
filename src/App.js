import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Today from "./pages/Today";
import AttendanceForm from "./pages/AttendanceForm";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="/today" element={<Today />} />
          <Route path="/attendance" element={<AttendanceForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}


// // src/App.js
// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Admin from "./pages/Admin";
// import AttendanceForm from "./pages/AttendanceForm";
// import Today from "./pages/Today";
// import Login from "./pages/LoginForm";

// function App() {
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

//   const handleLogin = () => {
//     setIsAdminLoggedIn(true);
//   };

//   const handleLogout = () => {
//     setIsAdminLoggedIn(false);
//   };

//   return (
//     <Router>
//       <Navbar isAdminLoggedIn={isAdminLoggedIn} onLogout={handleLogout} />
//       <div style={{ padding: "20px" }}>
//         <Routes>
//           {/* Login route */}
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />

//           {/* Admin dashboard - protected */}
//           <Route
//             path="/"
//             element={isAdminLoggedIn ? <Admin /> : <Navigate to="/login" />}
//           />

//           {/* Attendance form - open for students */}
//           <Route path="/attendance" element={<AttendanceForm />} />

//           {/* Today's attendance - protected */}
//           <Route
//             path="/today"
//             element={isAdminLoggedIn ? <Today /> : <Navigate to="/login" />}
//           />

//           {/* Catch-all redirect */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



// import { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Admin from "./pages/Admin";
// import AttendanceForm from "./pages/AttendanceForm";
// import Today from "./pages/Today";
// import Login from "./pages/LoginForm";

// function App() {
//   const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

//   // Page load par token check karo
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) setIsAdminLoggedIn(true);
//   }, []);

//   const handleLogin = () => setIsAdminLoggedIn(true);
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsAdminLoggedIn(false);
//   };

//   return (
//     <Router>
//       <Navbar isAdminLoggedIn={isAdminLoggedIn} onLogout={handleLogout} />
//       <div style={{ padding: "20px" }}>
//         <Routes>
//           {/* Login route */}
//           <Route path="/login" element={<Login onLogin={handleLogin} />} />

//           {/* Admin dashboard - protected */}
//           <Route
//             path="/"
//             element={isAdminLoggedIn ? <Admin /> : <Navigate to="/login" />}
//           />

//           {/* Attendance form - open for students */}
//           <Route path="/attendance" element={<AttendanceForm />} />

//           {/* Today's attendance - protected */}
//           <Route
//             path="/today"
//             element={isAdminLoggedIn ? <Today /> : <Navigate to="/login" />}
//           />

//           {/* Catch-all redirect */}
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

