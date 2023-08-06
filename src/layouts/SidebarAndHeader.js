import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import ResponsiveSidebar from "../components/Sidebar/ResponsiveSidebar";

import { useState } from "react";
import { FaUserAlt, FaMoneyBillAlt } from "react-icons/fa";

import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";

//icons
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { TiDocumentText } from "react-icons/ti";
import { FaCompass, FaUserFriends, FaListAlt, FaQuestionCircle } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const SidebarAndHeader = ({ userRole }) => {
	//get width of sidebar component and set to state
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [hidden, setHidden] = useState(isOpen);
	const [minimized, setMinimized] = useState({ base: false, md: true, lg: false });


	const setTemplateColumns = (minimized) => {
		var templateColumns = { base: "0 1fr", md: "260px 1fr", lg: "260px 1fr" };
		if (minimized.md) {
			templateColumns.md = "64px 1fr";
		} else if (minimized.lg) {
			templateColumns.lg = "64px 1fr";
		}
		return templateColumns;
	}

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
		{ icon: TiDocumentText, name: "Approve Class", value: "approveClass", href: "/staff/class" },
		{ icon: AccountCircleIcon, name: 'Profile', value: 'profile', href: '/staff/Profile' },
		{ icon: ReportProblemIcon, name: 'Complaints', value: 'complaints', href: '/staff/complaints' },
		{ icon: TiDocumentText, name: "Hall Management", value: "hallSchedule", href: "/staff/hall" },
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


	return (
		// <SidebarProvider>
		// <Box
		// 	h="100vh"
		// 	w="100vw"
		// 	overflowX={"hidden"}
		// 	overflowY={"auto"}
		// >
		// 	{/* <Sidebar Options={Options} minimized={{ base: false, md: true, lg: false }} setSidebarWidth={setSidebarWidth} hidden={hidden} setHidden={setHidden} /> */}
		// 	<ResponsiveSidebar Options={Options} minimized={minimized} setMinimized={setMinimized} hidden={hidden} setHidden={setHidden} open={isOpen} onOpening={onOpen} close={onClose} position={"fixed"} />

		// 	<Box
		// 		ml={{ base: "0", md: minimized.md ? "64px" : "260px", lg: minimized.lg ? "64px" : "260px" }}
		// 		w={{ base: "100vw", md: minimized.md ? "calc(100% - 72px)" : "calc(100% - 268px)", lg: minimized.lg ? "calc(100% - 72px)" : "calc(100% - 268px)" }}
		// 		h={"100vh"}
		// 		transition={"all 0.5s ease"}
		// 	>
		// 		{/* <Header w={{ base: "100%", lg: "calc(100% - " + sidebarWidth + ")" }} hidden={hidden} setHidden={setHidden} /> */}
		// 		<Header
		// 			w={{ base: "100vw", md: minimized.md ? "calc(100vw - 72px)" : "calc(100vw - 268px)", lg: minimized.lg ? "calc(100vw - 72px)" : "calc(100vw - 268px)" }}
		// 			hidden={hidden}
		// 			setHidden={setHidden}
		// 			right={0}
		// 			onOpen={onOpen}
		// 			transition={"width 0.5s ease"}
		// 			minimized={minimized}
		// 			setMinimized={setMinimized}
		// 			position={"fixed"}
		// 			mr={"8px"}
		// 		/>
		// 		<Flex
		// 			pt={"64px"}
		// 		>
		// 			<Outlet />
		// 		</Flex>
		// 	</Box>
		// </Box>

		<Grid
			templateAreas={`'sidebar main'`}
			templateColumns={
				// minimized ? { base: "0 1fr", md: "64px 1fr", lg: "64px 1fr" } : { base: "0 1fr", md: "260px 1fr", lg: "260px 1fr" }
				setTemplateColumns(minimized)
			}
			// templateRows={"64px 1fr"}
			h="100vh"
			w="100vw"
			overflow={"hidden"}
			// position={"fixed"}
			position={"relative"}
			overscrollBehaviorY={"none"}
			transition={"all 0.5s ease"}
		>
			<GridItem area="sidebar" as={"aside"} h="100vh" maxWidth={"260px"} transition={"all 0.5s ease"}>
				<ResponsiveSidebar Options={Options} minimized={minimized} setMinimized={setMinimized} hidden={hidden} setHidden={setHidden} open={isOpen} onOpening={onOpen} close={onClose} />
			</GridItem>
			<GridItem area="main" as={"main"} overflowY={"auto"} overscrollBehavior={"none"} transition={"all 0.5s ease"} sx={{ "clip-path": "inset(0 0 0 0)" }}>
				<Header
					w={{ base: "100vw", md: minimized.md ? "calc(100vw - 72px)" : "calc(100vw - 268px)", lg: minimized.lg ? "calc(100vw - 72px)" : "calc(100vw - 268px)" }}
					hidden={hidden}
					setHidden={setHidden}
					right={0}
					onOpen={onOpen}
					transition={"width 0.5s ease"}
					minimized={minimized}
					setMinimized={setMinimized}
					mr={{ base: "none", md: "8px", lg: "8px" }}
				/>
				<Box h={"100vh"} w={"100%"} pt="64px" overflowX={"hidden"}>
					<Outlet />
				</Box>
			</GridItem>
		</Grid >
	);
};

export default SidebarAndHeader;