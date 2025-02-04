import React, { useState, useEffect } from "react";
import SupervisorForm from "./Reg_Supervisiors";

function ReqSupervisior() {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch faculty data (Move it above useEffect)
  const fetchFacultyData = () => {
    setLoading(true);
    fetch("http://localhost:8000/api/faculties/") // Update this endpoint to match your backend route
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch faculty data");
        return response.json();
      })
      .then((data) => {
        setFacultyData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching faculty:", error);
        setLoading(false);
      });
  };

  // Fetch faculty data when the component mounts
  useEffect(() => {
    fetchFacultyData(); // Now, it's called after being defined
  }, []);

  return (
    <div>
      {/* Show loading indicator if data is being fetched */}
      {loading && (
        <div className="loading-overlay">
          <p>Loading Supervisor...</p>
        </div>
      )}

      {/* Render the SupervisorForm directly */}
      <SupervisorForm
        faculty={facultyData}
        onClose={() => window.history.back()}
      />
    </div>
  );
}

export default ReqSupervisior;
