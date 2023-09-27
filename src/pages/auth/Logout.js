import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

function Logout() {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log("Logout");
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return <div></div>;
}

export default Logout;
