import styles from "./OngoingExam.module.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import axios from "axios";

const OngoingExam = () => {
  const location = useLocation();
  const { testGroup } = location.state;

  const convert = ["A", "B", "C", "D", "E"];

  const BASE_URL = import.meta.env.API_URL || "http://localhost:5000/api";

  const getProblems = async () => {
    const response = await axios.get(`${BASE_URL}/test/problems/${testGroup}`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    return response.data;
  };

  let problems;

  useEffect(() => {
    problems = getProblems();
  }, []);

  return (
    <div className={styles.container}>
      {testGroup != undefined ? (
        <>
          <div className="title">
            <div className="title-text">
              <h1>PROTEIN 2022 - {testGroup.toUpperCase()} SECTION</h1>
            </div>
          </div>
          {problems.map((problem, index) => {
            return (
              <div className="radio-section">
                <div className="text">
                  {`${index + 1}. ${problem.description}`}
                </div>
                <div className="radio-list">
                  {problem.choice.map((choice, index) => {
                    return (
                      <div className="radio-item">
                        <input
                          value={convert[index]}
                          type="radio"
                          name="radio"
                          id={`radio${index}`}
                        />
                        <label htmlFor="radio1">{`${convert[index]}. ${choice}`}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="end">
            <button className="end-button">End Section</button>
          </div>
        </>
      ) : (
        <div className={styles["error-container"]}>
          You are not in any ongoing exam, go back to exam page
        </div>
      )}
    </div>
  );
};

export default OngoingExam;
