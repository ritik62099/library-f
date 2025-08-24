import React from "react";

export default function Loader({ text = "Loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        gap: "10px",
        
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          border: "3px solid #ccc",
          borderTop: "3px solid #333",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <span>{text}</span>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
