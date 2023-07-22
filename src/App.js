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

import { Routes, Route } from "react-router-dom";
import { ROLES } from "./config/roles";
import { ChakraProvider } from "@chakra-ui/react";

//Tutor Components
import TutorDashboard from "./pages/Tutor/TutorDashboard";
import StaffList from "./pages/TutorStaff/staffList";
import StaffAdd from "./pages/TutorStaff/staffAdd";
import McqCategoryPool from "./pages/Mcq/mcqCategoryPool";
import Mcqs from "./pages/Mcq/mcqs";
import CreateMcq from "./pages/Mcq/mcqCreate";
import EditMcq from "./pages/Mcq/mcqEdit";
import StudentList from "./pages/TutorStaff/paperMarking";
import PaperMarking from "./pages/TutorStaff/paperMarking";

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

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
            {/* <Route path="/" element={<Home />} /> */}

            <Route
              path="stu"
              element={<SidebarAndHeader userRole={"student"} />}
            >
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

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}> */}
          <Route
            path="tutor"
            element={<SidebarAndHeader userRole={"teacher"} />}
          >
            <Route path="dashboard" element={<TutorDashboard />} />
            <Route path="courses" element={<Courses />} />
            <Route path="content" element={<Content />} />

            <Route path="staff">
              <Route index element={<StaffList />} />
              <Route path="add" element={<StaffAdd />} />
              <Route path="edit" element={<StaffAdd />} />
            </Route>

            <Route path="paper">
              <Route path="marking" element={<PaperMarking />} />
            </Route>

            <Route path="mcqpool">
              <Route index element={<McqCategoryPool />} />
              <Route path=":id" element={<Mcqs />}>
                {/* <Route path="add" element={<CreateMcq />} /> */}
              </Route>
              <Route path=":id/add" element={<CreateMcq />} />
              <Route path=":id/:id/edit" element={<EditMcq />} />
            </Route>
          </Route>
          {/* </Route> */}

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
