import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

const Profile = () => {
  const baseUrl =
    "http://localhost:5000/api/user" || `${process.env.API_URL}/user`;

  const [selectedFile, setSelectedFile] = useState(null);
  const [kpmName, setKpmName] = useState("Tidak Ada File Terpilih");
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");

  const password = useRef();
  const confirmPassword = useRef();
  const oldPassword = useRef();
  const faculty = useRef();
  const major = useRef();
  const entryYear = useRef();
  const phone = useRef();

  useEffect(() => {
    axios
      .get(`${baseUrl}/profile`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setName(res.data.user.name);
        setNim(res.data.user.nim);
        setEmail(res.data.user.email);
      });
  }, []);

  const updateProfileHandler = async (e) => {
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
      const res = await axios.patch(
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
      <form onSubmit={updateProfileHandler}>
        <label htmlFor="name">Nama</label>
        <input
          type="text"
          name="name"
          value={name}
          disabled
          id="name"
          className={styles.disabled}
        />

        <label htmlFor="nim">NIM</label>
        <input
          type="text"
          name="nim"
          value={nim}
          disabled
          id="nim"
          className={styles.disabled}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
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
        <h3>Change Password</h3>
        <label htmlFor="oldPassword">Old Password</label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          ref={oldPassword}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="NewPassword"
          id="newPassword"
          ref={password}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="newConfirmPassword"
          id="newConfirmPassword"
          ref={confirmPassword}
        />
      </form>
    </div>
  );
};

export default Profile;
