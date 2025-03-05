import React, { useEffect, useState } from "react";
import { Table, Select, Button, Container, Title, Card, ScrollArea, Text, Center } from "@mantine/core";
import axios from "axios";

const DEFAULT_STUDENTS = [
  { roll_no: "X", name: "ABC" }, // Default student
  { roll_no: "Y", name: "ABC" } 
];

const TAAssignmentTest = () => {
  const [students, setStudents] = useState(DEFAULT_STUDENTS);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/applications/academic_procedure/api/ta_assistanshipdetails")
      .then((response) => {
        if (response.data?.courses?.length > 0) {
          setStudents(response.data.students || DEFAULT_STUDENTS); // Update students from API
        }
        setCourses(response.data.courses || []); // Set courses
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setStudents(DEFAULT_STUDENTS); // Fallback to default
      });
  }, []);

  return (
    <Container size="100%" py="xl" style={{ width: "100%" }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%" }}>
        <Title order={2} align="center" mb="md" color="blue">TA Assignment</Title>
        
        <ScrollArea>
          <Table striped highlightOnHover withBorder>
            <thead style={{ position: "sticky", top: 0, background: "white", zIndex: 1 }}>
              <tr>
                <th style={{ textAlign: "left", padding: "10px" }}>Roll No</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Name</th>
                <th style={{ textAlign: "left", padding: "10px" }}>TA Courses</th>
                <th style={{ textAlign: "left", padding: "10px" }}>Assigned Faculty</th>
                <th style={{ textAlign: "center", padding: "10px" }}>Action</th>
              </tr>
            </thead>
            
            <tbody>
              {students.map((student) => (
                <StudentRow key={student.roll_no} student={student} courses={courses} />
              ))}
            </tbody>
          </Table>
        </ScrollArea>
      </Card>
    </Container>
  );
};

const StudentRow = ({ student, courses }) => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [faculty, setFaculty] = useState("Not Assigned");

  const handleCourseChange = (value) => {
    const selectedCourseIds = value || [];
    const selectedFaculties = courses
      .filter((course) => selectedCourseIds.includes(course.course_id.toString()))
      .map((course) => course.instructor_id.toString());

    setFaculty(selectedFaculties.length > 0 ? selectedFaculties.join(", ") : "Not Assigned");
    setSelectedCourses(selectedCourseIds);
  };

  return (
    <tr>
      <td style={{ padding: "10px" }}><Text size="sm" weight={500}>{student.roll_no}</Text></td>
      <td style={{ padding: "10px" }}><Text size="sm" weight={500}>{student.name}</Text></td>
      <td style={{ padding: "10px" }}>
        <Select
          data={courses.map((course) => ({
            value: course.course_id.toString(),
            label: `${course.code} - ${course.name}`,
          }))} 
          value={selectedCourses}
          onChange={handleCourseChange}
          clearable
          searchable
          placeholder="Select TA courses"
          maxDropdownHeight={150}
          nothingFound="No courses available"
          styles={{ input: { fontSize: "sm" } }}
          dropdownPosition="bottom"
          withinPortal
          multiple
        />
      </td>
      <td style={{ padding: "10px" }}><Text size="sm" color={faculty !== "Not Assigned" ? "blue" : "gray"}>{faculty}</Text></td>
      <td style={{ textAlign: "center", padding: "10px" }}>
        <Center>
          <Button variant="light" color="blue" radius="md" size="xs">Assign</Button>
        </Center>
      </td>
    </tr>
  );
};

export default TAAssignmentTest;
