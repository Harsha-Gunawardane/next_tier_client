// auth components
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Missing from "./pages/auth/Missing";
import Unauthorized from "./pages/auth/Unauthorized";
import UserVerify from "./pages/auth/UserVerify";
import Landing from "./pages/LandingPage/Landing";
import ForgottenPassword from "./pages/auth/ForgottenPassword";
// import HallList from "./pages/InstituteStaff/HallList";

// import auth features
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";

// student components
import Settings from "./pages/student/Settings";
import Dashboard from "./pages/student/Dashboard";
import Quizzes from "./pages/student/Quizzes";
import Quiz from "./pages/student/Quiz";
import ReviewQuiz from "./pages/student/ReviewQuiz";

// instituteStaff components
import InstStaffDashboard from "./pages/InstituteStaff/Dashboard";
import ViewTeacher from "./pages/InstituteStaff/ViewTeacher";
import AddTeacher from "./pages/InstituteStaff/AddTeacher";
import InstStaffProfile from './pages/InstituteStaff/Profile';
import InstStaffComplaintsList from './pages/InstituteStaff/Complaints/ComplaintsListView';
import ApproveClass from "./pages/InstituteStaff/ApproveClass";
import HallList from "./pages/InstituteStaff/HallList";
import HallSchedule from "./pages/InstituteStaff/HallSchedule";
import InstStaffStuPayment from './pages/InstituteStaff/StuPayment';
import InstStaffList from './pages/InstituteStaff/StaffList'
import AddInstStaff from './pages/InstituteStaff/AddInstStaff';
import Videocontent from "./pages/student/content";

// tutor components
// import TutorDashboard from "./pages/student/TutorDashboard";

// import layouts
import Layout from "./layouts/Layout";
import SidebarAndHeader from "./layouts/SidebarAndHeader";

// incorrect structure
import Courses from "./components/Courses";
import Content from "./components/Content";

import { Routes, Route } from "react-router-dom";
import { ROLES } from "./config/roles";
import ContentWatch from "./pages/student/contentWatch";

//Tutor Components
import TutorDashboard from "./pages/tutor/TutorDashboard";
import StaffList from "./pages/TutorStaff/staffList";
import StaffAdd from "./pages/TutorStaff/staffAdd";
import McqCategoryPool from "./pages/tutor/mcq/mcqCategoryPool";
import Mcqs from "./pages/tutor/mcq/mcqs";
import CreateMcq from "./pages/tutor/mcq/mcqCreate";
import EditMcq from "./pages/tutor/mcq/mcqEdit";
import PaperMarking from "./pages/TutorStaff/paperMarking";

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
              <Route path="content" element={<Videocontent />} />
              <Route path="content/watch/:id" element={<ContentWatch />} />
              <Route path="quizzes" element={<Quizzes />} />
              <Route path="quizzes/:subject" element={<Quizzes />} />
              <Route path="quizzes/:subject/:mcqname/review" element={<ReviewQuiz />} />
              <Route path="quizzes/:subject/:mcqname" element={<Quiz />} />

              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>

        <Route
          path="staff"
          element={<SidebarAndHeader userRole={"InstituteStaff"} />}
        >
          <Route path="dashboard" element={<InstStaffDashboard />} />
          <Route path="teacher" element={<ViewTeacher />} />
          <Route path="teacher/add" element={< AddTeacher />} />
          <Route path="class" element={<ApproveClass />} />
          <Route path="profile" element={<InstStaffProfile />} />
          <Route path="complaints" element={<InstStaffComplaintsList />} />
          <Route path="hall" element={<HallSchedule />} />
          <Route path="hall/view" element={<HallList />} />
          <Route path="stu-payment" element={<InstStaffStuPayment />} />
          <Route path="staff-list" element={<InstStaffList />} />
          <Route path="staff-list/add-inst-staff" element={<AddInstStaff />} />
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}> */}
        <Route path="tutor" element={<SidebarAndHeader userRole={"teacher"} />}>
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
              <Route path="add" element={<CreateMcq />} />
            </Route>
            <Route path=":id/add" element={<CreateMcq />} />
            <Route path=":id/:id/edit" element={<EditMcq />} />
          </Route>
        </Route>
        {/* </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="user" element={<UserLayout />}>
              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Route> */}
      </Route>

      {/* catch all */}
      <Route path="*" element={<Missing />} />
      {/* </Route> */}
    </Routes>
  );
}

export default App;
