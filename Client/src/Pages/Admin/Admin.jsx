import { Link } from "react-router-dom";
import styles from "./Admin.module.css";

const Admin = () => {
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className={styles["login-container"]}>
<<<<<<< HEAD
        <h1>admin login</h1>
        <form action="#" onSubmit={onSubmitHandler}>
          <div className={styles["input-field"]}>
=======
        <h1>Admin Login</h1>
        <form action="#" onSubmit={onSubmitHandler}>
          <div classname={styles["input-field"]}>
>>>>>>> cb265cd23d66903b69daee3c14f40517ad86e141
            <p>email</p>
            <input
              type="text"
              placeholder="masukkan email"
              name="email"
              required
            />
          </div>
<<<<<<< HEAD
          <div className={styles["input-field"]}>
=======
          <div classname={styles["input-field"]}>
>>>>>>> cb265cd23d66903b69daee3c14f40517ad86e141
            <p>password</p>
            <input
              type="password"
              placeholder="masukkan password"
              name="password"
              required
            />
          </div>
          <button
            type="submit"
            className={`${styles["input-field"]} ${styles.button}`}
          >
            Login
          </button>
        </form>
      </div>
      <div className={styles.container}>
        <Link to="problems">
          <div className={styles["category-button"]}>
            Change / Delete Uploaded Problems
          </div>
        </Link>
        <Link to="scores">
          <div className={styles["category-button"]}>See All User Score</div>
        </Link>
      </div>
    </>
  );
};

export default Admin;
