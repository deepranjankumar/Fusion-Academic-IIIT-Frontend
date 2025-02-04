// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./HeadDashboard.css"; // Add your custom CSS file for styling

// const HeadDashboard = ({ branchName }) => {
//   const [requests, setRequests] = useState([]);
//   const [Error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch requests for the head
//     axios
//       .get(
//         `http://localhost:8000/applications/academic_procedure/api/head_requests/${branchName}/`
//       )
//       .then((response) => {
//         setRequests(response.data);
//       })
//       .catch((Error) => {
//         console.Error("Error fetching data:", Error);
//         setError("Failed to load requests. Please try again.");
//       });
//   }, [branchName]);

//   const handleApprove = (index) => {
//     // Handle Approve logic
//     alert(`Request for ${requests[index].student_name} has been approved.`);
//     // Example of updating status in the backend
//     // axios.post('/api/approve', { id: requests[index].id }).then(...)
//   };

//   const handleReject = (index) => {
//     // Handle Reject logic
//     alert(`Request for ${requests[index].student_name} has been rejected.`);
//     // Example of updating status in the backend
//     // axios.post('/api/reject', { id: requests[index].id }).then(...)
//   };

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-header">Head of Department Dashboard</h2>

//       {Error && <p className="Error-message">{Error}</p>}

//       {requests.length > 0 ? (
//         <table className="requests-table">
//           <thead>
//             <tr>
//               <th>Student Name</th>
//               <th>Roll Number</th>
//               <th>Supervisor Name</th>
//               <th>Thesis Topic</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map((request, index) => (
//               <tr key={index}>
//                 <td>{request.student_name}</td>
//                 <td>{request.student_rollno}</td>
//                 <td>{request.supervisor_name}</td>
//                 <td>{request.thesis_topic}</td>
//                 <td>
//                   <button
//                     className="approve-button"
//                     onClick={() => handleApprove(index)}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     className="reject-button"
//                     onClick={() => handleReject(index)}
//                   >
//                     Reject
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No requests found for this branch.</p>
//       )}
//     </div>
//   );
// };

// export default HeadDashboard;
