import {
  Button,
  Center,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { useDispatch } from "react-redux"; // Import useDispatch
import { loginRoute } from "../routes/globalRoutes";

import {
  setUserName,
  setRollNo,
  setRole,
  setRoles,
  setAccessibleModules,
  setProgramme,
} from "../redux/userslice"; // Import Redux actions

function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Handle form submission (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make login request
      const response = await axios.post(loginRoute, {
        username: userName,
        password,
      });

      // Check if login is successful
      if (response.status === 200) {
        const { token, accessible_modules, user_id, role, programme } =
          response.data;

        console.log("Login response:", user_id);
        console.log("after login user the proramme is", programme);

        // Store the token in localStorage for future requests
        localStorage.setItem("authToken", token);

        // Dispatch actions to update Redux store with user data
        dispatch(setUserName(user_id)); // Store username in Redux
        dispatch(setRollNo(user_id)); // Store roll number in Redux
        dispatch(setRole(role)); // Set user role in Redux
        dispatch(setAccessibleModules(accessible_modules)); // Set accessible modules for the user
        dispatch(setProgramme(programme));
        dispatch(setRoles(role));
        // Show success notification
        notifications.show({
          title: "Login Successful",
          message: "You have been successfully logged in.",
          color: "green",
        });

        // Redirect to dashboard after successful login
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);

      // Handle different error cases
      if (err.response?.status === 400) {
        notifications.show({
          title: "Login Failed",
          message:
            "Invalid username or password! Please use correct credentials.",
          color: "red",
          position: "top-center",
          withCloseButton: false,
        });
      } else {
        notifications.show({
          title: "Error",
          message: "Something went wrong. Please try again later.",
          color: "red",
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Center w="100%">
      <Container w={420} my={100}>
        <Title ta="center">Welcome to Fusion!</Title>

        <Paper
          withBorder
          shadow="lg"
          p={30}
          mt={40}
          radius="md"
          style={{ border: "2px solid #15ABFF" }}
        >
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Username/Email"
              placeholder="username or email"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <PasswordInput
              label="Password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mt="lg"
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <Button
              fullWidth
              size="md"
              mt="xl"
              bg="#15ABFF"
              type="submit"
              loading={loading}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </Center>
  );
}

export default LoginPage;
