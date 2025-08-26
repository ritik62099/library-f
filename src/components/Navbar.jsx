import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ isAdminLoggedIn, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        borderBottom: "2px solid #f0f0f0",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
        }}
      >
        <h1 style={{ fontSize: 18, fontWeight: "bold" }}>📚 Library Attendance</h1>

        {/* Hamburger button for mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
          }}
          className="menu-btn"
        >
          ☰
        </button>

        {/* Desktop menu */}
        <nav className="nav-links">
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

          {isAdminLoggedIn ? (
            <button
              onClick={onLogout}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid #007bff",
                background: "#fff",
                color: "#007bff",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              style={({ isActive }) => ({
                ...improvedBtn(isActive),
              })}
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>

      {/* Mobile menu (dropdown style) */}
      {menuOpen && (
        <div className="mobile-menu" style={{ display: "flex", flexDirection: "column", padding: 12, gap: 8 }}>
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
          {isAdminLoggedIn ? (
            <button
              onClick={onLogout}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: "1px solid #007bff",
                background: "#fff",
                color: "#007bff",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" style={improvedBtn(false)}>
              Login
            </NavLink>
          )}
        </div>
      )}

      {/* Small responsive CSS */}
      <style>
        {`
          @media (max-width: 768px) {
            .nav-links {
              display: none;
            }
            .menu-btn {
              display: block !important;
            }
          }
          @media (min-width: 769px) {
            .mobile-menu {
              display: none !important;
            }
            .nav-links {
              display: flex;
              gap: 12px;
            }
          }
        `}
      </style>
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
    display: "block",
  };
}
