import React, { useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./App.module.css";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";

import AuthContext from "./Contexts/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    authCtx.loadUser();
  }, []);

  return (
    <div className={styles.body}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
