import styles from "./PageNotFound.module.css";

const PageNotFound = () => (
  <div className={styles["inner-container"]}>
    <div className={styles["loading-container"]}>
      Page Not Found, please check the link.
    </div>
  </div>
);

export default PageNotFound;
