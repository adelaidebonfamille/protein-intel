import styles from "./StartExam.module.css";
import { Link } from "react-router-dom";

const StartExam = (props) => {
  return (
    <div className={styles.container}>
      {props.batch != undefined && (
        <span className={styles["change-batch"]}>
          <p>Batch selected: {props.batch.batchName}</p>
          <button onClick={props.deleteBatch}>(Ganti Batch)</button>
        </span>
      )}
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>
            Welcome To <span>Protein</span> 2023
          </h1>
          <h2>Click down below to start test</h2>
        </div>
        {props.batch != undefined ? (
          <button
            data-nim={props.nim}
            data-batch-id={props.batch.batchId}
            onClick={props.startHandler}
          >
            Start test
          </button>
        ) : (
          <button onClick={props.startHandler}>Continue test</button>
        )}
      </div>
    </div>
  );
};

export default StartExam;
