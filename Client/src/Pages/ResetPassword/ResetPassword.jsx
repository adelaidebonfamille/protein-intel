import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import { useLocation } from "react-router-dom";

import axios from "axios";

const ResetPassword = () => {
  const location = useLocation();
  const [isMessage, setIsMessage] = useState(null);
  //detect query params
  const query = new URLSearchParams(location.search);
  const token = query.get("token");
  const id = query.get("id");

  const API_URL =
    (import.meta.env.VITE_API_URL &&
      `${
        import.meta.env.VITE_API_URL
      }/auth/reset-password?token=${token}&id=${id}`) ||
    `https://82.112.237.86:5000/api/auth/reset-password?token=${token}`;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    //send request to server

    const response = await axios.post(API_URL, {
      password: e.target.password.value,
      confirmPassword: e.target.confirmPassword.value,
    });
    if (response.data.error) {
      setIsMessage(response.data.error);
    } else {
      setIsMessage(response.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmitHandler} className={styles.card}>
        <div className={styles.input}>
          <label htmlFor="password">Type in new Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className={styles.input}>
          <label htmlFor="confirmPassword">Type in new Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <button className={styles.button} type="submit">
          Submit
        </button>
        <div className={styles.message}>{isMessage && <p>{isMessage}</p>}</div>
      </form>
    </div>
  );
};

export default ResetPassword;
