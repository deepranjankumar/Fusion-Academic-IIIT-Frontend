import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Select,
  Button,
  Group,
  Paper,
  Notification,
  Loader,
  Input,
  Checkbox,
} from "@mantine/core";

function SupervisorForm({ faculty = [], onClose }) {
  const [category, setCategory] = useState("");
  const [researchArea, setResearchArea] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [coSupervisor, setCoSupervisor] = useState("");
  const [externalMentor, setExternalMentor] = useState(false);
  const [mentorName, setMentorName] = useState("");
  const [mentorEmail, setMentorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const rollNo = useSelector((state) => state.user.roll_no);
  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      roll_no: rollNo,
      category,
      thesis_topic: researchArea,
      supervisor_id: supervisor,
      co_supervisor_id: coSupervisor,
      external_mentor: externalMentor ? { name: mentorName, email: mentorEmail } : null,
    };

    try {
      await axios.post("http://localhost:8000/api/submit_supervisors/", payload);
      setMessage("Form submitted successfully!");
      setTimeout(() => {
        setMessage("");
        onClose();
      }, 5000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ maxWidth: 600, margin: "0 auto", padding: 20, borderRadius: 12 }}>
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>Supervisor Selection</h2>

      {/* Roll No and Name (Auto-filled) */}
      <Input label="Roll No" value={rollNo} disabled style={{ marginBottom: 15 }} />

      {/* Category of Registration */}
      <Select
        label="Category of Registration"
        value={category}
        onChange={setCategory}
        placeholder="Select Category"
        data={["Regular", "Sponsored", "External"]}
        style={{ marginBottom: 15 }}
      />

      {/* Area of Research */}
      <Input
        label="Area of Research"
        value={researchArea}
        onChange={(e) => setResearchArea(e.target.value)}
        placeholder="Enter Research Area"
        style={{ marginBottom: 15 }}
      />

      {/* Supervisor Selection */}
      <Select
        label="Supervisor"
        value={supervisor}
        onChange={setSupervisor}
        placeholder="Select Supervisor"
        data={faculty.filter((f) => f.id !== coSupervisor).map((f) => ({ value: f.id, label: f.name }))}
        style={{ marginBottom: 15 }}
      />

      {/* Co-Supervisor Selection */}
      <Select
        label="Co-Supervisor"
        value={coSupervisor}
        onChange={setCoSupervisor}
        placeholder="Select Co-Supervisor"
        data={faculty.filter((f) => f.id !== supervisor).map((f) => ({ value: f.id, label: f.name }))}
        style={{ marginBottom: 15 }}
      />

      {/* External Mentor Checkbox */}
      <Checkbox
        label="Do you have an external mentor?"
        checked={externalMentor}
        onChange={(e) => setExternalMentor(e.currentTarget.checked)}
        style={{ marginBottom: 15 }}
      />

      {/* External Mentor Details (Conditional) */}
      {externalMentor && (
        <>
          <Input
            label="External Mentor Name"
            value={mentorName}
            onChange={(e) => setMentorName(e.target.value)}
            placeholder="Enter Mentor Name"
            style={{ marginBottom: 15 }}
          />
          <Input
            label="External Mentor Email"
            value={mentorEmail}
            onChange={(e) => setMentorEmail(e.target.value)}
            placeholder="Enter Mentor Email"
            style={{ marginBottom: 15 }}
          />
        </>
      )}

      {/* Submission Message */}
      {message && (
        <Notification color={message.includes("successfully") ? "green" : "red"} style={{ marginTop: 20 }}>
          {message}
        </Notification>
      )}

      {/* Submit and Cancel Buttons */}
      <Group position="apart" style={{ marginTop: 30 }}>
        <Button onClick={handleSubmit} loading={loading} color="blue">Submit</Button>
        <Button onClick={onClose} variant="outline">Cancel</Button>
      </Group>

      {/* Loading Indicator */}
      {loading && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", background: "rgba(255, 255, 255, 0.8)", zIndex: 1000 }}>
          <Loader />
        </div>
      )}
    </Paper>
  );
}

SupervisorForm.propTypes = {
  faculty: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SupervisorForm;
