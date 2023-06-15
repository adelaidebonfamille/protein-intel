import React, { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./App.module.css";

import AuthContext from "./Contexts/AuthContext";
import RequireAuth from "./Helpers/RequireAuth";
import RequireAdmin from "./Helpers/RequireAdmin";

import PageNotFound from "./Pages/PageNotFound/PageNotFound";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Exam from "./Pages/Exam/Exam";
import OngoingExam from "./Pages/Exam/OngoingExam/OngoingExam";
import Register from "./Pages/Register/Register";
import Admin from "./Pages/Admin/Admin";
import Problems from "./Pages/Admin/Problems/Problems";
import Scores from "./Pages/Admin/Scores/Scores";
import Batch from "./Pages/Admin/Batch/Batch";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import AdminResetPassword from "./Pages/Admin/ResetPassword/ResetPassword";

function App() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.loadUser();
    console.log(authCtx.userData);
  }, []);

  return (
    <div className={styles.body}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/exam/ongoing" element={<OngoingExam />} />
        </Route>

        <Route path="/admin" element={<Admin />} />

        <Route element={<RequireAdmin />}>
          <Route
            path="/admin/reset-password"
            element={<AdminResetPassword />}
          />
          <Route path="/admin/problems" element={<Problems />} />
          <Route path="/admin/scores" element={<Scores />} />
          <Route path="/admin/batch" element={<Batch />} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
