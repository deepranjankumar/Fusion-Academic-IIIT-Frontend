import React, { useState } from "react";
import { Container, Tabs } from "@mantine/core";
import classes from "./DoubleHeader.module.css";

const tabs = [
  "Home",
  "Current Semester",
  "Courses",
  "Pre-Registration",
  "Final-Registration",
  "Swayam-Registration",
  "Add-Drop",

  "Helpdesk",
];

// Define components for each tab
function Home() {
  return <div>Home Page Content</div>;
}
function RollList() {
  return <div>Roll List Page Content</div>;
}
function Supervisor() {
  return <div>Upload Result Page Content</div>;
}
function UploadResult() {
  return <div>Upload Result Page Content</div>;
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

export function StudentNavabr() {
  const [selectedTab, setSelectedTab] = useState("Home"); // Track the selected tab

  const handleTabChange = (value) => {
    if (value) setSelectedTab(value); // Ensure the value is valid before updating state
  };

  // Map tab names to their corresponding components
  const renderContent = () => {
    switch (selectedTab) {
      case "Courses":
        return <RollList />;
      case "Pre-Registration":
        return <Supervisor />;
      case "Final-Registration":
        return <UploadResult />;
      case "Swayam-Registration":
        return <Forums />;
      case "Add-Drop":
        return <Support />;
      case "Current Semester":
        return <Account />;
      case "Helpdesk":
        return <Helpdesk />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={classes.container}>
      {" "}
      {/* Container for the whole layout */}
      <div className={classes.header}>
        <Container size="md">
          <Tabs
            value={selectedTab} // Bind the selectedTab state to Tabs
            onChange={handleTabChange} // Use correct prop: `onChange`
            variant="outline"
          >
            <Tabs.List>
              {tabs.map((tab) => (
                <Tabs.Tab value={tab} key={tab}>
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
