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
  InputWrapper,
} from "@mantine/core";

function SupervisorForm({ faculty = [], onClose }) {
  const [supervisor, setSupervisor] = useState("");
  const [coSupervisor1, setCoSupervisor1] = useState("");
  const [coSupervisor2, setCoSupervisor2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const id = useSelector((state) => state.user.roll_no);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      supervisor_id: supervisor,
      co_supervisor_id_1: coSupervisor1,
      co_supervisor_id_2: coSupervisor2,
      student_id: id,
    };

    try {
      await axios.post(
        "http://localhost:8000/api/submit_supervisors/",
        payload,
      );
      setMessage("Supervisor data has been submitted successfully!");

      setTimeout(() => {
        setMessage(""); // Clear message
        onClose(); // Close the form
      }, 5000);
    } catch (error) {
      console.error(error);
      setMessage("Failed to submit the supervisors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      style={{
        maxWidth: 500,
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Choose Supervisor
      </h2>

      {/* Supervisor Selection */}
      <InputWrapper
        description="Choose your supervisor"
        style={{ marginBottom: "15px" }}
      >
        <Select
          value={supervisor}
          onChange={setSupervisor}
          placeholder="Select Supervisor"
          data={faculty
            .filter((f) => f.id !== coSupervisor1 && f.id !== coSupervisor2)
            .map((f) => ({ value: f.id, label: f.name }))}
        />
      </InputWrapper>

      {/* Co-Supervisor 1 Selection */}
      <InputWrapper
        description="Choose your first co-supervisor"
        style={{ marginBottom: "15px" }}
      >
        <Select
          value={coSupervisor1}
          onChange={setCoSupervisor1}
          placeholder="Select Co-Supervisor 1"
          data={faculty
            .filter((f) => f.id !== supervisor && f.id !== coSupervisor2)
            .map((f) => ({ value: f.id, label: f.name }))}
        />
      </InputWrapper>

      {/* Co-Supervisor 2 Selection */}
      <InputWrapper
        description="Choose your second co-supervisor"
        style={{ marginBottom: "15px" }}
      >
        <Select
          value={coSupervisor2}
          onChange={setCoSupervisor2}
          placeholder="Select Co-Supervisor 2"
          data={faculty
            .filter((f) => f.id !== supervisor && f.id !== coSupervisor1)
            .map((f) => ({ value: f.id, label: f.name }))}
        />
      </InputWrapper>

      {/* Loading Indicator */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.8)",
            zIndex: 1000,
          }}
        >
          <Loader />
        </div>
      )}

      {/* Submission Message */}
      {message && (
        <Notification
          style={{ marginTop: "20px" }}
          color={message.includes("successfully") ? "green" : "red"}
        >
          {message}
        </Notification>
      )}

      {/* Submit and Cancel Buttons */}
      <Group position="apart" style={{ marginTop: "30px" }}>
        <Button
          onClick={handleSubmit}
          loading={loading}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
          }}
        >
          Submit
        </Button>
        <Button
          onClick={onClose}
          variant="outline"
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            color: "#333",
            borderColor: "#ccc",
          }}
        >
          Cancel
        </Button>
      </Group>
    </Paper>
  );
}

SupervisorForm.propTypes = {
  faculty: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SupervisorForm;
