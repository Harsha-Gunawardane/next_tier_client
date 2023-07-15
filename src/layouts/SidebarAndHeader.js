import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import { SidebarProvider, SidebarContext } from "../context/SidebarContext";
import { useContext, useEffect, useState } from "react";

import { Box, Container, Flex, Grid, GridItem } from "@chakra-ui/react";

//icons
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { TiDocumentText } from "react-icons/ti";
import { FaCompass } from "react-icons/fa";
import { TbChevronsUpLeft } from "react-icons/tb";

const SidebarAndHeader = ({ userRole }) => {
	//get width of sidebar component and set to state
	const [sidebarWidth, setSidebarWidth] = useState("");

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
		{ icon: GridViewRoundedIcon, name: "Dashboard", value: "dashboard", href: "/dashboard" },
		{ icon: TiDocumentText, name: "Courses", value: "courses", href: "/courses" },
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

	// console.log(sidebarWidth);
	//chakra ui layout for sidebar from components folder and header with an outlet for the children

	return (
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
			}}>
			<SidebarProvider>
				<Sidebar Options={Options} minimized={false} setSidebarWidth={setSidebarWidth} />
			</SidebarProvider>
			<Box ml={sidebarWidth} w={"calc(100% - " + sidebarWidth + ")"} h={"100vh"}>
				<Header w={"calc(100% - " + sidebarWidth + ")"} />
				<Flex as="Middle" pt={"64px"}>
					<Outlet />
				</Flex>
			</Box>
		</Box>
	);
};

export default SidebarAndHeader;