import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.about}>
      <div className={styles["inner-section"]}>
        <h1>Welcome To Protein 2022</h1>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          velit ducimus, enim inventore earum, eligendi nostrum pariatur
          necessitatibus eius dicta a voluptates sit deleniti autem error eos
          totam nisi neque voluptates sit deleniti autem error eos totam nisi
          neque.
        </p>
        <div className={styles.skills}>
          <button>Register</button>
          <button>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
