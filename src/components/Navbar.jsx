import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ isAdminLoggedIn, onLogout }) {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 20px",
        borderBottom: "2px solid #f0f0f0",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <h1 style={{ marginRight: "auto", fontSize: 20, fontWeight: "bold" }}>
        📚 Library Attendance
      </h1>

      {isAdminLoggedIn && (
        <>
          <NavLink to="/" end style={({ isActive }) => improvedBtn(isActive)}>
            Admin
          </NavLink>

          <NavLink to="/today" style={({ isActive }) => improvedBtn(isActive)}>
            Today
          </NavLink>
        </>
      )}

      <Link to="/attendance" style={improvedBtn(false)}>
        Attendance Form
      </Link>

      {/* Login / Logout button */}
      {isAdminLoggedIn ? (
        <button
          onClick={onLogout}
          style={{
            marginLeft: "auto",
            padding: "6px 14px",
            borderRadius: 6,
            border: "1px solid #007bff",
            background: "#fff",
            color: "#007bff",
            cursor: "pointer",
            fontWeight: 500,
            transition: "all 0.2s ease",
          }}
        >
          Logout
        </button>
      ) : (
        <NavLink
          to="/login"
          style={({ isActive }) => ({
            ...improvedBtn(isActive),
            marginLeft: "auto",
          })}
        >
          Login
        </NavLink>
      )}
    </header>
  );
}

function improvedBtn(active) {
  return {
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid #ddd",
    background: active ? "#007bff" : "#fff",
    color: active ? "#fff" : "#111",
    fontWeight: 500,
    textDecoration: "none",
    transition: "all 0.2s ease",
    boxShadow: active ? "0 2px 6px rgba(0,123,255,0.3)" : "none",
    cursor: "pointer",
  };
}
