import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "../../features/auth/authSlice"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth()

    const accessToken = useSelector(selectCurrentToken)

    return roles.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
      ) : accessToken ? ( //changed from user to accessToken to persist login after refresh
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      );
      
}
export default RequireAuth