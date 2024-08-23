import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

const Profile = () => {
  const baseUrl =
    (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}/user`) ||
    "https://82.112.237.86:5000/api/user";

  const [selectedFile, setSelectedFile] = useState(null);
  const [kpmName, setKpmName] = useState("Tidak Ada File Terpilih");
  const [isLoading, setIsLoading] = useState(false);
  const [isMessage, setIsMessage] = useState(null);
  const [isMessage2, setIsMessage2] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isError2, setIsError2] = useState(false);

  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [email, setEmail] = useState("");

  const university = useRef();
  const faculty = useRef();
  const major = useRef();
  const entryYear = useRef();
  const phone = useRef();

  const oldPassword = useRef();
  const newPassword = useRef();
  const newConfirmPassword = useRef();

  useEffect(() => {
    setIsLoading(true);
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
        if (res.data.user.university)
          university.current.value = res.data.user.university;
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
    formData.append("university", university.current.value);
    formData.append("faculty", faculty.current.value);
    formData.append("major", major.current.value);
    formData.append("entryYear", entryYear.current.value);
    formData.append("phone", phone.current.value);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "auth-token": localStorage.getItem("token"),
      },
    };

    try {
      const res = await axios.patch(`${baseUrl}/profile`, formData, config);
      if (res.data.error) return setIsError(res.data.error);
      setIsMessage(res.data.message);
    } catch (err) {
      setIsError(err.message);
    }
  };

  const fileChangedHandler = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);
    setKpmName(event.target.files[0].name);
  };

  const passwordChangedHandler = (e) => {
    e.preventDefault();

    axios
      .patch(
        `${baseUrl}/password`,
        {
          oldPassword: oldPassword.current.value,
          newPassword: newPassword.current.value,
          newConfirmPassword: newConfirmPassword.current.value,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.error) return setIsError2(res.data.error);
        setIsMessage2(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setIsError2(err.message);
      });
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles["title"]}>
        <h1>Profile</h1>
        <p>Complete all data here to start Protein Exam</p>
        <br />
        <h4>Join Protein Whatsapp Group (mandatory)</h4>
        <a
          href="https://chat.whatsapp.com/GDwWZ3mw2d0GSXSJuQfFNr"
          target="_blank"
        >
          Here
        </a>
      </div>
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

        <label htmlFor="university">Universitas</label>
        <input type="text" name="university" id="university" ref={university} />

        <label htmlFor="faculty">Fakultas</label>
        <input type="text" name="faculty" id="faculty" ref={faculty} />

        <label htmlFor="major">Prodi</label>
        <input type="text" name="major" id="major" ref={major} />

        <label htmlFor="entryYear">Angkatan</label>
        <input type="number" name="entryYear" id="entryYear" ref={entryYear} />

        <label htmlFor="phone">Nomor Telpon</label>
        <input type="text" name="phone" id="phone" ref={phone} />

        <label htmlFor="kpm">Upload KPM (max size 1mb)</label>
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
            accept=".png,.jpg,.jpeg,.pdf,.docx,.doc"
            onChange={fileChangedHandler}
          />
        </div>

        {isMessage && (
          <div className={styles.message}>
            <p>{isMessage}</p>
          </div>
        )}

        {isError && (
          <div className={styles.error}>
            <p>{isError}</p>
          </div>
        )}

        <button type="submit">Submit</button>
      </form>

      <div className={styles.border}></div>

      <form onSubmit={passwordChangedHandler} className={styles.changepass}>
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
          name="newPassword"
          id="newPassword"
          ref={newPassword}
        />

        <label htmlFor="confirmPassword">New Confirm Password</label>
        <input
          type="password"
          name="newConfirmPassword"
          id="newConfirmPassword"
          ref={newConfirmPassword}
        />

        <div className={styles.file}>
          <button type="submit">Change Password</button>
        </div>

        {isMessage2 && (
          <div className={styles.message}>
            <p>{isMessage2}</p>
          </div>
        )}

        {isError2 && (
          <div className={styles.error}>
            <p>{isError2}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;
