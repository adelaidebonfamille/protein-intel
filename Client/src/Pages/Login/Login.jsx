import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import AuthContext from "../../Contexts/AuthContext";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [isError, setIsError] = useState(null);
  const [isMessage, setIsMessage] = useState(null);
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    authCtx.login(e.target.email.value, e.target.password.value).then((res) => {
      if (res.error) {
        setIsError(res.error);
        setIsMessage(null);
      } else {
        setIsMessage(res.message);
        setIsError(null);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    });
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={`${styles.form} ${styles.login}`}>
            <span className={styles.title}>Login</span>

            <form action="#" onSubmit={onSubmitHandler}>
              <div className={styles["input-field"]}>
                <p>Email</p>
                <input
                  type="text"
                  placeholder="Masukkan Email"
                  name="email"
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
              <div className={styles["checkbox-text"]}></div>
              <Link to={"/forgot-password"} href="#" className={styles.text}>
                Lupa password?
              </Link>

              {isError && <div className={styles.error}>{isError}</div>}
              {isMessage && <div className={styles.message}>{isMessage}</div>}

              <button
                type="submit"
                className={`${styles["input-field"]} ${styles.button}`}
              >
                Login
              </button>
            </form>
            <div className={styles["login-signup"]}>
              <span className={styles.text}>
                Belum daftar?{"  "}
                <Link
                  to={"/register"}
                  className={`${styles.text} ${styles["signup-text"]}`}
                >
                  Registrasi disini
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
