import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Exam.module.css";
import OngoingExam from "./OngoingExam/OngoingExam";

const Exam = () => {
  const [isNotStarted, setIsNotStarted] = useState(true);

  return isNotStarted ? (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>
            Welcome To <span>Protein</span> 2022
          </h1>
          <h2>Click down below to start test</h2>
        </div>
        <Link
          to="/exam"
          onClick={() => {
            setIsNotStarted(false);
          }}
        >
          Start test
        </Link>
      </div>
    </div>
  ) : (
    <OngoingExam />
  );
};

export default Exam;
