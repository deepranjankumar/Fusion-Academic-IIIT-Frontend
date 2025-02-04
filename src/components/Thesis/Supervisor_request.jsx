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
} from "@mantine/core";
import { IconCheck, IconX, IconAlertCircle } from "@tabler/icons-react";

function SupervisorRequests({ userid }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [thesisTopic, setThesisTopic] = useState("");
  const [modalError, setModalError] = useState("");

  const fetchRequests = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:8000/applications/academic_procedure/api/supervisor/requests/${userid}`,
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

  const handleAcceptClick = (requestId) => {
    setSelectedRequest(requests.find((r) => r.id === requestId));
    setModalVisible(true);
  };

  const handleRejectClick = (requestId) => {
    axios
      .delete(
        `http://localhost:8000/applications/academic_procedure/api/supervisor/reject-request/${requestId}/`,
      )
      .then(() => setRequests(requests.filter((req) => req.id !== requestId)))
      .catch(() => alert("Failed to reject the request. Try again."));
  };

  const handleSubmit = () => {
    if (!thesisTopic) {
      setModalError("Thesis Topic is required.");
      return;
    }
    setModalError("");
    axios
      .put(
        `http://localhost:8000/applications/academic_procedure/api/supervisor/accept-request/${selectedRequest.id}/`,
        {
          thesis_topic: thesisTopic,
        },
      )
      .then(() => {
        setRequests(
          requests.map((req) =>
            req.id === selectedRequest.id
              ? { ...req, thesis_topic: thesisTopic, forwarded_to_hod: true }
              : req,
          ),
        );
        setThesisTopic("");
        setModalVisible(false);
      })
      .catch(() => setModalError("Failed to accept the request. Try again."));
  };

  return (
    <Container size="lg">
      <Title align="center" order={2} mt="md">
        📑 Supervisor Requests
      </Title>

      {loading && (
        <Center mt="md">
          <Loader color="blue" size="lg" />
        </Center>
      )}

      {error && (
        <Notification
          color="red"
          icon={<IconAlertCircle size="1.5rem" />}
          mt="md"
        >
          {error}
        </Notification>
      )}

      {requests.length === 0 && !loading && (
        <Center mt="md">
          <Text color="dimmed" size="lg">
            No requests found.
          </Text>
        </Center>
      )}

      <Stack spacing="md" mt="lg">
        {requests.map((req) => (
          <Card withBorder shadow="sm" radius="md" key={req.id} p="md">
            <Group position="apart">
              <Stack spacing={4}>
                <Text weight={600} size="lg">
                  🎓 Student ID: {req.student_id}
                </Text>
                <Text color="dimmed">
                  <strong>Thesis Topic:</strong>{" "}
                  {req.thesis_topic || "Not Provided"}
                </Text>
              </Stack>
              <Group>
                <ActionIcon
                  color="green"
                  variant="light"
                  size="lg"
                  onClick={() => handleAcceptClick(req.id)}
                >
                  <IconCheck size="1.5rem" />
                </ActionIcon>
                <ActionIcon
                  color="red"
                  variant="light"
                  size="lg"
                  onClick={() => handleRejectClick(req.id)}
                >
                  <IconX size="1.5rem" />
                </ActionIcon>
              </Group>
            </Group>
          </Card>
        ))}
      </Stack>

      <Modal
        opened={modalVisible}
        onClose={() => setModalVisible(false)}
        title="📜 Enter Thesis Topic"
      >
        {modalError && (
          <Notification
            color="red"
            icon={<IconAlertCircle size="1.5rem" />}
            mb="md"
          >
            {modalError}
          </Notification>
        )}
        <Textarea
          placeholder="Enter thesis topic"
          value={thesisTopic}
          onChange={(e) => setThesisTopic(e.target.value)}
          mb="md"
        />
        <Button fullWidth onClick={handleSubmit}>
          ✅ Submit
        </Button>
      </Modal>
    </Container>
  );
}

SupervisorRequests.propTypes = {
  userid: PropTypes.string.isRequired,
};

export default SupervisorRequests;
