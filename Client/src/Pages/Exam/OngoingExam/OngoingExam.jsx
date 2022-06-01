import styles from "./OngoingExam.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";

const OngoingExam = () => {
  const location = useLocation();
  const testGroup = location.state && location.state.testGroup;

  const [problems, setProblems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const convert = ["A", "B", "C", "D", "E"];

  const BASE_URL = import.meta.env.API_URL || "http://localhost:5000/api";

  useEffect(() => {
    setIsLoading(true);
    console.log("testGroup", testGroup);
    axios
      .get(`${BASE_URL}/test/problems/${testGroup}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setProblems(res.data.problems);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
      {!isLoading ? (
        testGroup ? (
          <>
            <div className={styles.title}>
              <div className={styles["title-text"]}>
                <h1>PROTEIN 2022 - {testGroup.toUpperCase()} SECTION</h1>
              </div>
            </div>
            <div className={styles.problemSection}>
              {problems &&
                problems.map((problem, problemIndex) => {
                  return (
                    <div
                      id={problemIndex + 1}
                      key={problemIndex}
                      className={styles["radio-section"]}
                    >
                      <div className={styles.text}>
                        <p>{problemIndex + 1}.</p>
                        <pre>{problem.description}</pre>
                      </div>
                      <div className={styles["radio-list"]}>
                        {problem.choice.map((choice, index) => {
                          return (
                            <div key={index} className={styles["radio-item"]}>
                              <input
                                value={convert[index]}
                                type="radio"
                                name={`${problem._id}`}
                                id={`radio${index}${problemIndex}`}
                              />
                              <label htmlFor={`radio${index}${problemIndex}`}>
                                <p>{`${convert[index]}.`}</p>
                                <pre>{choice}</pre>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className={styles.end}>
              <button className={styles["end-button"]}>End Section</button>
            </div>
          </>
        ) : (
          <div className={styles["inner-container"]}>
            <div className={styles["error-container"]}>
              You are not in any ongoing exam, go back to exam page
            </div>
          </div>
        )
      ) : (
        <div className={styles["inner-container"]}>
          <div className={styles["loading-container"]}>Loading...</div>
        </div>
      )}
    </div>
  );
};

export default OngoingExam;
