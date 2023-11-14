import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Requireauth = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem("UserDetails");
// console.log(user)

  if (!user || user==='undefined') {
    return <Navigate to="/" state={{ path: location.pathname }} replace />;
  }

  return children;
};

export default Requireauth;
