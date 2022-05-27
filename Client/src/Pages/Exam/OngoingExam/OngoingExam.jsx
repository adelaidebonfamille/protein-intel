import styles from "./OngoingExam.module.css";

const OngoingExam = () => {
  return (
    <div className={styles.container}>
      <div className={styles["small-container"]}>
        <h4>Your Ongoing Exam</h4>
        <div className={styles["small-container2"]}>
          <div className={styles.p}>
            <p>Reading : 45 Minutes (Yet Started)</p>
            <p>Listening : 45 minutes (Unfinished)</p>
            <p>Structure : 30 minutes (Finished)</p>
          </div>
          <div className={styles.button}>
            <button className={styles.button1}>Start</button>
            <br />
            <button className={styles.button2}>Continue</button>
            <br />
            <button className={styles.button3}>Finished</button>
            <br />
          </div>
        </div>
        <div className={styles.end}>
          <div className={styles["small-end"]}>
            <button>End Test</button>
            <br />
            <input type="checkbox" id="endtest" />
            <label htmlFor="endtest">Are you sure?</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingExam;
