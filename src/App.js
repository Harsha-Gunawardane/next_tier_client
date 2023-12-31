// auth components
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Missing from "./pages/auth/Missing";
import Unauthorized from "./pages/auth/Unauthorized";
import UserVerify from "./pages/auth/UserVerify";
import Landing from "./pages/LandingPage/Landing";
import ForgottenPassword from "./pages/auth/ForgottenPassword";
import Logout from "./pages/auth/Logout";

// import auth features
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";

// // student components
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
import ContentWatch from "./pages/student/ContentWatch";
import ContentPage from "./pages/student/content/ContentPage";
import StarredTutes from "./pages/student/StarredTutes";
import ArchivedTutes from "./pages/student/ArchivedTutes";
import StudentCourses from "./pages/student/Courses";


// // instituteStaff components
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

// parent components
import ParentDashboard from "./pages/parent/Dashboard";
import ParentSettings from "./pages/parent/Settings";

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
import PaperAnalyze from "./pages/tutor/quizAnalyze";
import PaperclassContent from "./pages/tutor/paperclasscontent";
import Complaints from "./pages/tutor/complaints";
import Profile from "./pages/tutor/profile";
import Poll from "./pages/tutor/poll";
import MyContent from "./pages/tutor/content/MyContent";

import TutorStaffs from "./pages/tutor/TutorStaffs";
import McqsByCategory from "./pages/tutor/McqsByCategory";
import PaperMarking from "./pages/tutor/PaperMarking";
import TutorQuiz from "./pages/tutor/TutorQuiz";
import TutorQuizzes from "./pages/tutor/TutorQuizzes";
import StudentAttedance from "./pages/InstituteStaff/StudentAttendance";
import TutorPapers from "./pages/tutor/TutorPapers";
import StudentAttendanceMarking from "./pages/tutor/StudentAttendanceMarking";
import Tutors from "./pages/common/Tutors";
import CourseViewLayout from "./pages/student/course/CourseViewLayout";
import CourseViewLayoutEnrolled from "./pages/student/course/CourseViewLayoutEnrolled";
import MyCourses from "./pages/student/MyCourses";
import StudypackLayout from "./pages/student/course/StudyPackLayout";
import StudypackViewLayout from "./pages/student/course/StudypackViewLayout";

// import layouts
import Layout from "./layouts/Layout";
import SidebarAndHeader from "./layouts/SidebarAndHeader";

import { Routes, Route } from "react-router-dom";
import { ROLES } from "./config/roles";
import Test from "./pages/common/Test";
// import MyContent from "./pages/tutor/content/MyContent";
import SelectAttendance from "./pages/tutor/SelectAttendance";
import SelectPaperClass from "./pages/tutor/SelectPaperClass";
import TutorProfileForStudent from "./pages/common/TutorProfileForStudent";
import ViewContent from "./pages/tutor/content/ViewContent";

