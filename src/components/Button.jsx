import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  style = {},
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        padding: "8px 16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: disabled || loading ? "#eee" : "#007bff",
        color: disabled || loading ? "#666" : "#fff",
        fontWeight: 500,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        transition: "background 0.3s",
        ...style,
      }}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}
