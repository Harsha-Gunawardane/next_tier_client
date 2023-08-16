import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import ResponsiveSidebar from "../components/Sidebar/ResponsiveSidebar";

import { useState, useEffect, useRef } from "react";
import { FaUsers, FaUserAlt, FaMoneyBillAlt } from "react-icons/fa";

import { Box, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import useSidebar from "../hooks/useSidebar";


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

	const { setSidebarOptionHandler } = useSidebar();
	const { pathname } = useLocation();
	const params = useParams();
	const minimizeButtonRef = useRef();


	useEffect(() => {
		const activeTab = findActiveTab(params);
		setSidebarOptionHandler(activeTab);

	}, [setSidebarOptionHandler]);

	const startWithMinimize = [
		"stu/content",
		"stu/content/watch/:id"
	]



	const tabsMap = new Map([
		//Student Routes
		['stu/dashboard', 'dashboard'],
		['stu/courses', 'courses'],
		['stu/content', 'content'],
		['stu/content/watch/:id', 'content'],
		['stu/courses/:courseId/forum', 'courses'],
		['stu/quizzes', 'quizzes'],
		['stu/tutes', 'tutes'],

		// More routes and active tabs...
	]);



	function getRouteWithParams(params) {
		const route = params["*"];
		var keys = Object.keys(params).filter((key) => key !== "*");
		var routeWithParams = route;

		keys.forEach((key) => {
			if (key !== "*") {
				routeWithParams = routeWithParams.replace(params[key], ":" + key);
			}
		});
		return (routeWithParams)

	}

	function findActiveTab(params) {
		return tabsMap.get(getRouteWithParams(params)) || 'dashboard';
	}




	const setTemplateColumns = (minimized) => {
		var templateColumns = { base: "0 1fr", md: "260px 1fr", lg: "260px 1fr" };
		if (minimized.md) {
			templateColumns.md = "64px 1fr";
		}
		if (minimized.lg) {
			templateColumns.lg = "64px 1fr";
		}
		return templateColumns;
	}

	var Options = [];

	const StuOptions = [
		{ icon: GridViewRoundedIcon, name: "Dashboard", value: "dashboard", href: "/stu/dashboard" },
		{ icon: TiDocumentText, name: "Courses", value: "courses", href: "/stu/courses" },
		{ icon: FaCompass, name: "Content", value: "content", href: "/stu/content" },
		{ icon: FaListAlt, name: "Quizzes", value: "quizzes", href: "/stu/quizzes" },
		{ icon: FaQuestionCircle, name: "Tutes", value: "tutes", href: "/stu/tutes" },
	];

	const AdminOptions = [
		{ icon: GridViewRoundedIcon, name: "Dashboard", value: "dashboard", href: "/admin/dashboard" },
		{ icon: TiDocumentText, name: "Info", value: "info", href: "/admin/info" },
		{ icon: FaCompass, name: "Settings", value: "adsettings", href: "/admin/settings" },
	]

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
			name: "Staff",
			value: "staffs",
			href: "/tutor/staffs",
		},
		{
			icon: FaListAlt,
			FaQuestionCircle,
			name: "Quizzes",
			value: "Quizzes",
			href: "/tutor/quizzes",
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
		{ icon: TiDocumentText, name: "Class Request", value: "approveClass", href: "/staff/class" },
		{ icon: ReportProblemIcon, name: 'Complaints', value: 'complaints', href: '/staff/complaints' },
		{ icon: TiDocumentText, name: "Halls", value: "hallSchedule", href: "/staff/hall" },
		{ icon: FaUserAlt, name: 'Staff', value: 'staff-list', href: '/staff/staff-list' },
		{ icon: FaUsers, name: 'Tutors', value: 'stu-list', href: '/staff/tutors-list' },
		// { icon: FaMoneyBillAlt, name: 'Student Payments', value: 'payments', href: '/staff/stu-payment' },
		{ icon: AccountCircleIcon, name: 'Settings', value: 'profile', href: '/staff/my-profile' }
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
		case ('admin'):
			Options = AdminOptions
			break;
		default:
			Options = StuOptions;
	}


	return (

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
			<GridItem area="sidebar" as={"aside"} h="100vh" maxWidth={"260px"} width={"max-content"} transition={"all 0.5s ease"}>
				<ResponsiveSidebar
					Options={Options}
					minimized={minimized}
					setMinimized={setMinimized}
					hidden={hidden}
					setHidden={setHidden}
					open={isOpen}
					onOpening={onOpen}
					close={onClose}
					minimizeButtonRef={minimizeButtonRef}
				/>
			</GridItem>
			<GridItem area="main" as={"main"} overflowY={"auto"} overscrollBehavior={"none"} transition={"all 0.5s ease"} >
				<Header
					w={{ base: "100vw", md: minimized.md ? "100%" : "100%", lg: minimized.lg ? "100%" : "100%" }}
					hidden={hidden}
					setHidden={setHidden}
					onOpen={onOpen}
					transition={"width 0.5s ease"}
					minimized={minimized}
					setMinimized={setMinimized}
					position={"sticky"}
					top={0}
				/>
				{/* <Box h={"100vh"} w={"100%"} overflowX={"hidden"}> */}
				<Outlet context={[minimizeButtonRef, minimized]} />
				{/* </Box> */}
			</GridItem>
		</Grid >
	);
};

export default SidebarAndHeader;