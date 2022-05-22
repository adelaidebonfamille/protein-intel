import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
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
					<a href="https://intel.ilkom.unsri.ac.id/">
						Intel Official Website
					</a>
				</li>
			</ul>
			<ul className={styles.link2}>
				<li>
					<Link to={"/login"}>Sign In</Link>
				</li>
				<li>
					<Link to={"/Register"}>
						<button>Register</button>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
