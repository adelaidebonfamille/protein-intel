import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import PleaseLogin from "../Pages/PleaseLogin/PleaseLogin";

const RequireAuth = (props) => {
  const authCtx = useContext(AuthContext);
  let user;
  if (authCtx.userData) {
    user = authCtx.userData;
  }

  const isAuthenticated =
    user && user.role === props.role && user.exp * 1000 > Date.now();

  return isAuthenticated ? <Outlet /> : <PleaseLogin />;
};

export default RequireAuth;
