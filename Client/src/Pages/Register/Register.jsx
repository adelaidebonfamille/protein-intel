import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

import AuthContext from "../../Contexts/AuthContext";

const Register = () => {
  const [isError, setIsError] = useState(null);
  const [isMessage, setIsMessage] = useState(null);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const onSubmitHandler = (e) => {
    e.preventDefault();

    authCtx
      .register(
        e.target.email.value,
        e.target.name.value,
        e.target.university.value,
        e.target.nim.value,
        e.target.password.value,
        e.target.confirmPassword.value
      )
      .then((res) => {
        if (res.error) {
          setIsError(res.error);
          setIsMessage(null);
        } else {
          setIsMessage(res.message);
          setIsError(null);
          //redirect to login page after 5 second
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }
      });
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.forms}>
          <div className={`${styles.form} ${styles.login}`}>
            <span className={styles.title}>Registrasi</span>

            <form onSubmit={onSubmitHandler}>
              <div className={styles["input-field"]}>
                <p>Name</p>
                <input
                  type="text"
                  placeholder="Masukkan Nama"
                  required
                  name="name"
                />
              </div>

              <div className={styles["input-field"]}>
                <p>Email</p>
                <input
                  type="text"
                  placeholder="Masukkan Email"
                  required
                  name="email"
                />
              </div>

              <div className={styles["input-field"]}>
                <p>Universitas/Instansi (masukkan nama lengkap)</p>
                <input
                  type="text"
                  placeholder="Universitas Sriwijaya"
                  required
                  name="university"
                />
              </div>

              <div className={styles["input-field"]}>
                <p>NIM</p>
                <input
                  type="text"
                  placeholder="Masukkan 
									NIM"
                  required
                  name="nim"
                />
              </div>

              <div className={styles["input-field"]}>
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Masukkan Password"
                  required
                  name="password"
                />
              </div>

              <div className={styles["input-field"]}>
                <p>Konfirmasi Password</p>
                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  required
                  name="confirmPassword"
                />
              </div>

              {isError && (
                <div className={`${styles["input-field"]} ${styles.error}`}>
                  <span>{`${isError}`}</span>
                </div>
              )}
              {isMessage && (
                <div className={`${styles["input-field"]} ${styles.message}`}>
                  <span>{`${isMessage}`}</span>
                </div>
              )}

              <button
                type="submit"
                className={`${styles["input-field"]} ${styles.button}`}
              >
                Registrasi
              </button>
            </form>

            <div></div>

            <div className={styles["login-signup"]}>
              <span className={styles.text}>
                Sudah daftar?
                <Link
                  to={"/login"}
                  className={` ${styles.text} ${styles["signup-text"]} `}
                >
                  Login sekarang
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
