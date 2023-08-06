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
import QuizDashboard from "./pages/student/QuizDashboard";
import Quiz from "./pages/student/Quiz";
import ReviewQuiz from "./pages/student/ReviewQuiz";

// instituteStaff components
import InstStaffDashboard from "./pages/InstituteStaff/Dashboard";
import ViewTeacher from "./pages/InstituteStaff/ViewTeacher";
import AddTeacher from "./pages/InstituteStaff/AddTeacher";
import InstStaffProfile from "./pages/InstituteStaff/StaffProfile";
import InstStaffComplaintsList from "./pages/InstituteStaff/Complaints/ComplaintsListView";
import ApproveClass from "./pages/InstituteStaff/ApproveClass";
import HallList from "./pages/InstituteStaff/HallList";
import HallSchedule from "./pages/InstituteStaff/HallSchedule";
import InstStaffStuPayment from './pages/InstituteStaff/StuPayment';
import InstStaffList from './pages/InstituteStaff/StaffList'
import AddInstStaff from './pages/InstituteStaff/AddInstStaff';
import ViewPaymentHistory from './pages/InstituteStaff/viewPaymentHistory';
import MyProfile from './pages/InstituteStaff/myProfile';
import CashReceipt from './pages/InstituteStaff/cashReceiptStaff';
import OnlineReceipt from './pages/InstituteStaff/onlineReceiptStaff';
import StudentsList from "./pages/InstituteStaff/studentsList";
import StudentProfile from './pages/InstituteStaff/StudentProfile';
import TutorsList from './pages/InstituteStaff/tutorsList';
import TutorProfile from './pages/InstituteStaff/TutorProfile';
import CourseProfile from "./pages/InstituteStaff/CourseDetail";



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

//Tutor Components
// import TutorDashboard from "./pages/tutor/tutorDashboard";
// import StaffList from "./pages/tutorStaff/staffList";
import CreateQuizzes from "./pages/tutor/createQuizzes";
import Mcqs from "./pages/tutor/mcq/viewMcqs";
// import PaperMarking from "./pages/tutorStaff/paperMarking";
import CreateQuiz from "./pages/tutor/createQuiz";
import ViewQuiz from "./pages/tutor/viewQuiz";

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
              <Route path="quizzes" element={<QuizDashboard />} />
              <Route path="quizzes/:subject" element={<QuizDashboard />} />
              <Route
                path="quizzes/:subject/:mcqname/review"
                element={<ReviewQuiz />}
              />
              <Route path="quizzes/:subject/:mcqname" element={<Quiz />} />

              <Route path="settings" element={<Settings />} />
            </Route>
            {/* </Route> */}
          </Route>

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}> */}
          <Route
            path="tutor"
            element={<SidebarAndHeader userRole={"teacher"} />}
          >
            {/* <Route index element={<TutorDashboard />} />
            <Route path="supportstaffs">
              <Route index element={<StaffList />} />
            </Route>

            <Route path="papers">
              <Route path="marking" element={<PaperMarking />} />
            </Route> */}

            <Route path="quizzes">
              <Route index element={<CreateQuizzes />} />
              <Route path="create/:quizId" element={<CreateQuiz />} />
              <Route path=":quizId" element={<ViewQuiz />} />

              <Route path="category/:id" element={<Mcqs />}></Route>
            </Route>
          </Route>
          {/* </Route> */}

        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Staff]} />}> */}
          <Route
            path="staff"
            element={<SidebarAndHeader userRole={"InstituteStaff"} />}
          >
            <Route path="dashboard" element={<InstStaffDashboard />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="teacher" element={<ViewTeacher />} />
            <Route path="teacher/add" element={< AddTeacher />} />
            <Route path="class" element={<ApproveClass />} />
            <Route path="profile/:id" element={<InstStaffProfile />} />
            <Route path="complaints" element={<InstStaffComplaintsList />} />
            <Route path="hall" element={<HallSchedule />} />
            <Route path="hall/view" element={<HallList />} />
            <Route path="stu-payment" element={<InstStaffStuPayment />} />
            <Route path="staff-list" element={<InstStaffList />} />
            <Route path="staff-list/add-inst-staff" element={<AddInstStaff />} />
            <Route path="payment-history" element={<ViewPaymentHistory/>} />
            <Route path="cash-receipt" element={<CashReceipt/>} />
            <Route path="online-receipt" element={<OnlineReceipt/>} />
            <Route path="stu-list" element={<StudentsList/>} />
            <Route path="stu-profile/:id" element={<StudentProfile />} />
            <Route path="add-staff" element={<AddInstStaff />} />
            <Route path="staff-list" element={<InstStaffList />} />
            <Route path="tutors-list" element={<TutorsList />} />
            <Route path="tutor-profile/:id" element={<TutorProfile />} />
            <Route path="tutor-profile/:id/course/:id" element={<CourseProfile />} />
          </Route>
        {/* </Route> */}

          {/* </Route> */}

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="user" element={<UserLayout />}>
              <Route path="profile" element={<UserProfile />} />
            </Route>
          </Route> */}
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
