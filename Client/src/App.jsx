import React, { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./App.module.css";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Exam from "./Pages/Exam/Exam";
import Register from "./Pages/Register/Register";
import Admin from "./Pages/Admin/Admin";
import Problems from "./Pages/Admin/Problems/Problems";
import Scores from "./Pages/Admin/Scores/Scores";
import Batch from "./Pages/Admin/Batch/Batch";

import AuthContext from "./Contexts/AuthContext";
import RequireAuth from "./Helpers/RequireAuth";

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

        <Route element={<RequireAuth role="user" />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/exam" element={<Exam />} />

        <Route path="/admin" element={<Admin />} />

        <Route element={<RequireAuth role="admin" />}>
          <Route path="/admin/problems" element={<Problems />} />
          <Route path="/admin/scores" element={<Scores />} />
          <Route path="/admin/batch" element={<Batch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
