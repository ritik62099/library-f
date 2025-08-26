


// import { useState, useEffect } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { API } from "../services/api";
// import Button from "../components/Button";

// export default function Admin() {
//   const [students, setStudents] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     rollNo: "",
//     email: "",
//     mobile: "",
//     address: "",
//     monthlyFee: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchStudents = async () => {
//     try {
//       const res = await API.get("/students"); // backend filters by admin
//       setStudents(res.data);
//     } catch (err) {
//       setError(err.response?.data?.error || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.rollNo) return;

//     setLoading(true);
//     try {
//       await API.post("/students", form); // backend attaches admin
//       setForm({ name: "", rollNo: "", email: "", mobile: "", address: "", monthlyFee: "" });
//       fetchStudents();
//       setError(""); // clear previous error
//     } catch (err) {
//       setError(err.response?.data?.error || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this student?")) return;
//     try {
//       await API.delete(`/students/${id}`);
//       fetchStudents();
//     } catch (err) {
//       setError(err.response?.data?.error || err.message);
//     }
//   };

//   const handlePayment = async (student) => {
//     const currentMonth = new Date().toISOString().slice(0, 7);
//     const amount = student.monthlyFee || 0;
//     try {
//       await API.put(`/students/${student._id}/payment`, { amount });
//       fetchStudents();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const inputStyle = { padding: 10, borderRadius: 6, border: "1px solid #ccc", fontSize: 14 };

//   return (
//     <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
//       <h2 style={{ textAlign: "center", marginBottom: 30 }}>👨‍🏫 Admin Dashboard</h2>

//       {/* Fixed QR Code */}
//       <div style={{ margin: "0 auto 30px", textAlign: "center", padding: 20, border: "1px solid #ddd", borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", background: "#fafafa", width: 250 }}>
//         <h3>📌 Fixed QR Code</h3>
//         <QRCodeCanvas value="https://library-f.vercel.app/attendance" size={180} />
//         <p style={{ marginTop: 10, fontSize: 14 }}>Scan this QR to mark attendance</p>
//       </div>

//       {/* Add Student Form */}
//       <form onSubmit={handleSubmit} style={{ marginBottom: 30, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, background: "#fff", padding: 20, borderRadius: 10, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
//         <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
//         <input type="text" placeholder="Roll No" value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} style={inputStyle} />
//         <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
//         <input type="text" placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} style={inputStyle} />
//         <input type="text" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} style={inputStyle} />
//         <input type="number" placeholder="Monthly Fee" value={form.monthlyFee} onChange={(e) => setForm({ ...form, monthlyFee: e.target.value })} style={inputStyle} />
//         <Button type="submit" loading={loading} style={{ gridColumn: "1 / -1", marginTop: 10 }}>Add Student</Button>
//       </form>

//       {error && <p style={{ color: "red", textAlign: "center" }}>❌ {error}</p>}

//       {/* Students List */}
//       <h3 style={{ marginBottom: 15 }}>📋 Students List</h3>
//       <div style={{ display: "grid", gap: 15 }}>
//         {students.map((s) => {
//           const currentMonth = new Date().toISOString().slice(0, 7);
//           const paidThisMonth = s.payments?.some(p => p.month === currentMonth && p.paid);

//           return (
//             <div key={s._id} style={{ padding: 15, borderRadius: 10, boxShadow: "0 1px 5px rgba(0,0,0,0.05)", background: "#fff", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
//               <div><strong>Name:</strong> {s.name}</div>
//               <div><strong>Roll No:</strong> {s.rollNo}</div>
//               <div><strong>Email:</strong> {s.email || "-"}</div>
//               <div><strong>Mobile:</strong> {s.mobile || "-"}</div>
//               <div><strong>Address:</strong> {s.address || "-"}</div>
//               <div><strong>Monthly Fee:</strong> ₹ {s.monthlyFee || 0}</div>
//               <div>
//                 <strong>Paid:</strong>{" "}
//                 <input type="checkbox" checked={paidThisMonth} onChange={() => handlePayment(s)} />
//                 {paidThisMonth && <span style={{ color: "green", marginLeft: 6 }}>✔️</span>}
//               </div>
//               <div style={{ gridColumn: "1 / -1" }}>
//                 <Button onClick={() => handleDelete(s._id)} style={{ padding: "4px 8px" }}>❌ Delete</Button>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { API } from "../services/api";
import Button from "../components/Button";

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    email: "",
    mobile: "",
    address: "",
    monthlyFee: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ LocalStorage से adminId लेना
  const adminId = localStorage.getItem("adminId");

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students"); // backend filters by admin
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
      await API.post("/students", form); // backend attaches admin automatically
      setForm({ name: "", rollNo: "", email: "", mobile: "", address: "", monthlyFee: "" });
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
    const currentMonth = new Date().toISOString().slice(0, 7);
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

      {/* ✅ Personal QR Code */}
      <div
        style={{
          margin: "0 auto 30px",
          textAlign: "center",
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          background: "#fafafa",
          width: 250,
        }}
      >
        <h3>📌 Your QR Code</h3>
        {adminId ? (
          <QRCodeCanvas
            value={`https://library-f.vercel.app/attendance?admin=${adminId}`}
            size={180}
          />
        ) : (
          <p style={{ color: "red" }}>⚠️ Admin ID missing</p>
        )}
        <p style={{ marginTop: 10, fontSize: 14 }}>
          Scan this QR to mark attendance
        </p>
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
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          style={{ gridColumn: "1 / -1", marginTop: 10 }}
        >
          Add Student
        </Button>
      </form>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>❌ {error}</p>
      )}

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
                gridTemplateColumns: "repeat(2, 1fr)",
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
                <strong>Email:</strong> {s.email || "-"}
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
                  style={{ padding: "4px 8px" }}
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
