import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { Layout } from "./components/layout";
import Dashboard from "./Modules/Dashboard/dashboardNotifications";
import Profile from "./Modules/Profile/profile";
import LoginPage from "./pages/login";
import ForgotPassword from "./pages/forgotPassword";
import AcademicPage from "./Modules/Academic/index";
import ReqSupervisior from "./components/Thesis/Req_supervisor";
// import ValidateAuth from "./helper/validateauth";
import InactivityHandler from "./helper/inactivityhandler";
import { FacultyNavabr } from "./components/Navbar/faculty";
import { StudentNavbar } from "./components/Navbar/Student";

export default function App() {
  const role =
    useSelector((state) => state.user.choosenRole) ||
    localStorage.getItem("selectedRole");
  const location = useLocation();
  return (
    <MantineProvider>
      <Notifications position="top-center" autoClose={2000} limit={1} />
      {/* {location.pathname !== "/accounts/login" && <ValidateAuth />} */}
      {location.pathname !== "/accounts/login" && <InactivityHandler />}

      <Routes>
        <Route path="/" element={<Navigate to="/accounts/login" replace />} />
        <Route
          path="/register-thesis"
          element={
            <Layout>
              <ReqSupervisior />
            </Layout>
          }
        />
        {role === "faculty" && (
          <Route
            path="/faculty-navbar"
            element={
              <Layout>
                <FacultyNavabr />
              </Layout>
            }
          />
        )}

        {role === "student" && (
          <Route
            path="/student-navbar"
            element={
              <Layout>
                <StudentNavbar />
              </Layout>
            }
          />
        )}
        {/* {role === "admin" && <Route path="/admin-dashboard" element={<AdminDashboard />} />}  */}

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/academics"
          element={
            <Layout>
              <AcademicPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
        <Route path="/accounts/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ForgotPassword />} />
      </Routes>
    </MantineProvider>
  );
}