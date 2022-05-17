import React, { useState } from "react";
import axios from "axios";

function App() {
	const [selectedFile, setSelectedFile] = useState(null);
	const registerHandler = async (e) => {
		const formData = new FormData({
			name: e.target.name.value,
			nim: e.target.nim.value,
			password: e.target.password.value,
			confirmPassword: e.target.confirmPassword.value,
			faculty: e.target.faculty.value,
			major: e.target.major.value,
			entryYear: e.target.entryYear.value,
			phone: e.target.phone.value,
		});

		formData.append("kpm", selectedFile);

		const config = {
			headers: {
				"content-type": "multipart/form-data",
			},
		};

		try {
			const res = await axios.post(
				"http://localhost:5000/register",
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
		<div className="App" onSubmit={registerHandler}>
			<form
				action="http://localhost:5000/api/auth/register"
				method="post"
				encType="multipart/form-data"
			>
				<label htmlFor="name">Nama</label>
				<input type="text" name="name" id="name" />

				<label htmlFor="nim">NIM</label>
				<input type="text" name="nim" id="nim" />

				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />

				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
				/>

				<label htmlFor="faculty">Fakultas</label>
				<input type="text" name="faculty" id="faculty" />

				<label htmlFor="major">Prodi</label>
				<input type="text" name="major" id="major" />

				<label htmlFor="entryYear">Angkatan</label>
				<input type="number" name="entryYear" id="entryYear" />

				<label htmlFor="kpm">Kpm</label>
				<input
					type="file"
					name="kpm"
					id="kpm"
					accept=".pdf,.doc,.docx,application/msword"
				/>

				<label htmlFor="phone">Nomor Telpon</label>
				<input type="text" name="phone" id="phone" />

				<button>Submit</button>
			</form>
		</div>
	);
}

export default App;
