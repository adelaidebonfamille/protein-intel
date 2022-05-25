import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import axios from "axios";

const Admin = () => {
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:5000/api/auth/admin", {
          username: e.target.username.value,
          password: e.target.password.value,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <div className={styles.container}>
          <Link to="problems">
            <div className={styles["category-button"]}>
              Change / Delete Uploaded Problems
            </div>
          </Link>
          <Link to="scores">
            <div className={styles["category-button"]}>See All User Score</div>
          </Link>
        </div>
      ) : (
        <div className={styles["login-container"]}>
          <h1>Admin Login</h1>
          <form action="#" onSubmit={onSubmitHandler}>
            <div className={styles["input-field"]}>
              <p>Username</p>
              <input
                type="text"
                placeholder="masukkan username"
                name="username"
                required
              />
            </div>
            <div className={styles["input-field"]}>
              <p>password</p>
              <input
                type="password"
                placeholder="masukkan password"
                name="password"
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;
