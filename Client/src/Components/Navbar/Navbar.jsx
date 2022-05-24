import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import AuthContext from "../../Contexts/AuthContext";

const Navbar = () => {
  const authCtx = useContext(AuthContext);

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
        <li>
          <Link to={"/exam"}>Start Exam</Link>
        </li>
        <li>
          <a href="https://intel.ilkom.unsri.ac.id/">About Us</a>
        </li>
      </ul>
      <ul className={styles.link2}>
        {authCtx.isAuth ? null : (
          <>
            <li>
              <Link to={"/login"}>
                <button>Sign In</button>
              </Link>
            </li>
            <li>
              <Link to={"/Register"}>
                <button>Register</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
