import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin";
import Today from "./pages/Today";
import AttendanceForm from "./pages/AttendanceForm";
import Login from "./pages/LoginForm";
import { API } from "./services/api";

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await API.get("/auth/me"); // check token validity on refresh
        setIsAdminLoggedIn(true);
      } catch {
        setIsAdminLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAdminLoggedIn(false);
  };

  if (checkingAuth) return <p>Loading...</p>;

  return (
    <Router>
      <Navbar isAdminLoggedIn={isAdminLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsAdminLoggedIn(true)} />} />
        <Route path="/" element={isAdminLoggedIn ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/today" element={isAdminLoggedIn ? <Today /> : <Navigate to="/login" />} />
        <Route path="/attendance" element={<AttendanceForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
