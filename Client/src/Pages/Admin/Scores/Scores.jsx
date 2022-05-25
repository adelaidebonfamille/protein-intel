import styles from "./Scores.module.css";
import { Link } from "react-router-dom";

const Scores = () => {
  return <div className={styles.container}>
    <Link to="/admin">
        <div className={styles["go-back-home"]}>Go back to Admin Homepage</div>
    </Link>
  </div>;
};

export default Scores;
