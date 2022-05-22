import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
	return (
		<div className={styles.body}>
			<div className={styles.container}>
				<div className={styles.form}>
					<div className={`${styles.form} ${styles.login}`}>
						<span className={styles.title}>Login</span>

						<form action="#">
							<div className={styles["input-field"]}>
								<input
									type="text"
									placeholder="Masukkan Email"
									name="email"
									required
								/>
							</div>
							<div className={styles["input-field"]}>
								<input
									type="password"
									placeholder="Masukkan Password"
									required
								/>
							</div>
							<div className={styles["checkbox-text"]}>
								<a href="#" className={styles.text}>
									Lupa password?
								</a>
							</div>

							<div
								className={`${styles["input-field"]} ${styles.button}`}
							>
								<input type="button" value="Login" />
							</div>
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
