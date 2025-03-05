// import React, { useState } from "react";
// import { Button, TextInput, Textarea, Select, Card, Title, Divider, Group } from "@mantine/core";

// // PGPCForm Component
// const PGPCForm = React.forwardRef(({ studentData }, ref) => {
//   const [pgpcData, setPgpcData] = useState({
//     quality_of_work: "",
//     quantity_of_work: "",
//     overall_grade: "",
//     panel_report: "",
//     comments: "",
//     faculty_signature: "",
//     faculty_name: "",
//     evaluation_date: "",
//   });

//   const handleChange = (field, value) => {
//     setPgpcData((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div ref={ref}>
//       <Card shadow="sm" p="lg" radius="md" withBorder>
//         <Title order={3}>Student Details</Title>
//         <Divider my="sm" />
//         <p><strong>Discipline:</strong> {studentData.discipline}</p>
//         <p><strong>Name:</strong> {studentData.name}</p>
//         <p><strong>Roll No.:</strong> {studentData.roll_no}</p>
//         <p><strong>Theme of Work:</strong> {studentData.theme}</p>
//         <p><strong>Seminar Date:</strong> {studentData.seminar_date} | <strong>Time:</strong> {studentData.seminar_time} | <strong>Place:</strong> {studentData.place}</p>
//         <p><strong>Previous Work:</strong> {studentData.work_done}</p>
//         <p><strong>Current Contribution:</strong> {studentData.specific_contribution}</p>
//         <p><strong>Future Plan:</strong> {studentData.future_plan}</p>
//         <p><strong>Publications Count:</strong> {studentData.publications_count}</p>
//         <p><strong>Papers Published:</strong> {studentData.papers_published}</p>
//         <p><strong>Papers Presented:</strong> {studentData.papers_presented}</p>
//         <p><strong>Papers Submitted:</strong> {studentData.papers_submitted}</p>
//       </Card>

//       <Card shadow="sm" p="lg" radius="md" withBorder mt="lg">
//         <Title order={3}>PGPC Evaluation</Title>
//         <Divider my="sm" />
        
//         {/* Quality of Work Selection */}
//         <Select
//           label="Quality of Work"
//           data={["Excellent", "Good", "Satisfactory", "Unsatisfactory"]}
//           value={pgpcData.quality_of_work}
//           onChange={(value) => handleChange("quality_of_work", value)}
//         />
        
//         {/* Quantity of Work Selection */}
//         <Select
//           label="Quantity of Work"
//           data={["Enough", "Just Sufficient", "Insufficient"]}
//           value={pgpcData.quantity_of_work}
//           onChange={(value) => handleChange("quantity_of_work", value)}
//         />
        
//         {/* Overall Grade Selection */}
//         <Select
//           label="Overall Grade"
//           data={["A+", "A", "B+", "B", "C+", "C", "D+", "D", "F"]}
//           value={pgpcData.overall_grade}
//           onChange={(value) => handleChange("overall_grade", value)}
//         />
        
//         {/* Panel Report / Recommendations */}
//         <Textarea
//           label="Panel Report / Recommendations"
//           value={pgpcData.panel_report}
//           onChange={(event) => handleChange("panel_report", event.target.value)}
//         />
        
//         {/* Comments / Suggestions */}
//         <Textarea
//           label="Comments / Suggestions"
//           value={pgpcData.comments}
//           onChange={(event) => handleChange("comments", event.target.value)}
//         />
        
//         {/* Faculty Names */}
//         <TextInput
//           label="Faculty Names"
//           value={pgpcData.faculty_name}
//           onChange={(event) => handleChange("faculty_name", event.target.value)}
//         />
        
//         {/* Faculty Signatures */}
//         <TextInput
//           label="Faculty Signatures"
//           value={pgpcData.faculty_signature}
//           onChange={(event) => handleChange("faculty_signature", event.target.value)}
//         />
        
//         {/* Evaluation Date */}
//         <TextInput
//           label="Evaluation Date"
//           type="date"
//           value={pgpcData.evaluation_date}
//           onChange={(event) => handleChange("evaluation_date", event.target.value)}
//         />
//       </Card>

//       <Group position="center" mt="lg">
//         <Button onClick={() => alert('PGPC Evaluation submitted!')}>Submit Evaluation</Button>
//       </Group>
//     </div>
//   );
// });

// export default PGPCForm;
