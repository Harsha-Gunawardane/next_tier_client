import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import ResponsiveSidebar from "../components/Sidebar/ResponsiveSidebar";

import { useState, useEffect, useRef } from "react";
import { FaUserAlt, FaMoneyBillAlt } from "react-icons/fa";

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
		console.log(activeTab);
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
		['stu/courses/:id/forum', 'courses'],

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
		console.log(routeWithParams);
		return (routeWithParams)

	}

	function findActiveTab(params) {
		return tabsMap.get(getRouteWithParams(params)) || 'dashboard';
	}




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
					<Outlet context={[minimizeButtonRef, minimized]} />
				</Box>
			</GridItem>
		</Grid >
	);
};

export default SidebarAndHeader;