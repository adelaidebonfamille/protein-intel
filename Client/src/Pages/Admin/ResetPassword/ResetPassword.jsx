import styles from "./ResetPassword.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/admin/reset-password`) ||
      "http://82.112.237.86:5000/api/admin/reset-password";

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const changePassword = async (e) => {
    e.preventDefault();

    axios.post(baseUrl, {
      email: e.target.email.value
    },
      {
        headers: { "auth-token": localStorage.getItem("token") },
      }
    ) 
      .then((res) => {
        console.log(res.data.message);
        if (!res.data.message) {
          console.log("Email User Tidak Ditemukan");
          setIsError(true);
        } else {
          setIsError(false);
          setIsSuccess(true);
          setTimeout(()=>{setIsSuccess(false)}, 2000)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return <div className={styles.container}>
    <Link to="/admin">
      <div className={styles["go-back-home"]}>Go back to Admin Homepage</div>
    </Link>

    <h3>Change user password to 123456789</h3> 

    <div className={styles["create-batch"]}>
      <p>User Email</p>
      <form
        onSubmit={(e) => {
          changePassword(e);
        }}
      >
        <input type="text" name="email" />
        <button type="submit">Change</button>
      </form>
    </div>

    {isSuccess && (
      <div className={styles.message}>
        Password User Berhasil diganti ke 12346789
      </div>
    )}
    {isError && (
      <div className={styles.error}>
        Email User Tidak Ditemukan!
      </div>
    )}

  </div>;

};

export default ResetPassword;
