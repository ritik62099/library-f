import { useState } from "react";
import { API } from "../services/api";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);

      // Token save
      localStorage.setItem("token", res.data.token);

      // Update App state
      if (onLogin) onLogin();

      // Navigate to admin dashboard
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={inputStyle}
      />
      <Button type="submit">Login</Button>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </form>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};
