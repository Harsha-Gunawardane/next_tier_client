import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from './pages/Login';
import Register from "./pages/Register";
import StudentDashboard from "./features/students/StudentDashboard";
import StudentProfile from "./features/students/StudentProfile";
import TutorDashboard from "./features/tutors/TutorDashboard";
import Missing from "./pages/Missing";
import Unauthorized from "./pages/Unauthorized";
import EmployeeList from "./features/employees/EmployeeList";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Landing />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            path="stu"
            element={<RequireAuth allowedRoles={[ROLES.Student]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>
          </Route>
          {/* End student */}
          
          <Route
            path="tutor"
            element={<RequireAuth allowedRoles={[ROLES.Tutor]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="dashboard">
                <Route index element={<TutorDashboard />} />
              </Route>
              {/* End tutor  */}
            </Route>
          </Route>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route path="employees">
              <Route index element={<EmployeeList />} />
            </Route>
          </Route>
        </Route>
        {/* End Protected Routes */}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
