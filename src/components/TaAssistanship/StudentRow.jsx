import React, { useState, useEffect } from "react";

const StudentRow = ({ student }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [faculty, setFaculty] = useState("Head");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/courses/${student.department}/`)  // Fetch department courses
      .then((res) => res.json())
      .then((data) => setCourses([...data, { course_id: "other", course_name: "Other (Cross Department)" }]));
  }, [student.department]);

  const handleCourseChange = (e) => {
    const selectedCourseIds = Array.from(e.target.selectedOptions, option => option.value);
    
    if (selectedCourseIds.includes("other")) {
      setFaculty("Head");
    } else {
      setFaculty("Auto Assigned");
    }
    
    setSelectedCourses(selectedCourseIds);
  };

  const handleSaveAssignment = () => {
    const payload = {
      roll_no: student.roll_no,
      assigned_courses: selectedCourses,
    };

    fetch("http://127.0.0.1:8000/api/assign-ta/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
      });
  };

  return (
    <tr>
      <td>{student.roll_no}</td>
      <td>{student.name}</td>
      <td>
        <select multiple onChange={handleCourseChange}>
          {courses.map((course) => (
            <option key={course.course_id} value={course.course_id}>
              {course.course_name}
            </option>
          ))}
        </select>
      </td>
      <td>{faculty}</td>
      <td>
        <button onClick={handleSaveAssignment}>Assign</button>
      </td>
    </tr>
  );
};

export default StudentRow;
