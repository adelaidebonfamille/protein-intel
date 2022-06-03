import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import AuthContext from "../../Contexts/AuthContext";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

  const onLogoutHandler = () => {
    authCtx.logout();
  };

  return (
    <nav className={styles.nav}>
      <div>
        <h4>
          <Link to={"/"}>Protein Intel</Link>
        </h4>
      </div>
      <ul className={styles.link1}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {authCtx.userData && authCtx.userData.role === "admin" ? (
          <>
            <li>
              <Link to={"/admin/problems"}>Problems</Link>
            </li>
            <li>
              <Link to={"/admin/scores"}>Scores</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/exam"}>Exam</Link>
            </li>
            <li>
              <a href="https://intel.ilkom.unsri.ac.id/" target="_blank">
                About Us
              </a>
            </li>
          </>
        )}
      </ul>
      <ul className={styles.link2}>
        {authCtx.userData ? (
          <>
            {authCtx.userData.role === "user" && (
              <li>
                <Link to={"/profile"}>
                  <div className={styles["btn-secondary"]}>Profile</div>
                </Link>
              </li>
            )}
            <li>
              <button
                className={styles["btn-primary"]}
                onClick={onLogoutHandler}
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={"/login"}>
                <button className={styles["btn-secondary"]}>Sign In</button>
              </Link>
            </li>
            <li>
              <Link to={"/Register"}>
                <button className={styles["btn-primary"]}>Register</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
