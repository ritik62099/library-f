
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api";
import Button from "../components/Button";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      onLogin();
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>👋 Welcome Back</h2>
        <p style={styles.subtitle}>Login to your admin dashboard</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={styles.input}
          />
          <Button type="submit" style={styles.button}>
            Login
          </Button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
    fontFamily: "sans-serif",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "10px",
    color: "#333",
    fontSize: "28px",
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: "30px",
    color: "#666",
    fontSize: "14px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    outline: "none",
    transition: "all 0.2s",
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    background: "#6B73FF",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  error: {
    color: "red",
    marginTop: "10px",
    fontWeight: "bold",
  },
};
