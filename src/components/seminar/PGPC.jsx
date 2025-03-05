import React, { useState, useEffect, useRef } from "react";
import { Button, TextInput, Textarea, Select, Card, Title, Group, Divider } from "@mantine/core";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";


const PGPCForm = React.forwardRef(({ studentEntries, pgpcData,curr_committee_mem,roll,user, handleChange }, ref) => {
  const [updateConsent,setupdateConsent] = useState(false);



  
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:8000/applications/academic_procedure/api/give_member_consent/${roll}/${user}/`, {
        method: "POST",
        credentials: "include",  // Ensures cookies are sent
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
      if (data.message) alert(data.message);
      if (data.updated_roles) setupdateConsent(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
  
  const getPdfUrl = (base64String) => {
    if (!base64String) return null;

    // Remove metadata if present
    const base64Data = base64String.split(";base64,").pop();
    
    // Convert Base64 string to a byte array
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create and return an Object URL
    return URL.createObjectURL(blob);
  };
  return (
    <div ref={ref}>
{studentEntries.map((studentData, index) => {
        const pdfUrl = getPdfUrl(studentData.report_pdf); // Generate PDF URL
        
        return (
          <Card key={index} shadow="sm" p="lg" radius="md" withBorder mb="lg">
            <Title order={3}>Student Details</Title>
            <Divider my="sm" />
            <p><strong>Discipline:</strong> {studentData.discipline}</p>
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>Roll No.:</strong> {studentData.roll_no}</p>
            <p><strong>Theme of Work:</strong> {studentData.theme}</p>
            <p><strong>Seminar Date:</strong> {studentData.seminar_date} | <strong>Time:</strong> {studentData.seminar_time || 'N/A'} | <strong>Place:</strong> {studentData.place}</p>
            <p><strong>Previous Work:</strong> {studentData.work_done}</p>
            <p><strong>Current Contribution:</strong> {studentData.specific_contribution}</p>
            <p><strong>Future Plan:</strong> {studentData.future_plan}</p>
            <p><strong>Publications Count:</strong> {studentData.publications_count}</p>
            <p><strong>Papers Published:</strong> {studentData.papers_published}</p>
            <p><strong>Papers Presented:</strong> {studentData.papers_presented}</p>
            <p><strong>Papers Submitted:</strong> {studentData.papers_submitted}</p>

            {/* Buttons for PDF Preview and Download */}
            {pdfUrl && (
              <Group mt="md" position="right">
                <Button
                  component="a"
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="light"
                  color="blue"
                >
                  Preview PDF
                </Button>

                <Button
                  component="a"
                  href={pdfUrl}
                  download={`Report_${studentData.roll_no}.pdf`}
                  variant="filled"
                  color="green"
                >
                  Download PDF
                </Button>
              </Group>
            )}
          </Card>
        );
      })}
     
        {curr_committee_mem[0] === "supervisor" ? (
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={3}>PGPC Evaluation</Title>
          <Divider my="sm" />
          <Select label="Quality of Work" data={["Excellent", "Good", "Satisfactory", "Unsatisfactory"]} value={pgpcData.quality_of_work} onChange={(value) => handleChange("quality_of_work", value)} />
          <Select label="Quantity of Work" data={["Enough", "Just Sufficient", "Insufficient"]} value={pgpcData.quantity_of_work} onChange={(value) => handleChange("quantity_of_work", value)} />
          <Select label="Overall Grade" data={["A+", "A", "B+", "B", "C+", "C", "D+", "D", "F"]} value={pgpcData.overall_grade} onChange={(value) => handleChange("overall_grade", value)} />
          <Select label="Panel Report/Recommendations" data={["Must give Annual Progress Seminar again", "Not Applicable"]} value={pgpcData.panel_report} onChange={(value) => handleChange("panel_report", value)} />
          <Textarea label="Comments / Suggestions" value={pgpcData.comments} onChange={(event) => handleChange("comments", event.target.value)} />
          <TextInput label="Faculty Name" value={pgpcData.faculty_name} onChange={(event) => handleChange("faculty_name", event.target.value)} />
          <TextInput label="Evaluation Date" type="date" value={pgpcData.evaluation_date} onChange={(event) => handleChange("evaluation_date", event.target.value)} />
        </Card>
      ) : (
        !!updateConsent ? "Already Consented" : <Button onClick={handleSubmit}>Give Consent</Button>

      )}

    </div>
  );
});

const PGPCPage = () => {
  const componentRef = useRef();
  const [students, setStudents] = useState([]); // Stores all student data
  const [uniqueStudents, setUniqueStudents] = useState([]); // Stores unique students for initial display
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [pgpcData, setPgpcData] = useState({
    quality_of_work: "",
    quantity_of_work: "",
    overall_grade: "",
    panel_report: "",
    comments: "",
    faculty_name: "",
    evaluation_date: "",
  });
  const username = useSelector((state) => state.user.username);
  const [curr_student, setCurrStudent] = useState("");
  const [committeeRoles, setcommitteeRoles] = useState([]); 
  useEffect(() => {
    fetch(`http://localhost:8000/applications/academic_procedure/api/get_committee_roles/${curr_student}/${username}`)
      .then(response => response.json())
      .then(data => {
        console.log("API Response:", data); // Check API response in console
        if (data.roles) {
          console.log("Updating State with:", data.roles);
          setcommitteeRoles([...data.roles]); // Store all roles in state
        } else {
          alert("You are not part of this committee");
        }
      })
      .catch(error => console.error("Fetch Error:", error));
  }, [curr_student, username]);
  



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/applications/academic_procedure/api/seminar_report_student/${username}`);
        const data = await response.json();
        
        setStudents(data); // Store all student data
        
        // Remove duplicate students based on roll_no and sort by seminar_date (latest first)
        const uniqueEntries = [];
        const seenRollNos = new Set();
  
        data.sort((a, b) => new Date(b.seminar_date) - new Date(a.seminar_date)); // Sort by seminar_date descending
  
        data.forEach(student => {
          if (!seenRollNos.has(student.roll_no)) {
            seenRollNos.add(student.roll_no);
            uniqueEntries.push(student);
          }
        });
  
        setUniqueStudents(uniqueEntries); // Set unique students for initial display
        
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, [username]);

  const handleViewDetails = (rollNo) => {
    const studentEntries = students.filter(student => student.roll_no === rollNo);
    setSelectedStudent(studentEntries);
    setCurrStudent(rollNo);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleChange = (field, value) => {
    setPgpcData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const updatedData = { ...pgpcData }; // Include the updated data from the form
     
    // Find the student with the most recent seminar date
    const latestStudent = selectedStudent.sort((a, b) => new Date(b.seminar_date) - new Date(a.seminar_date))[0];

    try {
      // Send the data to the backend API
      const response = await fetch(`http://localhost:8000/applications/academic_procedure/api/update-seminar/${latestStudent.roll_no}/${latestStudent.seminar_date}/`, {
        method: "PUT", // Assuming you're updating existing data with a PUT request
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const updatedStudentData = await response.json();

        // Update the state with the new data after successful submission
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.roll_no === updatedStudentData.roll_no && student.seminar_date === updatedStudentData.seminar_date
              ? { ...student, ...updatedData }
              : student
          )
        );

        // Update the unique students list as well
        setUniqueStudents((prevUniqueStudents) =>
          prevUniqueStudents.map((student) =>
            student.roll_no === updatedStudentData.roll_no && student.seminar_date === updatedStudentData.seminar_date
              ? { ...student, ...updatedData }
              : student
          )
        );

        setSelectedStudent(null);

        alert("Data updated successfully!");
      } else {
        alert("Error updating data.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("An error occurred. Please try again.");
    }
  };
  const [allMembersConsented, setAllMembersConsented] = useState(false); 

  useEffect(() => {
    const checkConsent = async () => {
      
      try {
        const response = await fetch(`http://localhost:8000/applications/academic_procedure/api/check_pgpc_consent/${curr_student}`);
        const data = await response.json();
        setAllMembersConsented(data.all_members_consented); // Assuming API returns `{ all_consented: true/false }`

      } catch (error) {
        console.error("Error fetching consent data:", error);
      }
    };
  
    if (curr_student) {
      checkConsent();
    }
  }, [curr_student]);
  
  
  return (
    <div>
      {!selectedStudent ? (
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Title order={3}>Student List</Title>
          <Divider my="sm" />
          {uniqueStudents.map((student, index) => (
            <Group key={index} position="apart" mb="sm">
              <p><strong>{student.name}</strong> ({student.roll_no})</p>
              <Button onClick={() => handleViewDetails(student.roll_no)}>View</Button>
            </Group>
          ))}
        </Card>
      ) : (
        <>
          <PGPCForm ref={componentRef} studentEntries={selectedStudent} pgpcData={pgpcData} curr_committee_mem={committeeRoles} roll={curr_student} user={username} handleChange={handleChange} />
          {committeeRoles.includes('supervisor') && (
          <Group position="center" mt="lg">
            <Button onClick={handlePrint}>Download as PDF</Button>
            <Button onClick={() => setSelectedStudent(null)}>Back to Student List</Button>
            <Button onClick={handleSubmit} disabled={!allMembersConsented}>Submit</Button>
          </Group>
)}

          
        </>
      )}
    </div>
  );
};

export default PGPCPage;
