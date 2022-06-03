import React, { useState } from "react";
import axios from "axios";

import styles from "./ForgotPassword.module.css";

const API_URL =
  (import.meta.env.VITE_API_URL &&
    `${import.meta.env.VITE_API_URL}/api/auth/forgot-password`) ||
  "http://localhost:5000/api/auth/forgot-password";

const ForgotPassword = () => {
  const [isMessage, setIsMessage] = useState(null);
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(API_URL, {
      email: e.target.email.value,
    });
    if (response.data.error) {
      setIsMessage(response.data.error);
    } else {
      setIsMessage(response.data.message);
    }
  };
  return (
    <div className={styles.container} onSubmit={onSubmitHandler}>
      <form className={styles.card}>
        <h2>Enter account email to reset</h2>

        <div className={styles.input}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>

        <button className={styles.button} type="submit">
          Submit
        </button>

        <div className={styles.message}>{isMessage && <p>{isMessage}</p>}</div>
      </form>
    </div>
  );
};

export default ForgotPassword;
