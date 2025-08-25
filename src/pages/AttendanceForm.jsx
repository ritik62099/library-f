// import { useState } from "react";
// import { API } from "../services/api";
// import Button from "../components/Button";

// export default function AttendanceForm() {
//   const [form, setForm] = useState({ name: "", rollNo: "" });
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [nextPayment, setNextPayment] = useState(""); // next payment info

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.rollNo) {
//       setMessage({ text: "❌ Please fill all fields", type: "error" });
//       return;
//     }

//     setLoading(true);
//     try {
//       const students = await API.get("/students");
//       const found = students.data.find(
//         (s) =>
//           s.rollNo.toLowerCase() === form.rollNo.toLowerCase() &&
//           s.name.toLowerCase() === form.name.toLowerCase()
//       );

//       if (!found) {
//         setMessage({ text: "❌ Student not found, contact admin.", type: "error" });
//         setNextPayment("");
//       } else {
//         await API.post("/attendance/mark", { studentId: found._id });
//         setMessage({ text: "✅ Attendance marked successfully!", type: "success" });
//         setForm({ name: "", rollNo: "" });

//         // Calculate next payment month
//         const lastPaid = found.payments
//           ?.filter(p => p.paid)
//           .sort((a, b) => a.month.localeCompare(b.month))
//           .pop();

//         let nextMonth = new Date();
//         if (lastPaid) {
//           const [year, month] = lastPaid.month.split("-").map(Number);
//           nextMonth = new Date(year, month, 1); // next month
//         } else {
//           // if never paid, current month is due
//           nextMonth = new Date();
//         }

//         const nextMonthStr = nextMonth.toLocaleString("default", { month: "long", year: "numeric" });
//         setNextPayment(`💰 Next library payment due: ${nextMonthStr}`);
//       }
//     } catch (err) {
//       setMessage({ text: "❌ " + (err.response?.data?.error || err.message), type: "error" });
//       setNextPayment("");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{
//       maxWidth: "500px",
//       margin: "40px auto",
//       padding: "25px",
//       borderRadius: "12px",
//       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//       background: "#fff",
//       fontFamily: "system-ui, sans-serif"
//     }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>📝 Attendance Form</h2>

//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//         <input
//           type="text"
//           placeholder="Enter Name"
//           value={form.name}
//           onChange={(e) => setForm({ ...form, name: e.target.value })}
//           style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
//         />
//         <input
//           type="text"
//           placeholder="Enter Roll No"
//           value={form.rollNo}
//           onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
//           style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
//         />
//         <Button type="submit" loading={loading} style={{ width: "150px", alignSelf: "center" }}>
//           Mark Attendance
//         </Button>
//       </form>

//       {message.text && (
//         <p style={{
//           marginTop: "15px",
//           textAlign: "center",
//           color: message.type === "success" ? "green" : "red",
//           fontWeight: "bold"
//         }}>
//           {message.text}
//         </p>
//       )}

//       {nextPayment && (
//         <p style={{ marginTop: "10px", textAlign: "center", color: "#555", fontWeight: "bold" }}>
//           {nextPayment}
//         </p>
//       )}
//     </div>
//   );
// }



import { useState } from "react";
import { API } from "../services/api";
import Button from "../components/Button";

export default function AttendanceForm() {
  const [form, setForm] = useState({ name: "", rollNo: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [nextPayment, setNextPayment] = useState(""); // next payment info

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.rollNo) {
      setMessage({ text: "❌ Please fill all fields", type: "error" });
      return;
    }

    setLoading(true);
    try {
      // Find student by name & rollNo
      const students = await API.get("/students");
      const found = students.data.find(
        (s) =>
          s.rollNo.toLowerCase() === form.rollNo.toLowerCase() &&
          s.name.toLowerCase() === form.name.toLowerCase()
      );

      if (!found) {
        setMessage({ text: "❌ Student not found, contact admin.", type: "error" });
        setNextPayment("");
      } else {
        // ✅ Mark attendance (backend links current admin automatically)
        await API.post("/attendance/mark", { studentId: found._id });
        setMessage({ text: "✅ Attendance marked successfully!", type: "success" });
        setForm({ name: "", rollNo: "" });

        // Calculate next payment month
        const lastPaid = found.payments
          ?.filter(p => p.paid)
          .sort((a, b) => a.month.localeCompare(b.month))
          .pop();

        let nextMonth = new Date();
        if (lastPaid) {
          const [year, month] = lastPaid.month.split("-").map(Number);
          nextMonth = new Date(year, month, 1);
        }

        const nextMonthStr = nextMonth.toLocaleString("default", { month: "long", year: "numeric" });
        setNextPayment(`💰 Next library payment due: ${nextMonthStr}`);
      }
    } catch (err) {
      setMessage({ text: "❌ " + (err.response?.data?.error || err.message), type: "error" });
      setNextPayment("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: "500px",
      margin: "40px auto",
      padding: "25px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      background: "#fff",
      fontFamily: "system-ui, sans-serif"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>📝 Attendance Form</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input
          type="text"
          placeholder="Enter Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
        />
        <input
          type="text"
          placeholder="Enter Roll No"
          value={form.rollNo}
          onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
          style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
        />
        <Button type="submit" loading={loading} style={{ width: "150px", alignSelf: "center" }}>
          Mark Attendance
        </Button>
      </form>

      {message.text && (
        <p style={{
          marginTop: "15px",
          textAlign: "center",
          color: message.type === "success" ? "green" : "red",
          fontWeight: "bold"
        }}>
          {message.text}
        </p>
      )}

      {nextPayment && (
        <p style={{ marginTop: "10px", textAlign: "center", color: "#555", fontWeight: "bold" }}>
          {nextPayment}
        </p>
      )}
    </div>
  );
}
