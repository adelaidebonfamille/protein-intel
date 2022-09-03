import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";
import AuthContext from "../../Contexts/AuthContext";

const Admin = () => {
  const [isError, setIsError] = useState(null);
  const [isMessage, setIsMessage] = useState(null);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    authCtx
      .adminLogin(e.target.username.value, e.target.password.value)
      .then((res) => {
        if (res.error) {
          setIsError(res.error);
          setIsMessage(null);
        } else {
          setIsMessage(res.message);
          setIsError(null);
        }
      });
  };

  return (
    <div className={styles.body}>
      {authCtx.userData && authCtx.userData.role === "admin" ? (
        <div className={styles["category-container"]}>
          <Link to="problems">
            <div className={styles["category-button"]}>
              Change / Delete Uploaded Problems
            </div>
          </Link>
          <Link to="scores">
            <div className={styles["category-button"]}>See All User Score</div>
          </Link>
          <Link to="batch">
            <div className={styles["category-button"]}>Start Batch</div>
          </Link>
          <Link to="reset-password">
            <div className={styles["category-button"]}>Reset User Password</div>
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
