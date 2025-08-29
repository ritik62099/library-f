
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { API } from "../services/api";
import Button from "../components/Button";

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    mobile: "",
    address: "",
    monthlyFee: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rollNo) return;

    setLoading(true);
    try {
      await API.post("/students", form);
      setForm({
        name: "",
        rollNo: "",
        mobile: "",
        address: "",
        monthlyFee: "",
      });
      fetchStudents();
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  const handlePayment = async (student) => {
    const amount = student.monthlyFee || 0;
    try {
      await API.put(`/students/${student._id}/payment`, { amount });
      fetchStudents();
    } catch (err) {
      console.error(err);
    }
  };

  const inputStyle = {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
    width: "100%",
    boxSizing: "border-box",
  };

  const downloadQR = () => {
    const canvas = document.getElementById("fixed-qr");
    const qrImage = canvas.toDataURL("image/png");

    const newCanvas = document.createElement("canvas");
    const ctx = newCanvas.getContext("2d");

    const qrSize = canvas.width;
    const textHeight = 40;
    newCanvas.width = qrSize;
    newCanvas.height = qrSize + textHeight;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

    const img = new Image();
    img.src = qrImage;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = "#000000";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Attendance QR", newCanvas.width / 2, qrSize + 25);

      const pngUrl = newCanvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "attendance-qr.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
  };

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "0 auto",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>
        👨‍🏫 Admin Dashboard
      </h2>

      {/* Fixed QR Code */}
      <div
        style={{
          margin: "0 auto 30px",
          textAlign: "center",
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          background: "#fafafa",
          width: "100%",
          maxWidth: 300,
        }}
      >
        <h3>📌 Fixed QR Code</h3>
        <QRCodeCanvas
          id="fixed-qr"
          value="https://library-f.vercel.app/attendance"
          size={200}
          bgColor="#ffffff"
          includeMargin={true}
          style={{ maxWidth: "100%" }}
        />
        <p style={{ marginTop: 10, fontSize: 14 }}>
          Scan this QR to mark attendance
        </p>
        <Button onClick={downloadQR} style={{ marginTop: 10, width: "100%" }}>
          ⬇️ Download QR
        </Button>
      </div>

      {/* Add Student Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 30,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          background: "#fff",
          padding: 20,
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Roll No"
          value={form.rollNo}
          onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Monthly Fee"
          value={form.monthlyFee}
          onChange={(e) => setForm({ ...form, monthlyFee: e.target.value })}
          style={inputStyle}
        />
        <Button
          type="submit"
          loading={loading}
          style={{ gridColumn: "1 / -1", marginTop: 10, width: "100%" }}
        >
          Add Student
        </Button>
      </form>

      {error && <p style={{ color: "red", textAlign: "center" }}>❌ {error}</p>}

      {/* Students List */}
      <h3 style={{ marginBottom: 15 }}>📋 Students List</h3>
      <div style={{ display: "grid", gap: 15 }}>
        {students.map((s) => {
          const currentMonth = new Date().toISOString().slice(0, 7);
          const paidThisMonth = s.payments?.some(
            (p) => p.month === currentMonth && p.paid
          );

          return (
            <div
              key={s._id}
              style={{
                padding: 15,
                borderRadius: 10,
                boxShadow: "0 1px 5px rgba(0,0,0,0.05)",
                background: "#fff",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: 6,
              }}
            >
              <div>
                <strong>Name:</strong> {s.name}
              </div>
              <div>
                <strong>Roll No:</strong> {s.rollNo}
              </div>
              <div>
                <strong>Mobile:</strong> {s.mobile || "-"}
              </div>
              <div>
                <strong>Address:</strong> {s.address || "-"}
              </div>
              <div>
                <strong>Monthly Fee:</strong> ₹ {s.monthlyFee || 0}
              </div>
              <div>
                <strong>Paid:</strong>{" "}
                <input
                  type="checkbox"
                  checked={paidThisMonth}
                  onChange={() => handlePayment(s)}
                />
                {paidThisMonth && (
                  <span style={{ color: "green", marginLeft: 6 }}>✔️</span>
                )}
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <Button
                  onClick={() => handleDelete(s._id)}
                  style={{ padding: "4px 8px", width: "100%" }}
                >
                  ❌ Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
