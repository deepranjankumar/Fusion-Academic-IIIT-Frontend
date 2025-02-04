import React, { useState } from "react";
import {
  Flex,
  Stack,
  Button,
  ScrollArea,
  Divider,
  Tooltip,
} from "@mantine/core";
import {
  House as HomeIcon,
  Books as AcademicsIcon,
  CalendarBlank as CurriculumIcon,
  Exam as ExamIcon,
  Question as HelpIcon,
  User as ProfileIcon,
  Gear as SettingsIcon,
  CaretRight,
  CaretLeft,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import IIITLOGO from "../assets/IIITJ_logo.webp";
import { setCurrentModule } from "../redux/moduleslice";

const commonModules = [
  {
    label: "Home",
    id: "home",
    icon: <HomeIcon size={18} />,
    url: "/dashboard",
  },
  {
    label: "Academics",
    id: "course_registration",
    icon: <AcademicsIcon size={18} />,
    url: "/academics",
  },
  {
    label: "Program & Curriculum",
    id: "program_and_curriculum",
    icon: <CurriculumIcon size={18} />,
    url: "/academics",
  },
  {
    label: "Examination",
    id: "Examinations",
    icon: <ExamIcon size={18} />,
    url: "/",
  },
];

const M_Tech_studentModules = [
  {
    label: "Home",
    id: "home",
    icon: <HomeIcon size={18} />,
    url: "/dashboard",
  },
  {
    label: "Current Courses",
    id: "current_courses",
    icon: <ProfileIcon size={18} />,
    url: "/current-courses",
  },
  {
    label: "Register Courses",
    id: "reg_courses",
    icon: <ProfileIcon size={18} />,
    initiallyOpened: true,
    links: [
      { label: "Course Registration", url: "/register-courses" },
      { label: "Seminar Registration", url: "/register-seminar" },
      { label: "Thesis Registration", url: "/register-thesis" },
      {
        label: "Swayam",
        id: "swayam_courses",
        icon: <ProfileIcon size={18} />,
        url: "/swayam-courses",
      },
    ],
  },

  {
    label: "Add Course",
    id: "add_course",
    icon: <SettingsIcon size={18} />,
    url: "/add-course",
  },
  {
    label: "Drop Course",
    id: "drop_course",
    icon: <HelpIcon size={18} />,
    url: "/drop-course",
  },
  {
    label: "Result",
    id: "result",
    icon: <ProfileIcon size={18} />,
    url: "/result",
  },
];

const studentModules = [
  {
    label: "Current Courses",
    id: "current_courses",
    icon: <ProfileIcon size={18} />,
    url: "/current-courses",
  },
  {
    label: "Register Courses",
    id: "reg_courses",
    icon: <ProfileIcon size={18} />,
    links: [
      {
        label: "Course Registration",
        id: "course_reg",
        url: "/register-courses",
      },
      {
        label: "Swayam  Registration",
        id: "seminar_reg",
        url: "/register-seminar",
      },
    ],
  },
  {
    label: "Add Course",
    id: "add_course",
    icon: <SettingsIcon size={18} />,
    url: "/add-course",
  },
  {
    label: "Drop Course",
    id: "drop_course",
    icon: <HelpIcon size={18} />,
    url: "/drop-course",
  },
  {
    label: "Result",
    id: "result",
    icon: <ProfileIcon size={18} />,
    url: "/result",
  },
];

function SidebarContent({ isCollapsed, toggleSidebar }) {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(null);
  const [selected, setSelected] = useState(null);
  const [openNested, setOpenNested] = useState(null);
  const userRole = useSelector((state) => state.user.role);
  const programme = useSelector((state) => state.user.programme);
  const navigate = useNavigate();

  const getModulesByRole = () => {
    if (userRole === "student" && programme === "B.Tech") {
      return [...M_Tech_studentModules];
    }
    if (userRole === "student" && programme === "B.Tech")
      return [...studentModules];
    return commonModules;
  };

  const filteredModules = getModulesByRole();

  const handleModuleClick = (item) => {
    if (item.links) {
      setOpenNested(openNested === item.id ? null : item.id);
    } else {
      setSelected(item.label);
      dispatch(setCurrentModule(item.label));
      navigate(item.url);
    }
  };

  return (
    <>
      <Flex gap={32} align="center" h={64} justify="center">
        {!isCollapsed && (
          <img src={IIITLOGO} alt="IIIT Logo" style={{ maxWidth: "150px" }} />
        )}
        <Flex
          onClick={toggleSidebar}
          onMouseEnter={() => setHover("toggle")}
          onMouseLeave={() => setHover(null)}
          bg={hover === "toggle" ? "#e9ecef" : ""}
          style={{ borderRadius: "6px", cursor: "pointer" }}
          justify="center"
          p="4px"
        >
          {isCollapsed ? <CaretRight size={24} /> : <CaretLeft size={24} />}
        </Flex>
      </Flex>

      <Stack h="90%" justify="space-around">
        <ScrollArea mah={600} type={!isCollapsed && "always"} scrollbars="y">
          <Stack spacing="xs" mt="16px" align="flex-start" gap="4px">
            {filteredModules.map((item) => (
              <div key={item.id} style={{ width: "100%" }}>
                <Tooltip
                  label={isCollapsed ? item.label : ""}
                  position="right"
                  offset={-16}
                  withArrow={isCollapsed}
                  p={!isCollapsed ? 0 : undefined}
                >
                  <Button
                    key={item.id}
                    fullWidth
                    variant={
                      hover === item.id
                        ? "subtle"
                        : selected === item.id
                          ? "outline"
                          : "transparent"
                    }
                    leftSection={item.icon}
                    rightSection={
                      item.links &&
                      (openNested === item.id ? (
                        <CaretUp size={16} />
                      ) : (
                        <CaretDown size={16} />
                      ))
                    }
                    style={{ display: "flex", justifyContent: "space-between" }}
                    color={
                      hover === item.id || selected === item.id
                        ? "blue"
                        : "#535455"
                    }
                    onMouseEnter={() => setHover(item.id)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => handleModuleClick(item)}
                  >
                    {!isCollapsed && item.label}
                  </Button>
                </Tooltip>

                {item.links && openNested === item.id && (
                  <Stack spacing="xs" mt="4px" align="flex-start" gap="2px">
                    {item.links.map((link) => (
                      <Button
                        key={link.id}
                        fullWidth
                        variant="subtle"
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                        color="#535455"
                        onClick={() => {
                          setSelected(link.label);
                          dispatch(setCurrentModule(link.label));
                          navigate(link.url);
                        }}
                      >
                        {!isCollapsed && link.label}
                      </Button>
                    ))}
                  </Stack>
                )}
              </div>
            ))}
          </Stack>
        </ScrollArea>

        <Divider
          my="sm"
          label={!isCollapsed && "Miscellaneous"}
          labelPosition="center"
        />
        <Stack spacing="xs" mt="2px" align="flex-start" gap={4}>
          <Button
            variant="transparent"
            leftSection={<ProfileIcon size={18} />}
            color="#535455"
          >
            {!isCollapsed && "Profile"}
          </Button>
          <Button
            variant="transparent"
            leftSection={<SettingsIcon size={18} />}
            color="#535455"
          >
            {!isCollapsed && "Settings"}
          </Button>
          <Button
            variant="transparent"
            leftSection={<HelpIcon size={18} />}
            color="#535455"
          >
            {!isCollapsed && "Help"}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

SidebarContent.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default SidebarContent;
