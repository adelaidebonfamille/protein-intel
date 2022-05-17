import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./App.module.css";

function App() {
	const name = useRef();
	const nim = useRef();
	const password = useRef();
	const confirmPassword = useRef();
	const faculty = useRef();
	const major = useRef();
	const entryYear = useRef();
	const phone = useRef();

	const [selectedFile, setSelectedFile] = useState(null);
	const registerHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();

		formData.append("kpm", selectedFile);
		formData.append("name", name.current.value);
		formData.append("nim", nim.current.value);
		formData.append("password", password.current.value);
		formData.append("confirmPassword", confirmPassword.current.value);
		formData.append("faculty", faculty.current.value);
		formData.append("major", major.current.value);
		formData.append("entryYear", entryYear.current.value);
		formData.append("phone", phone.current.value);

		console.log(formData);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};

		try {
			const res = await axios.post(
				"http://localhost:5000/api/auth/register",
				formData,
				config
			);
			console.log(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const fileChangedHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	return (
		<>
			<form className={styles.form}>
				<label htmlFor="name">Nama</label>
				<input type="text" name="name" id="name" ref={name} />

				<label htmlFor="nim">NIM</label>
				<input type="text" name="nim" id="nim" ref={nim} />

				<label htmlFor="password">Password</label>
				<input
					type="password"
					name="password"
					id="password"
					ref={password}
				/>

				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					ref={confirmPassword}
				/>

				<label htmlFor="faculty">Fakultas</label>
				<input type="text" name="faculty" id="faculty" ref={faculty} />

				<label htmlFor="major">Prodi</label>
				<input type="text" name="major" id="major" ref={major} />

				<label htmlFor="entryYear">Angkatan</label>
				<input
					type="number"
					name="entryYear"
					id="entryYear"
					ref={entryYear}
				/>

				<label htmlFor="phone">Nomor Telpon</label>
				<input type="text" name="phone" id="phone" ref={phone} />

				<label htmlFor="kpm">Kpm</label>
				<input
					type="file"
					name="kpm"
					id="kpm"
					accept=".pdf"
					onChange={fileChangedHandler}
				/>

				<button>Submit</button>
			</form>
		</>
	);
}

export default App;
