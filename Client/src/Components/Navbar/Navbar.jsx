import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import AuthContext from "../../Contexts/AuthContext";

import logo from "../../Assets/Logo/logo.png";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const [showMenu, setShowMenu] = useState(false);

  const showMenuHandler = () => {
    setShowMenu((prev) => !prev);
  };

  const clickMenuHandler = () => {
    setShowMenu(false);
  };

  const onLogoutHandler = () => {
    authCtx.logout();
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logoContainer}>
          <Link className={styles.logo} to={"/"}>
            <img src={logo} alt="intel-logo" />
            <h1 className={styles["logo-text"]}>
              Protein <span className={styles["logo-text-int"]}>INT</span>
              <span className={styles["logo-text-el"]}>EL</span>
            </h1>
          </Link>
        </div>

        <div
          className={`${styles.hamburger} ${showMenu && styles.change}`}
          onClick={showMenuHandler}
        >
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
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
              {authCtx.userData.role === "user" ? (
                <li>
                  <Link to={"/profile"}>
                    <div className={styles["btn-secondary"]}>Profile</div>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to={"/admin"}>
                    <div className={styles["btn-secondary"]}>Admin</div>
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

      <ul
        className={`${styles.menu} ${!showMenu && styles.hideMenu}`}
        onClick={clickMenuHandler}
      >
        <Link to={"/"}>Home</Link>
        {authCtx.userData && authCtx.userData.role === "admin" ? (
          <>
            <Link to={"/admin/problems"}>Problems</Link>
            <Link to={"/admin/scores"}>Scores</Link>
          </>
        ) : (
          <>
            <Link to={"/exam"}>Exam</Link>
            <a href="https://intel.ilkom.unsri.ac.id/" target="_blank">
              About Us
            </a>
          </>
        )}
        {authCtx.userData ? (
          <>
            {authCtx.userData.role === "user" ? (
              <Link to={"/profile"}>Profile</Link>
            ) : (
              <Link to={"/admin"}>Admin</Link>
            )}
            <p onClick={onLogoutHandler}>Log out</p>
          </>
        ) : (
          <>
            <Link to={"/login"}>Sign In</Link>
            <Link to={"/Register"}>Register</Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
