import React, { useState } from "react";

import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  return (
    <div className={styles.container}>
      <form className={styles.card}>
        <h2>Enter account email to reset</h2>

        <div className={styles.input}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
