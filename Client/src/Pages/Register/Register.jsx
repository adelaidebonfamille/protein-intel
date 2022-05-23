import React from "react";
import styles from "./Register.module.css";

const Register = () => {
	return (
		<div className={ styles.body }>
			<div className={ styles.container }>
				<div className={ styles.forms }>
					<div className={ `${ styles.form } ${  styles.login }` }>
						<span className={ styles.title }>Registrasi</span>

						<form action="#">
							<div className={ styles[ "input-field" ] }>
								<input 
									type="text" 
									placeholder="Masukkan Nama" 
									required
								/>
								<i className={ `${ styles.uil } ${ styles[ "uil-user" ] }` }></i> 
							</div>

							<div className= { styles[  "input-field" ] } >
								<input 
									type="text" 
									placeholder="Masukkan 
									NIM" 
									required
								/>
								<i className={ `${ styles.uil } ${ styles[ "uil-envelope-shield" ] } ${ styles.icon }` }></i> 
							</div>

							<div className= { styles[ "input-field" ] } >
								<input 
									type="password" 
									placeholder="Masukkan Password" 
									required
								/>
								<i className={ `${ styles.uil } ${ styles[ "uil-lock-alt" ] }` }></i>
							</div>

							<div className= { styles[ "input-field" ] } >
								<input 
									type="password" 
									placeholder="Konfirmasi Password" 
									required
								/>
								<i className={ `${ styles.uil } ${ styles[ "uil-lock" ] } ${ styles.icon }` }></i>
							</div>

							<div className={ styles[ "checkbox-text" ] }>
								<div className={ styles[ "checkbox-content" ] }>
									<input 
										type="checkbox" 
										id="logCheck" 
										required
									/>
									<label for="logCheck" className={ styles.text }>Accept privacy & policy</label>
								</div>
							</div>

							<div className={ ` ${ styles[ "input-field" ] } ${ styles.button } ` }>
								<input 
									type="button" 
									value="Registrasi"
								/>
							</div>
						</form>

						<div className={ styles[ "login-signup" ] }>
							<span className={ styles.text }>Sudah daftar?
								<a href="login.html" className={ ` ${ styles.text } ${ styles[ "signup-text" ] } ` }>Login sekarang</a>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
};

export default Register;
