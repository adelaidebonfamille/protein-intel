import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import axios from "axios";

const Admin = () => {
  const [isAdmin, setIsAdmin] = useState(false);

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
          setIsAdmin(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.body}>
      {localStorage.getItem("token") || isAdmin ? (
    <div className={ styles[ "category-container" ] }>
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
        <div className={styles.container}>
          <div className={styles.form}>
            <div className={`${styles.form} ${styles.login}`}>
              <span className={styles.title}>Admin Login</span>

              <form action="#" onSubmit={onSubmitHandler}>
                <div className={styles["input-field"]}>
                  <p>Username</p>
                  <input
                    type="text"
                    placeholder="Masukkan Username"
                    name="username"
                    required
                  />
                </div>
                <div className={styles["input-field"]}>
                  <p>Password</p>
                  <input
                    type="password"
                    placeholder="Masukkan Password"
                    name="password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`${styles["input-field"]} ${styles.button}`}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
</div>
  );
};

export default Admin;
