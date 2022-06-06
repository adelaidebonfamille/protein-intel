import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

const Profile = () => {
  const baseUrl =
    (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}/user`) ||
    "http://localhost:5000/api/user";

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
    setIsLoading(true);
    axios
      .get(`${baseUrl}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setName(res.data.user.name);
        setNim(res.data.user.nim);
        setEmail(res.data.user.email);
        if (res.data.user.faculty)
          faculty.current.value = res.data.user.faculty;
        if (res.data.user.major) major.current.value = res.data.user.major;
        if (res.data.user.entryYear)
          entryYear.current.value = res.data.user.entryYear;
        if (res.data.user.phone) phone.current.value = res.data.user.phone;
        if (res.data.user.kpm) setKpmName(res.data.user.kpm.slice(41));

        setIsLoading(false);
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
        "auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.patch(`${baseUrl}/profile`, formData, config);
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
      <form>
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
      </form>
      <form onSubmit={updateProfileHandler}>
        {isLoading && <div className={styles.loading}>Loading...</div>}

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
          <div className={styles.kpmName}>{kpmName}</div>
          <input
            type="file"
            hidden
            id="kpm"
            name="kpm"
            onChange={fileChangedHandler}
          />
        </div>

        <button type="submit">Submit</button>
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

        <label htmlFor="password">New Password</label>
        <input
          type="password"
          name="NewPassword"
          id="newPassword"
          ref={password}
        />

        <label htmlFor="confirmPassword">New Confirm Password</label>
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
