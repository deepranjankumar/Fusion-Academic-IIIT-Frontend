// import React, { useState } from "react";
// import "./Home.css";

// const ThesisForm = ({ faculty = [], onClose }) => {
//   const [supervisor, setSupervisor] = useState("");
//   const [coSupervisor1, setCoSupervisor1] = useState("");
//   const [coSupervisor2, setCoSupervisor2] = useState("");

//   const handleSubmit = () => {
//     const thesisData = {
//       supervisor,
//       coSupervisor1,
//       coSupervisor2,
//     };
//     console.log("Submitting Thesis Data:", thesisData);

//     // Send data to the backend
//     fetch("/api/submit-thesis", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(thesisData),
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to submit thesis data");
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Thesis submitted successfully:", data);
//         onClose();
//       })
//       .catch((error) => {
//         console.error("Error submitting thesis:", error);
//       });
//   };

//   // Filter functions for dynamic dropdowns
//   const filterFacultyForCoSupervisor1 = () =>
//     faculty.filter((f) => f.id !== supervisor);

//   const filterFacultyForCoSupervisor2 = () =>
//     faculty.filter((f) => f.id !== supervisor && f.id !== coSupervisor1);

//   return (
//     <div className="popup">
//       <h2>Choose Supervisors</h2>

//       {/* Supervisor Field */}
//       <label>Supervisor</label>
//       <select
//         onChange={(e) => setSupervisor(e.target.value)}
//         value={supervisor}
//       >
//         <option value="">Select Supervisor</option>
//         {faculty.map((f) => (
//           <option key={f.id} value={f.id}>
//             {f.name}
//           </option>
//         ))}
//       </select>

//       {/* Debugging the filtering logic */}
//       {/* <p>Selected Supervisor: {supervisor}</p> */}

//       {/* Co-Supervisor 1 Field */}
//       <label>Co-Supervisor 1</label>
//       <select
//         onChange={(e) => setCoSupervisor1(e.target.value)}
//         value={coSupervisor1}
//       >
//         <option value="">Select Co-Supervisor 1</option>
//         {filterFacultyForCoSupervisor1().map((f) => (
//           <option key={f.id} value={f.id}>
//             {f.name}
//           </option>
//         ))}
//       </select>

//       {/* <p>Selected Co-Supervisor 1: {coSupervisor1}</p> */}

//       {/* Co-Supervisor 2 Field */}
//       <label>Co-Supervisor 2</label>
//       <select
//         onChange={(e) => setCoSupervisor2(e.target.value)}
//         value={coSupervisor2}
//       >
//         <option value="">Select Co-Supervisor 2</option>
//         {filterFacultyForCoSupervisor2().map((f) => (
//           <option key={f.id} value={f.id}>
//             {f.name}
//           </option>
//         ))}
//       </select>

//       {/* <p>Selected Co-Supervisor 2: {coSupervisor2}</p> */}

//       {/* Submit and Cancel Buttons */}
//       <button onClick={handleSubmit}>Submit</button>
//       <button onClick={onClose}>Cancel</button>
//     </div>
//   );
// };

// export default ThesisForm;
