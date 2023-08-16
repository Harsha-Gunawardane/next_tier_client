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
import NewTute from "./pages/student/NewTute";
import TuteLayout from "./pages/student/components/tutes/TuteLayout";
import TuteDashboard from "./pages/student/components/tutes/TuteDashboard";
import TuteView from "./pages/student/components/tutes/TuteView";
import PdfView from "./pages/student/components/tutes/PdfView";
import Forum from "./pages/student/course/Forum.js";
import CourseLayout from "./pages/student/course/CourseLayout";
import CourseTemp from "./pages/student/course/CourseTemp";
// import Videocontent from "./pages/student/course/Videocontent";
import ContentWatch from "./pages/student/ContentWatch";
import ContentPage from "./pages/student/content/ContentPage";
import CourseInfo from "./pages/common/courseContent";

import StudentCourses from "./pages/student/Courses";

// instituteStaff components
import InstStaffDashboard from "./pages/InstituteStaff/Dashboard";
import AddTeacher from "./pages/InstituteStaff/AddTeacher";
import InstStaffProfile from "./pages/InstituteStaff/StaffProfile";
import InstStaffComplaintsList from "./pages/InstituteStaff/Complaints/ComplaintsListView";
import ApproveClass from "./pages/InstituteStaff/ApproveClass";
import HallList from "./pages/InstituteStaff/HallList";
import HallSchedule from "./pages/InstituteStaff/HallSchedule";
import InstStaffStuPayment from "./pages/InstituteStaff/StuPayment";
import InstStaffList from "./pages/InstituteStaff/StaffList";
import ViewPaymentHistory from "./pages/InstituteStaff/viewPaymentHistory";
import MyProfile from "./pages/InstituteStaff/Profile";
import CashReceipt from "./pages/InstituteStaff/cashReceiptStaff";
import OnlineReceipt from "./pages/InstituteStaff/onlineReceiptStaff";
import StudentsList from "./pages/InstituteStaff/StudentsList";
import StudentProfile from "./pages/InstituteStaff/StudentProfile";
import TutorsList from "./pages/InstituteStaff/tutorsList";
import TutorProfile from "./pages/InstituteStaff/TutorProfile";
import CourseProfile from "./pages/InstituteStaff/CourseDetail";

// admin components
import AdminDashboard from "./pages/admin/Dashboard";
import AdminsInfo from "./pages/admin/AdminsInfo";
import AdminSetting from "./pages/admin/Settings";

// tutor components
import TDashboard from "./pages/tutor/dashboard";
import TCourses from "./pages/tutor/course";
import Tcontents from "./pages/tutor/contents";
import Addcourse from "./pages/tutor/addcourse";
import Addstudypack from "./pages/tutor/addcoursepack";
import Studypackedit from "./pages/tutor/coursepackageedit";
import Studypackcontent from "./pages/tutor/coursepackcontent";
import Coursecontent from "./pages/tutor/courseContent";
import Courseedit from "./pages/tutor/courseedit";
import PaperclassContent from "./pages/tutor/paperclasscontent";

