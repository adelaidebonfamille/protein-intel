import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

const RequireAuth = (props) => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.userData);

  const isAuthenticated =
    authCtx.userData &&
    authCtx.userData.role === props.role &&
    authCtx.userData.exp * 1000 > Date.now();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
