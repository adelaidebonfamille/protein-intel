import styles from "./Admin.module.css";

const Admin = () => {
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={`${styles.form} ${styles.login}`}>
            <span className={styles.title}>Login</span>

            <form action="#" onSubmit={onSubmitHandler}>
              <div className={styles["input-field"]}>
                <p>Username</p>
                <input
                  type="text"
                  placeholder="Masukkan Username"
                  name="username"
                  required
                />
              </div>
              <div className={styles["input-field"]}>
                <p>Password</p>
                <input
                  type="password"
                  placeholder="Masukkan Password"
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
        </div>
      </div>
    </div>
  );
};

export default Admin;
