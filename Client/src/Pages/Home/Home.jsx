import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className={styles.about}>
      <div className={styles["inner-section"]}>
        <h1>Welcome To Protein 2023</h1>
        <p className={styles.text}>
          Proteins is TOEFL/SULIET test simulation for Sriwijaya Univesity
          Students, where students can practice solving TOEFL like problems.
          This activity is to introduce Unsri students, especially at the
          Faculty of Computer Science with SULIET test problems and also help
          students to improve their ability to answer questions.
        </p>
        <div className={styles.skills}>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
