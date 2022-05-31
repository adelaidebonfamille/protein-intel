import styles from "./StartExam.module.css";
import { Link } from "react-router-dom";

const StartExam = (props) => {
  return (
    <div className={styles.container}>
      <span className={styles["change-batch"]}>
        <p>Batch selected: {props.batchName}</p>
        <a href="javascript:void(0)" onClick={props.deleteBatch}>
          Ganti Batch
        </a>
      </span>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>
            Welcome To <span>Protein</span> 2022
          </h1>
          <h2>Click down below to start test</h2>
        </div>
        <Link to="/exam" onClick={props.startHandler}>
          Start test
        </Link>
      </div>
    </div>
  );
};

export default StartExam;
