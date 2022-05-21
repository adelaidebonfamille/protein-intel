import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
	return (
		<nav className={styles.nav}>
			<div>
				<h4>Protein Intel</h4>
			</div>
			<ul className={styles.link1}>
				<li>
					<a href="">Home</a>
				</li>
				<li>
					<a href="">Product</a>
				</li>
				<li>
					<a href="">Features</a>
				</li>
				<li>
					<a href="">Pricing</a>
				</li>
			</ul>
			<ul className={styles.link2}>
				<li>
					<a href="">Sign In</a>
				</li>
				<li>
					<a href="">
						<button>Register</button>
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
