import React, { useState,useEffect } from "react";
import { Container, Tabs } from "@mantine/core";
import { useSelector } from "react-redux";
import classes from "./DoubleHeader.module.css";
import ReqSupervisior from "../Thesis/Req_supervisor"
import { Alert } from "@mantine/core";
import { XCircleIcon } from "@heroicons/react/24/solid";
import MastersForm from "../seminar/SeminarProgress"
import { Text, Divider } from "@mantine/core";

const btechTabs = [
  "Current Semester",
  "Courses",
  "Pre-Registration",
  "Final-Registration",
  "Swayam-Registration",
  "Add-Drop",
];

const mtechTabs = [
  "Current Semester",
  "Courses",
  "Pre-Registration",
  "Final-Registration",
  "Swayam-Registration",
  "Add-Drop",
  "TA Assistant",
  "Seminar",
  "Thesis",
];


function renderThesisDetails(thesis) {
  return (
    <>
      <Text size="md" fw={500}><b>Thesis Topic:</b> {thesis.thesis_topic}</Text>
      <Text size="md" fw={500}><b>Supervisor:</b> {thesis.supervisor_id}</Text>
      <Text size="md" fw={500}><b>Co-Supervisor:</b> {thesis.co_supervisor_id}</Text>

      <Divider my="sm" />

      {/* <Title order={4}>Committee Members</Title>
      <Text size="md"><b>Member 1:</b> {thesis.member1}</Text>
      <Text size="md"><b>Member 2:</b> {thesis.member2}</Text>
      <Text size="md"><b>Member 3:</b> {thesis.member3}</Text> */}
    </>
  );
}


// Define components for each tab



function Home() {
  return <div>Home Page Content</div>;
}

function RollList() {
  return <div>Roll List Page Content</div>;
}

function Supervisor() {
  return <div>Pre-Registration Page Content</div>;
}

function UploadResult() {
  return <div>Final Registration Page Content</div>;
}

function Forums() {
  return <div>Swayam Registration Page Content</div>;
}

function Support() {
  return <div>Add-Drop Page Content</div>;
}

function Account() {
  return <div>Current Semester Page Content</div>;
}

function Helpdesk() {
  return <div>Helpdesk Page Content</div>;
}

function Status() {
  return <Alert 
  icon={<XCircleIcon className="w-5 h-5" />} 
  title="Pending Status" 
  color="teal"
  className="w-[45vw] mx-auto text-center"
>
    Your supervisor request is pending. Please wait for approval.
</Alert>

}

export function StudentNavbar() {
  console.log("StudentNavbar is rendering");
  const programme = useSelector((state) => state.user.programme);
  console.log("Programme value in student role:", programme);
  const id = useSelector((state) => state.user.roll_no);
  const tabs = programme === 'B.Tech' ? mtechTabs : btechTabs;
  const [selectedTab, setSelectedTab] = useState("Home"); // Default tab
  const [status, setStatus] = useState(false); // Default: false (pending)
  const [loading, setLoading] = useState(true); // To handle API loading state
  const[Data,setData]=useState({}); //
  console.log(loading)
  useEffect(() => {
    const fetchThesisStatus = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8000/applications/academic_procedure/api/thesis-status/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch Status");

        const data = await response.json();
        setData(data)
        console.log("Fetched Status:", data);

        setStatus(data.pending_supervisor&&!data.approval_by_hod); // Assuming `approval_supervisor` determines status
      } catch (error) {
        console.error("Error fetching Status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThesisStatus();
  }, [id]);




  const handleTabChange = (value) => {
    if (value) setSelectedTab(value);
  };

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
      case "Seminar":
        return <MastersForm />;
case "Thesis": {
  if (status === true&&Data.approval_supervisor===false) {
    return <Status />;
  }
   else if (Data.approval_supervisor === true) {
    return renderThesisDetails(Data);
  } else {
    return <ReqSupervisior />;
  }
}

      default:
        return <Home />;
    }
  };

  return (
   <div className={classes.container}>
  <div className={classes.header}>
    <Container fluid className="w-full" size="md">
    <Tabs
  value={selectedTab}
  onChange={handleTabChange}
  styles={{
    tabLabel: { fontSize: "16px", fontWeight: "500", letterSpacing: "0.5px" }, // Applies to all tabs
  }}
>
  <Tabs.List>
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
  <div className={classes.content}>{renderContent()}</div>
</div>
  );
}
