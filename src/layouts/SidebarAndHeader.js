import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";

import { Box, Container, Flex, Grid, GridItem } from "@chakra-ui/react";

//icons
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { TiDocumentText } from "react-icons/ti";
import { FaCompass, FaList, FaQuestionCircle, FaUserFriends } from "react-icons/fa";

const SidebarAndHeader = ({ userRole }) => {
  var Options = [];
  const StuOptions = [
    {
      icon: GridViewRoundedIcon,
      name: "Dashboard",
      value: "dashboard",
      href: "/dashboard",
    },
    {
      icon: TiDocumentText,
      name: "Courses",
      value: "courses",
      href: "/courses",
    },
    { icon: FaCompass, name: "Content", value: "content", href: "/content" },
  ];

  const TeacherOptions = [
    {
      icon: GridViewRoundedIcon,
      name: "Dashboard",
      value: "dashboard",
      href: "/dashboard",
    },
    {
      icon: TiDocumentText,
      name: "Courses",
      value: "courses",
      href: "/courses",
    },
    {
      icon: FaCompass,
      name: "Content",
      value: "content",
      href: "/content",
    },
    {
      icon: FaUserFriends,
      name: "Staff",
      value: "staff",
      href: "/staff",
    },
    {
      icon: FaList,
      name: "MCQs",
      value: "mcq",
      href: "/mcqpool",
    },
    {
      icon: FaQuestionCircle,
      name: "Complaints",
      value: "complaints",
      href: "/complaints",
    },
  ];

  switch (userRole) {
    case "student":
      Options = StuOptions;
      break;
    case "teacher":
      Options = TeacherOptions;
      break;
    default:
      Options = StuOptions;
  }

  //chakra ui layout for sidebar from components folder and header with an outlet for the children
  return (
    <Grid
      w="100vw"
      templateAreas={`"sidebar header" "sidebar main"`}
      templateColumns={{ base: "auto 1fr", md: "auto 1fr" }}
      templateRows={{ base: "auto 1fr", md: "auto 1fr" }}
      scrollBehavior={"smooth"}
    >
      <SidebarProvider>
        <Sidebar Options={Options} minimized={false} />
      </SidebarProvider>
      <Flex direction={"column"} w={"full"} h={"100vh"} overflow={"hidden"}>
        <Header />
        <div>
          <Outlet />
        </div>
      </Flex>
    </Grid>
  );
};

export default SidebarAndHeader;
