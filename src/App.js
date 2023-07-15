import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import Layout from "./components/Layout";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import Settings from "./pages/Settings";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import UserLayout from "./features/users/UserLayout";
import UserProfile from "./features/users/components/UserProfile";
import SidebarAndHeader from "./layouts/SidebarAndHeader";
import Dashboard from "./pages/student/Dashboard";
import Courses from "./components/Courses";
import Content from "./components/Content";
import Landing from "./pages/LandingPage/Landing";
import UserVerify from "./pages/UserVerify";
import ForgottenPassword from "./pages/ForgottenPassword";
import StaffList from "./pages/staff/staffList";
import StaffAdd from "./pages/staff/staffAdd";
import McqCategoryPool from "./pages/mcq/mcqCategoryPool";
import McqPool from "./pages/mcq/mcqPool";
import CreateMcq from "./pages/mcq/mcqCreate";

import { Routes, Route } from "react-router-dom";
import { ROLES } from "./config/roles";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* public routes */}
				{/* <ChakraProvider resetCSS> */}
				<Route index element={<Landing />} />
				{/* </ChakraProvider> */}
				<Route path="unauthorized" element={<Unauthorized />} />

				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />

				<Route path="verify" element={<UserVerify />} />

				{/* we want to protect these routes */}
				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
						{/* <Route path="/" element={<Home />} /> */}

						<Route path="stu" element={<SidebarAndHeader userRole={"student"} />}>
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="courses" element={<Courses />} />
							<Route path="content" element={<Content />} />
							<Route path="settings" element={<Settings />} />
						</Route>
					</Route>

					<Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
						<Route path="user" element={<UserLayout />}>
							<Route path="profile" element={<UserProfile />} />
						</Route>
					</Route>
				</Route>

				{/* catch all */}
				<Route path="*" element={<Missing />} />
			</Route>
		</Routes>
	);
}
export default App;
