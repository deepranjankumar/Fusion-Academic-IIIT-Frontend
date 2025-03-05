import React, { useState } from "react";
import { Container, Tabs } from "@mantine/core";
import { useSelector } from "react-redux";
import classes from "./DoubleHeader.module.css";
import SupervisorRequests from "../Thesis/Supervisor_request";
import FacultyResultUpload from '../faculty/ResultUpload'
import PGPCForm from "../seminar/PGPC";
import TAAssignmentTest from "../TaAssistanship/TAAssignment";
const tabs = [
  "Home",
  "RollList",
  "Supervisor",
  "Upload Result",
  "Forums",
  "PGPC",
  "Assign TA",
  "Account",
  "Helpdesk",
];

// Define components for each tab
function Home() {
  return <div>Home Page Content</div>;
}
function RollList() {
  return <div>Roll List Page Content</div>;
}

function Forums() {
  return <div>Forums Page Content</div>;
}
function Support() {
  return <div>Support Page Content</div>;
}
function Account() {
  return <div>Account Page Content</div>;
}
function Helpdesk() {
  return <div>Helpdesk Page Content</div>;
}

export function FacultyNavabr() {
  const [selectedTab, setSelectedTab] = useState("Home"); // Track the selected tab
  const userId = useSelector((state) => state.user.username); // Move this inside the component
  console.log("username in the Navbar section", userId);

  const handleTabChange = (value) => {
    if (value) setSelectedTab(value);
  };

  // Map tab names to their corresponding components
  const renderContent = () => {
    switch (selectedTab) {
      case "PGPC":
        return <PGPCForm/>;
      case "RollList":
        return <RollList />;
      case "Supervisor":
        return <SupervisorRequests userid={userId} />;
      case "Upload Result":
        return <FacultyResultUpload/>;
      case "Forums":
        return <Forums />;
      case "Support":
        return <Support />;
      case "Account":
        return <Account />;
      case "Helpdesk":
        return <Helpdesk />;
        case "Assign TA":
        return < TAAssignmentTest />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Container size="md">
        <Tabs
  value={selectedTab}
  onChange={handleTabChange}
  styles={{
    tabLabel: { fontSize: "16px", fontWeight: "500", letterSpacing: "0.5px" }, // Applies to all tabs
  }}
>
  <Tabs.List  >
    {tabs.map((tab) => (
      <Tabs.Tab 
        value={tab} 
        key={tab}
        styles={{
          tabLabel: {
            fontSize: "18px", // Slightly larger for better readability
            fontWeight: selectedTab === tab ? "600" : "600", // Bold active tab
            color: selectedTab === tab ? "#007bff" : "#333", // Highlight active tab
            transition: "color 0.3s ease", // Smooth transition
          },
        }}
      >
        {tab}
      </Tabs.Tab>
    ))}
  </Tabs.List>
</Tabs>

        </Container>
      </div>

      {/* Content Area */}
      <div className={classes.content}>{renderContent()}</div>
    </div>
  );
}
