import React from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./App.module.css";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import Register from "./Pages/Register/Register";
import Admin from "./Pages/Admin/Admin";
import Problems from "./Pages/Admin/Problems/Problems";
import Scores from "./Pages/Admin/Scores/Scores";

function App() {
  return (
    <div className={styles.body}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/problems" element={<Problems />} />
        <Route path="/admin/scores" element={<Scores />} />
      </Routes>
    </div>
  );
}

export default App;
