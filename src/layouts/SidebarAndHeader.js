import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Layout from "./Layout";
import Sidebar from "../components/Sidebar/Sidebar";
import { SidebarProvider, SidebarContext } from "../context/SidebarContext";
import { useContext, useEffect, useState } from "react";
import { FaUserAlt, FaMoneyBillAlt } from "react-icons/fa";

import { Box, Container, Flex, Grid, GridItem } from "@chakra-ui/react";

//icons
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { TiDocumentText, TfiLayoutListThumbAlt } from "react-icons/ti";
import { FaCompass, FaUserFriends, FaListAlt, FaQuestionCircle } from "react-icons/fa";
import {TbChevronsUpLeft} from "react-icons/tb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const SidebarAndHeader = ({ userRole }) => {
	//get width of sidebar component and set to state
	const [sidebarWidth, setSidebarWidth] = useState("");
	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		const width = window.getComputedStyle(document.getElementById("Sidebar")).width;
		setSidebarWidth(width);
		console.log(sidebarWidth);
	}, [sidebarWidth]);

	var Options = [];

	const StuOptions = [
		{ icon: GridViewRoundedIcon, name: "Dashboard", value: "dashboard", href: "/stu/dashboard" },
		{ icon: TiDocumentText, name: "Courses", value: "courses", href: "/stu/courses" },
		{ icon: FaCompass, name: "Content", value: "content", href: "/stu/content" },
	];

	const TeacherOptions = [
    {
      icon: GridViewRoundedIcon,
      name: "Dashboard",
      value: "dashboard",
      href: "/tutor/dashboard",
    },
    {
      icon: TiDocumentText,
      name: "Courses",
      value: "courses",
      href: "/tutor/courses",
    },
    {
      icon: FaCompass,
      name: "Contents",
      value: "contents",
      href: "/tutor/contents",
    },
    {
      icon: FaUserFriends,
      name: "Staffs",
      value: "staffs",
      href: "/tutor/staff",
    },
    {
      icon: FaListAlt,
      FaQuestionCircle,
      name: "MCQs",
      value: "MCQs",
      href: "/tutor/mcqpool",
    },
    {
      icon: FaQuestionCircle,
      name: "Complaints",
      value: "Complaints",
      href: "/tutor/complaints",
    },
  ];

	const InstStaffOptions = [
		{ icon: GridViewRoundedIcon, name: 'Dashboard', value: 'dashboard', href: '/staff/dashboard' },
		{ icon: FaCompass, name: "View Teacher", value: "viewTeacher", href: "/staff/teacher" },
		{icon: TiDocumentText, name: "Approve Class", value: "approveClass", href: "/staff/class"},
		{ icon: AccountCircleIcon, name: 'Profile', value: 'profile', href: '/staff/Profile' },
		{ icon: ReportProblemIcon, name: 'Complaints', value: 'complaints', href: '/staff/complaints' },
		{icon: TiDocumentText, name: "Hall Management", value: "hallSchedule", href: "/staff/hall"},
		{ icon: FaUserAlt, name: 'Institute Staffs', value: 'staff-list', href: '/staff/staff-list' },
		{ icon: FaMoneyBillAlt, name: 'Student Payments', value: 'payments', href: '/staff/stu-payment' }
	]

	switch (userRole) {
		case "student":
			Options = StuOptions;
			break;
		case "teacher":
			Options = TeacherOptions;
			break;
		case ('InstituteStaff'):
			Options = InstStaffOptions
			break;
		default:
			Options = StuOptions;
	}

	// console.log(sidebarWidth);
	//chakra ui layout for sidebar from components folder and header with an outlet for the children

	return (
		// <SidebarProvider>
		<Box
			sx={{
				"&::-webkit-scrollbar": {
					width: "16px",
					borderRadius: "8px",
					backgroundColor: `rgba(0, 0, 0, 0.05)`,
				},
				"&::-webkit-scrollbar-thumb": {
					backgroundColor: `rgba(0, 0, 0, 0.05)`,
				},
			}}
			h="100vh"
			w="100vw"
		>
			<Sidebar Options={Options} minimized={false} setSidebarWidth={setSidebarWidth} hidden={hidden} setHidden={setHidden} />
			<Box ml={{ base: "0", lg: sidebarWidth }} w={{ base: "100vw", lg: "calc(100vw - " + sidebarWidth + ")" }} h={"100vh"}>
				<Header w={{ base: "100%", lg: "calc(100% - " + sidebarWidth + ")" }} hidden={hidden} setHidden={setHidden} />
				<Flex pt={"64px"}>
					<Outlet />
				</Flex>
			</Box>
		</Box>
		// </SidebarProvider>

	);
};

export default SidebarAndHeader;