import TutorStaffs from "./pages/tutor/TutorStaffs";
import McqsByCategory from "./pages/tutor/McqsByCategory";
import PaperMarking from "./pages/tutor/PaperMarking";
import TutorQuiz from "./pages/tutor/TutorQuiz";
import TutorQuizzes from "./pages/tutor/TutorQuizzes";

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
import Test from "./pages/common/Test";

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
              <Route path="courses" element={<StudentCourses />} />
              {/* <Route path="courses/:id/content" element={<Coursecontent />} /> */}
              <Route path="content" element={<ContentPage />} />

              <Route path="quizzes" element={<QuizDashboard />} />
              <Route path="quizzes/:subject" element={<QuizDashboard />} />
              <Route
                path="quizzes/:subject/:mcqname/review"
                element={<ReviewQuiz />}
              />

              <Route path="courses/:courseId" element={<CourseLayout />} >
                <Route index element={<Test />} />
                <Route path="forum" element={<Forum />} />
              </Route>
              <Route path="content" element={<ContentPage />} />
              <Route path="content/watch/:id" element={<ContentWatch />} />
              <Route path="quizzes/:subject/:mcqname" element={<Quiz />} />

              <Route path="tutes" element={<TuteLayout />}>
                <Route index element={<TuteDashboard />} />
                <Route path="new/:id" element={<NewTute />} />
                <Route path="edit/:id" element={<NewTute />} />
                <Route path="view/:id" element={<PdfView />} />
                <Route path=":id" element={<TuteView />} />
              </Route>

              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}>
            <Route path='tutor' element={<SidebarAndHeader userRole={"tutor"} />}>
              <Route path="dashboard" element={<TDashboard />} />
              <Route path="content" element={<Tcontents />} />
              <Route path="courses/add" element={<Addcourse />} />
              <Route path="courses" element={<TCourses />} ></Route>
              <Route path='courses/content/:courseid' element={<Coursecontent />} ></Route>
              <Route path='courses/paperclasscontent' element={<PaperclassContent />} ></Route>
              <Route path='courses/details/:courseid' element={<Courseedit />} ></Route>
              <Route path='courses/studypackcontent/:courseid' element={<Studypackcontent />} ></Route>
              <Route path='courses/studypackdetails/:courseid' element={<Studypackedit />} ></Route>
              <Route path="courses/addstudypack" element={<Addstudypack/>} />
     
          
           </Route>
          
          </Route> */}

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route
              path="admin"
              element={<SidebarAndHeader userRole={"admin"} />}
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="info" element={<AdminsInfo />} />
              <Route path="settings" element={<AdminSetting />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}>
          <Route
            path="tutor"
            element={<SidebarAndHeader userRole={"teacher"} />}
          >
            <Route path="dashboard" element={<TDashboard />} />
              <Route path="content" element={<Tcontents />} />
              <Route path="courses/add" element={<Addcourse />} />
              <Route path="courses" element={<TCourses />} ></Route>
              <Route path='courses/content/:courseid' element={<Coursecontent />} ></Route>
              <Route path='courses/details/:courseid' element={<Courseedit />} ></Route>
            <Route path='courses/content/analyze/:studypackid' element={<PaperAnalyze />} ></Route>
            <Route path='courses/studypackcontent/:courseid' element={<Studypackcontent />} ></Route>
              <Route path='courses/studypackdetails/:courseid' element={<Studypackedit />} ></Route>
              <Route path="courses/addstudypack" element={<Addstudypack />} />

            <Route path="staffs">
              <Route index element={<TutorStaffs />} />
            </Route>

            <Route path="papers">
              <Route path="marking" element={<PaperMarking />} />
            </Route>

            <Route path="quizzes">
              <Route index element={<TutorQuizzes />} />
              <Route path=":quizId" element={<TutorQuiz />} />
              <Route path="category/:id" element={<McqsByCategory />}></Route>
            </Route>
          </Route>
          {/* </Route> */}

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Staff]} />}> */}
          {/* <Route
            path="staff"
            element={<SidebarAndHeader userRole={"InstituteStaff"} />}
          >
            <Route path="dashboard" element={<InstStaffDashboard />} />
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="teacher/add" element={<AddTeacher />} />
            <Route path="class" element={<ApproveClass />} />
            <Route path="profile/:id" element={<InstStaffProfile />} />
            <Route path="complaints" element={<InstStaffComplaintsList />} />
            <Route path="hall" element={<HallSchedule />} />
            <Route path="hall/view" element={<HallList />} />
            <Route path="stu-payment" element={<InstStaffStuPayment />} />
            <Route path="staff-list" element={<InstStaffList />} />
            <Route path="payment-history" element={<ViewPaymentHistory />} />
            <Route path="cash-receipt" element={<CashReceipt />} />
            <Route path="online-receipt" element={<OnlineReceipt />} />
            <Route path="stu-list" element={<StudentsList />} />
            <Route path="stu-profile/:id" element={<StudentProfile />} />
            <Route path="staff-list" element={<InstStaffList />} />
            <Route path="tutors-list" element={<TutorsList />} />
            <Route path="tutor-profile/:id" element={<TutorProfile />} />
            <Route
              path="tutor-profile/:id/course/:id"
              element={<CourseProfile />}
            />
          </Route> */}
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
