import { Outlet, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import ResponsiveSidebar from "../components/Sidebar/ResponsiveSidebar";

import { useState, useEffect, useRef } from "react";
import { FaUsers, FaUserAlt, FaMoneyBillAlt } from "react-icons/fa";

import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import useSidebar from "../hooks/useSidebar";

//icons
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import { TiDocumentText } from "react-icons/ti";
import {
  FaCompass,
  FaUserFriends,
  FaListAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { MdOutlineQuiz, MdQuiz, MdVideoLibrary } from "react-icons/md";
import { PiNotebookFill } from "react-icons/pi";
import { IoSchool, IoCompass } from "react-icons/io5";
import { BiListUl, BiSolidDashboard } from "react-icons/bi";
import { IoIosPaper } from "react-icons/io";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

const SidebarAndHeader = ({ userRole }) => {
  //get width of sidebar component and set to state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hidden, setHidden] = useState(isOpen);
  const [minimized, setMinimized] = useState({
    base: false,
    md: true,
    lg: false,
  });

  const { setSidebarOptionHandler } = useSidebar();
  const { pathname } = useLocation();
  const params = useParams();
  const minimizeButtonRef = useRef();

  useEffect(() => {
    const activeTab = findActiveTab(params);
    setSidebarOptionHandler(activeTab);
  }, [setSidebarOptionHandler]);

  const startWithMinimize = ["stu/content", "stu/content/watch/:id"];

  const tabsMap = new Map([
    //Student Routes
    ["stu/dashboard", "dashboard"],
    ["stu/courses", "courses"],
    ["stu/content", "content"],
    ["stu/content/watch/:id", "content"],
    ["stu/courses/:courseId/forum", "courses"],
    ["stu/quizzes", "quizzes"],
    ["stu/tutes", "tutes"],

    // More routes and active tabs...

    //Teacher Routes
    ["tutor/dashboard", "dashboard"],
    ["tutor/courses/add", "courses"],
    ["tutor/courses", "courses"],
    ["tutor/courses/content/:courseid", "courses"],
    ["tutor/courses/details/:courseid", "courses"],
    ["courses/content/analyze/:studypackid", "courses"],
    ["courses/studypackcontent/:courseid", "courses"],
    ["courses/courses/studypackdetails/:courseid", "courses"],
    ["courses/courses/addstudypack", "courses"],
    ["tutor/staffs", "staffs"],
    ["tutor/quizzes", "quizzes"],

    ["staff/dashboard", "dashboard"],
    ["staff/class", "approveclass"],
    ["sttaff/complaints", "complaints"],
    ["staff/hall", "hallschedule"],
    ["staff/staff-list", "stafflist"],
    ["staff/tutors-list", "stulist"],
    ["staff/my-profile", "profile"],
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
    return routeWithParams;
  }

  function findActiveTab(params) {
    return tabsMap.get(getRouteWithParams(params)) || "dashboard";
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
  };

  var Options = [];

  const StuOptions = [
    {
      icon: BiSolidDashboard,
      name: "Dashboard",
      value: "dashboard",
      href: "/stu/dashboard",
    },
    {
      icon: IoSchool,
      name: "MyCourses",
      value: "mycourses",
      href: "/stu/mycourses",
    },
    {
      icon: IoCompass,
      name: "Explore",
      value: "courses",
      href: "/stu/courses",
    },
    {
      icon: MdVideoLibrary,
      name: "Content",
      value: "content",
      href: "/stu/content",
    },
    {
      icon: MdOutlineQuiz,
      name: "Quizzes",
      value: "quizzes",
      href: "/stu/quizzes",
    },
    { icon: PiNotebookFill, name: "Tutes", value: "tutes", href: "/stu/tutes" },
  ];

  const AdminOptions = [
    {
      icon: GridViewRoundedIcon,
      name: "Dashboard",
      value: "dashboard",
      href: "/admin/dashboard",
    },
    { icon: TiDocumentText, name: "Info", value: "info", href: "/admin/info" },
    {
      icon: FaCompass,
      name: "Settings",
      value: "adsettings",
      href: "/admin/settings",
    },
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
      icon: MdVideoLibrary,
      name: "Contents",
      value: "contents",
      href: "/tutor/content",
    },
    {
      icon: FaUserFriends,
      name: "Staff",
      value: "staffs",
      href: "/tutor/staffs",
    },
    {
      icon: TiDocumentText,
      name: "Papers",
      value: "papers",
      href: "/tutor/papers",
    },
    {
      icon: FaListAlt,
      FaQuestionCircle,
      name: "Quizzes",
      value: "quizzes",
      href: "/tutor/quizzes",
    },
    {
      icon: FaQuestionCircle,
      name: "Complaints",
      value: "complaints",
      href: "/tutor/complaints",
    },
  ];
	// const TeacherOptions = [
	// 	{
	// 		icon: GridViewRoundedIcon,
	// 		name: "Dashboard",
	// 		value: "dashboard",
	// 		href: "/tutor/dashboard",
	// 	},
	// 	{
	// 		icon: TiDocumentText,
	// 		name: "Courses",
	// 		value: "courses",
	// 		href: "/tutor/courses",
	// 	},
	// 	{
	// 		icon: FaCompass,
	// 		name: "Contents",
	// 		value: "contents",
	// 		href: "/tutor/content",
	// 	},
	// 	{
	// 		icon: FaUserFriends,
	// 		name: "Staff",
	// 		value: "staffs",
	// 		href: "/tutor/staffs",
	// 	},
	// 	{
	// 		icon: FaListAlt,
	// 		FaQuestionCircle,
	// 		name: "Quizzes",
	// 		value: "quizzes",
	// 		href: "/tutor/quizzes",
	// 	},
	// 	{
	// 		icon: FaQuestionCircle,
	// 		name: "Complaints",
	// 		value: "complaints",
	// 		href: "/tutor/complaints",
	// 	},
	
	// ];

  const InstStaffOptions = [
    {
      icon: GridViewRoundedIcon,
      name: "Dashboard",
      value: "dashboard",
      href: "/staff/dashboard",
    },
    {
      icon: TiDocumentText,
      name: "Class Request",
      value: "approveclass",
      href: "/staff/class",
    },
    {
      icon: ReportProblemIcon,
      name: "Complaints",
      value: "complaints",
      href: "/staff/complaints",
    },
    {
      icon: TiDocumentText,
      name: "Halls",
      value: "hallschedule",
      href: "/staff/hall",
    },
    {
      icon: FaUserAlt,
      name: "Staff",
      value: "stafflist",
      href: "/staff/staff-list",
    },
    {
      icon: FaUsers,
      name: "Tutors",
      value: "stulist",
      href: "/staff/tutors-list",
    },
    // { icon: FaMoneyBillAlt, name: 'Student Payments', value: 'payments', href: '/staff/stu-payment' },
    {
      icon: AccountCircleIcon,
      name: "Settings",
      value: "profile",
      href: "/staff/my-profile",
    },
  ];

  const TeacherSupportStaffOptions = [
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
      icon: MdVideoLibrary,
      name: "Contents",
      value: "contents",
      href: "/tutor/content",
    },
    {
      icon: TiDocumentText,
      name: "Papers",
      value: "papers",
      href: "/tutor/papers",
    },
    {
      icon: FaListAlt,
      FaQuestionCircle,
      name: "Quizzes",
      value: "quizzes",
      href: "/tutor/quizzes",
    },
    {
      icon: FaQuestionCircle,
      name: "Complaints",
      value: "complaints",
      href: "/tutor/complaints",
    },
  ];

  const TeacherPaperStaffOptions = [
    {
      icon: GridViewRoundedIcon,
      name: "Dashboard",
      value: "dashboard",
      href: "/tutor/dashboard",
    },
    {
      icon: TiDocumentText,
      name: "Papers",
      value: "papers",
      href: "/tutor/papers",
    }
  ];

  switch (userRole) {
    case "student":
      Options = StuOptions;
      break;
    case "tutor":
      Options = TeacherOptions;
      break;
    case "InstituteStaff":
      Options = InstStaffOptions;
      break;
    case "admin":
      Options = AdminOptions;
      break;
    case "tutorSupportStaff":
      Options = TeacherSupportStaffOptions;
      break;
    case "tutorPaperStaff":
      Options = TeacherPaperStaffOptions;
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
      <GridItem
        area="sidebar"
        as={"aside"}
        h="100vh"
        maxWidth={"260px"}
        width={"max-content"}
        transition={"all 0.5s ease"}
      >
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
      <GridItem
        area="main"
        as={"main"}
        overflowY={"auto"}
        overscrollBehavior={"none"}
        transition={"all 0.5s ease"}
      >
        <Header
          w={{
            base: "100vw",
            md: minimized.md ? "100%" : "100%",
            lg: minimized.lg ? "100%" : "100%",
          }}
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
        <Outlet context={{ minimizeButtonRef, minimized }} />
        {/* </Box> */}
      </GridItem>
    </Grid>
  );
};

export default SidebarAndHeader;
