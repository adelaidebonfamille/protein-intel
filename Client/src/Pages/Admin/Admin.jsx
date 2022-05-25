import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";
import AuthContext from "../../Contexts/AuthContext";

const Admin = () => {
  const [isError, setIsError] = useState(null);
  const [isMessage, setIsMessage] = useState(null);
  const authCtx = useContext(AuthContext);
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
          //redirect to login page after 5 second
          setTimeout(() => {
            navigate("/admin");
          }, 3000);
        }
      });
  };

  return (
    <div className={styles.body}>
      {authCtx.userData && authCtx.userData.role === "admin" ? (
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
