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
import StaffList from "./pages/staff/staffList";
import StaffAdd from "./pages/staff/staffAdd";
import McqCategoryPool from "./pages/mcq/mcqCategoryPool";
import CreateMcq from "./pages/mcq/mcqCreate";

import { Routes, Route } from "react-router-dom";
import { ROLES } from "./config/roles";
import { Dashboard, Home } from "@mui/icons-material";
import Landing from "./pages/LandingPage/Landing";
import Content from "./components/Content";
import Courses from "./components/Courses";
import StaffLayout from "./layouts/StaffLayout";
import McqLayout from "./layouts/McqLayout";
import Mcqs from "./pages/mcq/mcqs";

import TutorDashboard from "./pages/tutor/TutorDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}> */}
          <Route path="/" element={<Home />} />
          <Route element={<SidebarAndHeader userRole={"student"} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="content" element={<Content />} />
          </Route>
          {/* </Route> */}

          <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
            <Route
              path="stu"
              element={<SidebarAndHeader userRole={"student"} />}
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}>
            {/* <Route path="/" element={<Home />} /> */}
            <Route
              path="tutor"
              element={<SidebarAndHeader userRole={"teacher"} />}
            >
              <Route path="dashboard" element={<TutorDashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="content" element={<Content />} />

              <Route path="staff" element={<StaffLayout />}>
                <Route index element={<StaffList />} />
                <Route path="add" element={<StaffAdd />} />
              </Route>
              <Route path="mcqpool" element={<McqLayout />}>
                <Route index element={<McqCategoryPool />} />
                <Route path=":id" element={<Mcqs />} />
                <Route path=":id/addnew" element={<CreateMcq />} />
              </Route>
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