function App() {
  return (
    <Route>
      <Route path="/" element={<Layout />}>
        {/* public routes */}

        <Route index element={<Landing />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify" element={<UserVerify />} />
        <Route path="forgot-password" element={<ForgottenPassword />} />
        <Route path="logout" element={<Logout />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
            <Route
              path="stu"
              element={<SidebarAndHeader userRole={"student"} />}
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="content" element={<ContentPage />} />
              <Route path="quizzes" element={<QuizDashboard />} />
              <Route path="quizzes/:subject" element={<QuizDashboard />} />
              <Route
                path="quizzes/:subject/:mcqname/review"
                element={<ReviewQuiz />}
              />
              <Route path="courses/:courseId" element={<CourseLayout />}>
                <Route index element={<CourseViewLayout />} />
                <Route path="forum" element={<Forum />} />
              </Route>
              <Route
                path="studyPacks/:studypackId"
                element={<StudypackLayout />}
              >
                <Route index element={<StudypackViewLayout />} />
              </Route>
              <Route path="mycourses" element={<MyCourses />} />
              <Route path="mycourses/:courseId" element={<CourseLayout />}>
                <Route index element={<CourseViewLayoutEnrolled />} />
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
                <Route path="starred" element={<StarredTutes />} />
                <Route path="archived" element={<ArchivedTutes />} />
              </Route>
              <Route path="settings" element={<Settings />} />
              <Route path="tutors" element={<Tutors />} />
              <Route path="tutors/:tutorId" element={<TutorProfileForStudent />} />
            </Route>
          </Route>

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}>
            <Route path='tutor' element={<SidebarAndHeader userRole={"tutor"} />}>
              <Route path="dashboard" element={<TDashboard />} />
              <Route path="content" element={<MyContent />} />
              <Route path="content/:contentId" element={<ViewContent />} />
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

          <Route element={<RequireAuth allowedRoles={[ROLES.Parent]} />}>
            <Route
              path="parent"
              element={<SidebarAndHeader userRole={"parent"} />}
            >
              <Route path="dashboard" element={<ParentDashboard />} />
              <Route path="info" element={<AdminsInfo />} />
              <Route path="settings" element={<ParentSettings />} />
            </Route>
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}>
            <Route
              path="tutor"
              element={<SidebarAndHeader userRole={"tutor"} />}
            >
              <Route path="dashboard" element={<TDashboard />} />
              <Route path="content" element={<MyContent />} />
              <Route path="content/:contentId" element={<ViewContent />} />
              <Route path="courses/add" element={<Addcourse />} />
              <Route path="courses" element={<TCourses />}></Route>
              <Route path="complaints" element={<Complaints />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="poll" element={<Poll />}></Route>
              <Route
                path="courses/content/:courseid"
                element={<Coursecontent />}
              ></Route>
              <Route
                path="courses/details/:courseid"
                element={<Courseedit />}
              ></Route>
              <Route
                path="courses/content/analyze/:studypackid"
                element={<PaperAnalyze />}
              ></Route>
              <Route
                path="courses/studypackcontent/:courseid"
                element={<Studypackcontent />}
              ></Route>
              <Route
                path="courses/studypackdetails/:courseid"
                element={<Studypackedit />}
              ></Route>
              <Route path="courses/addstudypack" element={<Addstudypack />} />

              <Route path="papers/:paperid" element={<PaperMarking></PaperMarking>}>



              </Route>

              <Route path="staffs">
                <Route index element={<TutorStaffs />} />
              </Route>

              <Route path="papers">
                <Route index element={<SelectPaperClass />} />
                <Route path="course/:courseId" element={<TutorPapers />} />
                <Route path="paper/:paperId" element={<PaperMarking />} />
              </Route>

              <Route path="quizzes">
                <Route index element={<TutorQuizzes />} />
                <Route path=":quizId" element={<TutorQuiz />} />
                <Route
                  path="category/:categoryId"
                  element={<McqsByCategory />}
                ></Route>
              </Route>

              <Route path="attendance">
                <Route index element={<SelectAttendance />} />
                <Route
                  path="marking/:courseId"
                  element={<StudentAttendanceMarking />}
                />
              </Route>
            </Route>
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.TutorSupportStaff]} />}
          >
            <Route
              path="supportstaff"
              element={<SidebarAndHeader userRole={"tutorSupportStaff"} />}
            >
              <Route path="dashboard" element={<TDashboard />} />
              <Route path="courses/add" element={<Addcourse />} />
              <Route path="courses" element={<TCourses />}></Route>
              <Route path="complaints" element={<Complaints />}></Route>
              <Route path="profile" element={<Profile />}></Route>
              <Route path="poll" element={<Poll />}></Route>
              <Route
                path="courses/content/:courseid"
                element={<Coursecontent />}
              ></Route>
              <Route
                path="courses/details/:courseid"
                element={<Courseedit />}
              ></Route>
              <Route
                path="courses/content/analyze/:studypackid"
                element={<PaperAnalyze />}
              ></Route>
              <Route
                path="courses/studypackcontent/:courseid"
                element={<Studypackcontent />}
              ></Route>
              <Route
                path="courses/studypackdetails/:courseid"
                element={<Studypackedit />}
              ></Route>
              <Route path="courses/addstudypack" element={<Addstudypack />} />

              <Route path="papers">
                <Route index element={<TutorPapers />} />
                <Route path=":paperId" element={<PaperMarking />} />
              </Route>

              <Route path="quizzes">
                <Route index element={<TutorQuizzes />} />
                <Route path=":quizId" element={<TutorQuiz />} />
                <Route
                  path="category/:categoryId"
                  element={<McqsByCategory />}
                ></Route>
              </Route>

              <Route path="attendance" element={<StudentAttedance />} />
              <Route
                path="attendance/marking"
                element={<StudentAttendanceMarking />}
              />
            </Route>
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.TutorPaperStaff]} />}
          >
            <Route
              path="paperstaff"
              element={<SidebarAndHeader userRole={"tutorPaperStaff"} />}
            >
              <Route path="dashboard" element={<TDashboard />} />
              <Route path="papers">
                <Route index element={<TutorPapers />} />
                <Route path=":paperId" element={<PaperMarking />} />
              </Route>
            </Route>
          </Route>

          {/* </Route> */}

          <Route element={<RequireAuth allowedRoles={[ROLES.Staff]} />}>
            <Route
              path="staff"
              element={<SidebarAndHeader userRole={"InstituteStaff"} />}
            >
              <Route path="dashboard" element={<InstStaffDashboard />} />
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="tutors-list/add" element={<AddTeacher />} />
              <Route path="class" element={<ApproveClass />} />
              <Route path="profile/:id" element={<InstStaffProfile />} />
              <Route path="complaints" element={<InstStaffComplaintsList />} />
              <Route path="hall" element={<HallSchedule />} />
              <Route path="hall/view" element={<HallList />} />
              <Route
                path="stu-payment/:username"
                element={<InstStaffStuPayment />}
              />
              <Route path="staff-list" element={<InstStaffList />} />
              <Route path="payment-history/:id" element={<ViewPaymentHistory />} />
              <Route
                path="physical-payment-receipt/:id"
                element={<CashReceipt />}
              />
              <Route
                path="online-payment-receipt/:id"
                element={<OnlineReceipt />}
              />
              <Route path="stu-list" element={<StudentsList />} />
              <Route path="stu-profile/:id" element={<StudentProfile />} />
              <Route path="staff-list" element={<InstStaffList />} />
              <Route path="tutors-list" element={<TutorsList />} />
              <Route path="tutor-profile/:id" element={<TutorProfile />} />
              <Route
                path="course/:id"
                element={<CourseProfile />}
              />
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Route>
  );
}

//hellooooo
export default App;