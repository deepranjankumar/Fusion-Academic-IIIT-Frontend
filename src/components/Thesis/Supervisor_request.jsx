import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  Button,
  Modal,
  Textarea,
  Notification,
  Container,
  Title,
  Card,
  Group,
  Text,
  Loader,
  Center,
  Stack,
  ActionIcon,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconX, IconAlertCircle, IconEdit, IconLock } from "@tabler/icons-react";

function SupervisorRequests({ userid }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [modalError, setModalError] = useState("");
  const [editedTheses, setEditedTheses] = useState({});

  const [isEditing, setIsEditing] = useState({});

  const fetchRequests = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:8000/applications/academic_procedure/api/supervisor/requests/${userid}`
      )
      .then((response) => setRequests(response.data))
      .catch(() => setError("Failed to fetch requests. Please try again."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (userid) {
      fetchRequests();
    }
  }, [userid]);

  const handleAccept = (request) => {
    if (!request.co_supervisor_consent) {
      alert("Cannot submit without Co-Supervisor consent!");
      return;
    }
  
    const updatedThesis = editedTheses[request.id] !== undefined ? editedTheses[request.id] : request.thesis_topic;
  
    axios
      .put(
        `http://localhost:8000/applications/academic_procedure/api/supervisor/accept-request/${request.id}/`,
        { thesis_topic: updatedThesis }
      )
      .then(() => {
        alert(request.message);
        setRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === request.id
              ? { ...req, forwarded_to_hod: true, thesis_topic: updatedThesis }
              : req
          )
        );
  
        // Reset the edit state
        setEditedTheses((prev) => ({ ...prev, [request.id]: undefined }));
        setIsEditing((prev) => ({ ...prev, [request.id]: false }));
      })
      .catch(() => alert("Failed to accept request. Try again."));
  };
  
  const handleRejectClick = (request) => {
    setSelectedRequest(request);
    setRejectModalVisible(true);
  };

  const handleRejectSubmit = () => {
    if (!rejectReason) {
      setModalError("Rejection reason is required.");
      return;
    }
    setModalError("");

    axios
      .delete(
        `http://localhost:8000/applications/academic_procedure/api/supervisor/reject-request/${selectedRequest.id}/`,
        { data: { reason: rejectReason } }
      )
      .then(() => {
        setRequests(requests.filter((req) => req.id !== selectedRequest.id));
        setRejectModalVisible(false);
      })
      .catch(() => setModalError("Failed to reject the request. Try again."));
  };

  return (
    <Center>
      <Container size="md" style={{ width: "100%" }}>
        <Title align="center" order={2} mt="md">
          📑 Supervisor Requests
        </Title>

        {loading && (
          <Center mt="md">
            <Loader color="blue" size="lg" />
          </Center>
        )}

        {error && (
          <Notification color="red" icon={<IconAlertCircle size="1.5rem" />} mt="md">
            {error}
          </Notification>
        )}

        {requests.length === 0 && !loading && (
          <Center mt="md">
            <Text color="dimmed" size="lg">No requests found.</Text>
          </Center>
        )}

        <Stack spacing="md" mt="lg" align="center" style={{ width: "100%" }}>
          {requests.map((req) => (
            <Card
              withBorder
              shadow="sm"
              radius="md"
              key={req.id}
              p="md"
              style={{ width: "100%", maxWidth: "600px" }}
            >
              <Group position="apart">
                <Stack spacing={4}>
                  <Text weight={600} size="lg">🎓 Student Name: {req.student_name}</Text>
                  <Text weight={600} size="sm">🆔 Roll No: {req.student_id}</Text>
                  <Text weight={600} size="sm">📚 Branch: {req.stream}</Text>

                  {/* Thesis Topic - Editable with Button Toggle */}
                  <Group>
                        {isEditing[req.id] ? (
                          <TextInput
                                label="📖 Thesis Topic"
                                value={editedTheses[req.id] !== undefined ? editedTheses[req.id] : req.thesis_topic}
                                onChange={(e) =>
                                  setEditedTheses((prev) => ({ ...prev, [req.id]: e.target.value }))
                                }
                              />

                        ) : (
                          <Text weight={600} size="sm">
                            📖 Thesis Topic: <strong>{req.thesis_topic || "Not Provided"}</strong>
                          </Text>
                        )}

                        <ActionIcon
                          color="blue"
                          variant="light"
                          size="lg"
                          onClick={() =>
                            setIsEditing((prev) => ({ ...prev, [req.id]: !prev[req.id] }))
                          }
                        >
                          <IconEdit size="1.5rem" />
                        </ActionIcon>
                      </Group>


                  {/* Co-Supervisor Consent */}
                  <Text color={req.co_supervisor_consent ? "green" : "red"}>
                    🤝 Co-Supervisor Consent: {req.co_supervisor_consent ? "✅ Given" : "❌ Not Given"}
                  </Text>
                </Stack>

                <Group>
                  {/* Submit Button - Disabled if Co-Supervisor Consent is Not Given */}
                  {req.co_supervisor_consent ? (
                    <ActionIcon
                      color="green"
                      variant="light"
                      size="lg"
                      onClick={() => handleAccept(req)}
                    >
                      <IconCheck size="1.5rem" />
                    </ActionIcon>
                  ) : (
                    <Tooltip label="Co-Supervisor consent required!" withArrow>
                      <ActionIcon
                        color="gray"
                        variant="light"
                        size="lg"
                        disabled
                      >
                        <IconLock size="1.5rem" />
                      </ActionIcon>
                    </Tooltip>
                  )}

                  {/* Reject Button */}
                  <ActionIcon
                    color="red"
                    variant="light"
                    size="lg"
                    onClick={() => handleRejectClick(req)}
                  >
                    <IconX size="1.5rem" />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}
        </Stack>

        {/* Reject Modal */}
        <Modal opened={rejectModalVisible} onClose={() => setRejectModalVisible(false)} title="❌ Provide Rejection Reason" centered>
          {modalError && (
            <Notification color="red" icon={<IconAlertCircle size="1.5rem" />} mb="md">
              {modalError}
            </Notification>
          )}
          <Textarea
            placeholder="Enter rejection reason"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            mb="md"
          />
          <Button fullWidth color="red" onClick={handleRejectSubmit}>🚫 Reject</Button>
        </Modal>
      </Container>
    </Center>
  );
}

SupervisorRequests.propTypes = {
  userid: PropTypes.string.isRequired,
};

export default SupervisorRequests;
