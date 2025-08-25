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
      const res = await API.post("/auth/login", form); // backend generates token
      localStorage.setItem("token", res.data.token);   // save token
      onLogin();                                       // update App state
      navigate("/");                                   // redirect to dashboard
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button type="submit">Login</Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
