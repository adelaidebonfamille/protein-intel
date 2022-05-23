import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [kpmName, setKpmName] = useState("Tidak Ada File Terpilih");

  const password = useRef();
  const confirmPassword = useRef();
  const faculty = useRef();
  const major = useRef();
  const entryYear = useRef();
  const phone = useRef();

  const registerHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("kpm", selectedFile);
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
        "http://localhost:5000/api/user/profile",
        formData,
        config
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fileChangedHandler = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
    setKpmName(event.target.files[0].name);
  };
  return (
    <div className={styles["form-container"]}>
      <form onSubmit={registerHandler}>
        <label htmlFor="name">Nama</label>
        <input
          type="text"
          name="name"
          value={"Azie Melza Pratama"}
          disabled
          id="name"
          className={styles.disabled}
        />

        <label htmlFor="nim">NIM</label>
        <input
          type="text"
          name="nim"
          value={"0000XXXXXXXXXX"}
          disabled
          id="nim"
          className={styles.disabled}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={"masuksorga21@gmail.com"}
          disabled
          name="email"
          className={styles.disabled}
        />

        <label htmlFor="faculty">Fakultas</label>
        <input type="text" name="faculty" id="faculty" ref={faculty} />

        <label htmlFor="major">Prodi</label>
        <input type="text" name="major" id="major" ref={major} />

        <label htmlFor="entryYear">Angkatan</label>
        <input type="number" name="entryYear" id="entryYear" ref={entryYear} />

        <label htmlFor="phone">Nomor Telpon</label>
        <input type="text" name="phone" id="phone" ref={phone} />

        <div className={styles.file}>
          <button
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("kpm").click();
            }}
          >
            Choose File
          </button>
          <p>{kpmName}</p>
          <input
            type="file"
            hidden
            id="kpm"
            name="kpm"
            onChange={fileChangedHandler}
          />
        </div>

        <button>Submit</button>
      </form>

      <div className={styles.border}></div>

      <form action="" className={styles.changepass}>
        <h3>Ganti Password</h3>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" ref={password} />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          ref={confirmPassword}
        />
      </form>
    </div>
  );
};

export default Profile;
