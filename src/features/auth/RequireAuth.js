import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default RequireAuth


// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import useAuth from "../../hooks/useAuth";
// import jwt_decode from "jwt-decode";

// const RequireAuth = ({ allowedRoles }) => {
//   const { auth } = useAuth();
//   const location = useLocation();

//   // decode access token to get roles
//   const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;

//   const roles = decoded?.UserInfo?.roles || [];

//   return roles.find((role) => allowedRoles?.includes(role)) ? (
//     <Outlet />
//   ) : auth?.accessToken ? ( //changed from user to accessToken to persist login after refresh
//     <Navigate to="/unauthorized" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default RequireAuth;
