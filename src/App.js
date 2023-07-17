// auth components
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Missing from "./pages/auth/Missing";
import Unauthorized from "./pages/auth/Unauthorized";
import UserVerify from "./pages/auth/UserVerify";
import Landing from "./pages/LandingPage/Landing";
import ForgottenPassword from "./pages/auth/ForgottenPassword";

// import auth features
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";

// student components
import Settings from "./pages/student/Settings";
import Dashboard from "./pages/student/Dashboard";

// import layouts
import Layout from "./layouts/Layout";
import SidebarAndHeader from "./layouts/SidebarAndHeader";

// incorrect structure
import Courses from "./components/Courses";
import Content from "./components/Content";

// testing components
// import UserLayout from "./features/users/UserLayout";
// import UserProfile from "./features/users/components/UserProfile";

import { Routes, Route } from "react-router-dom";
import { ROLES } from "./config/roles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route index element={<Landing />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify" element={<UserVerify />} />
        <Route path="forgot-password" element={<ForgottenPassword />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
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
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}> */}
        <Route path="tutor" element={<SidebarAndHeader userRole={"teacher"} />}>
          <Route path="dashboard" element={<TutorDashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="content" element={<Content />} />

          <Route path="staff">
            <Route index element={<StaffList />} />
            <Route path="add" element={<StaffAdd />} />
          </Route>

          <Route path="mcqpool">
            <Route index element={<McqCategoryPool />} />
            <Route path=":id" element={<Mcqs />}>
              <Route path="add" element={<CreateMcq />} />
            </Route>
          </Route>
        </Route>

        {/* </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
