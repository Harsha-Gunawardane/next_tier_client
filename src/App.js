// auth components
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Missing from "./pages/auth/Missing";
import Unauthorized from "./pages/auth/Unauthorized";
import UserVerify from "./pages/auth/UserVerify";
import Landing from "./pages/LandingPage/Landing";
import ForgottenPassword from "./pages/auth/ForgottenPassword";
import InstStaffDashboard from './pages/InstituteStaff/Dashboard';
import ViewTeacher from "./pages/InstituteStaff/ViewTeacher";
import AddTeacher from "./pages/InstituteStaff/AddTeacher";
import InstStaffProfile from './pages/InstituteStaff/Profile';
import InstStaffComplaintsList from './pages/InstituteStaff/Complaints/ComplaintsListView';
import ApproveClass from "./pages/InstituteStaff/ApproveClass";


// import auth features
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";

// student components
import Settings from "./pages/student/Settings";
import Dashboard from "./pages/student/Dashboard";


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

// import TutorDashboard from "./pages/student/TutorDashboard";

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
              <Route path="settings" element={<Settings />} />


         
            
          


            </Route>
          </Route>
        </Route>

        <Route path='staff' element={<SidebarAndHeader userRole={"InstituteStaff"} />}>
          <Route path="dashboard" element={<InstStaffDashboard />} />
          <Route path="teacher" element={<ViewTeacher/>} />
          <Route path="teacher/add" element={< AddTeacher />} />
          <Route path="class" element={<ApproveClass/>} />
          <Route path="profile" element={<InstStaffProfile />} />
          <Route path="complaints" element={<InstStaffComplaintsList />} />
          
        </Route>


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

 

        {/* </Route> */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
