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
import Quizzes from "./pages/student/Quizzes";
import Quiz from "./pages/student/Quiz";
import ReviewQuiz from "./pages/student/ReviewQuiz";

// tutor components
// import TutorDashboard from "./pages/student/TutorDashboard";

// staff components
// import InstStaffDashboard from "./pages/InstituteStaff/Dashboard";
// import ViewTeacher from "./pages/InstituteStaff/ViewTeacher";
// import AddTeacher from "./pages/InstituteStaff/AddTeacher";
// import InstStaffProfile from './pages/InstituteStaff/Profile';
// import InstStaffComplaintsList from './pages/InstituteStaff/Complaints/ComplaintsListView';
// import ApproveClass from "./pages/InstituteStaff/ApproveClass";
// import HallList from "./pages/InstituteStaff/HallList";

// import layouts
import Layout from "./layouts/Layout";
import SidebarAndHeader from "./layouts/SidebarAndHeader";

// incorrect structure
import Courses from "./components/Courses";
import Content from "./components/Content";

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
              <Route path="quizzes" element={<Quizzes />} />
              <Route path="quizzes/review" element={<ReviewQuiz />} />
              <Route path="quizzes/1" element={<Quiz />} />

              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>

        {/* <Route
          path="staff"
          element={<SidebarAndHeader userRole={"InstituteStaff"} />}
        >
          <Route path="dashboard" element={<InstStaffDashboard />} />
          <Route path="teacher" element={<ViewTeacher/>} />
          <Route path="teacher/add" element={< AddTeacher />} />
          <Route path="class" element={<ApproveClass/>} />
          <Route path="profile" element={<InstStaffProfile />} />
          <Route path="complaints" element={<InstStaffComplaintsList />} />
          <Route path="hall" element={<HallList/>} />
        </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}> */}
        {/* <Route path="tutor" element={<SidebarAndHeader userRole={"teacher"} />}>
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
        </Route> */}

        {/* </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
