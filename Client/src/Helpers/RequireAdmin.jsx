import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

const RequireAuth = (props) => {
  const authCtx = useContext(AuthContext);
  let user;
  if (authCtx.userData) {
    user = authCtx.userData;
  }

  const isAuthenticated =
    user && user.role === "admin" && user.exp * 1000 > Date.now();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
