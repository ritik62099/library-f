import React, { useState } from "react";
import { API } from "../services/api";
import Loader from "../components/Loader";
import Button from "../components/Button";

export default function Scan() {
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const markAttendance = async () => {
    if (!studentId) return;
    setLoading(true);
    setMessage("");
    try {
      await API.post("/attendance/mark", { studentId });
      setMessage("✅ Attendance marked!");
      setStudentId("");
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>📷 Scan / Enter QR</h2>
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Enter Student ID"
        style={{ padding: "8px", marginRight: "8px" }}
      />
      <Button onClick={markAttendance}>Submit</Button>
      {loading && <Loader text="Marking attendance..." />}
      {message && <p>{message}</p>}
    </div>
  );
}
