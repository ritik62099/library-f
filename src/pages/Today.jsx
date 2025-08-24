import React from "react";
import Loader from "../components/Loader";
import Button from "../components/Button";
import { useFetch } from "../hooks/useFetch";

export default function Today() {
  const { data, loading, error, refetch } = useFetch("/attendance/today");

  if (loading) return <Loader text="Loading today's attendance..." />;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px", fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>📅 Today's Attendance</h2>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Button onClick={refetch} style={{ padding: "8px 16px" }}>
          🔄 Refresh
        </Button>
      </div>

      {(!data || data.length === 0) && (
        <p style={{ color: "#666", textAlign: "center" }}>No attendance records yet.</p>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "15px"
      }}>
        {data?.map((rec, i) => (
          <div key={i} style={{
            padding: "15px",
            borderRadius: "10px",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
          }}>
            <strong style={{ fontSize: "16px" }}>{rec.student?.name || "Unknown"}</strong>
            <p style={{ margin: "5px 0 10px", color: "#555" }}>Roll: {rec.student?.rollNo || "N/A"}</p>
            <div style={{ fontSize: "14px", color: "#666" }}>
              🕒 {rec.time ? new Date(rec.time).toLocaleTimeString() : "No time recorded"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
