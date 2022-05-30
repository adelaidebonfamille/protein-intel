import { useState } from "react";
import styles from "./Exam.module.css";
import OngoingExam from "./OngoingExam/OngoingExam";
import StartExam from "./StartExam/StartExam";

const Exam = () => {
  const [isNotStarted, setIsNotStarted] = useState(true);

  const getActiveBatch = async () => {
    
  }

  return isNotStarted ? (
    <StartExam
      startHandler={() => {
        setIsNotStarted(false);
      }}
    />
  ) : (
    <OngoingExam />
  );
};

export default Exam;
