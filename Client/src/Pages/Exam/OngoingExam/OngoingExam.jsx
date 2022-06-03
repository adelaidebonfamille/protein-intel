import styles from "./OngoingExam.module.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import Timer from "../../../Components/Timer/Timer";

const OngoingExam = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const testGroup = query.get("testGroup");

  const navigate = useNavigate();

  const [problems, setProblems] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNotError, setIsNotError] = useState(true);
  const [time, setTime] = useState(null);
  const [isSureEnding, setIsSureEnding] = useState(false);

  const convert = ["A", "B", "C", "D", "E"];

  const BASE_URL =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/test`) ||
    "http://localhost:5000/api/test";

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      let subTestData;
      try {
        subTestData = await axios.patch(
          `${BASE_URL}/subtest`,
          { testGroup },
          {
            headers: { "auth-token": localStorage.getItem("token") },
          }
        );
      } catch (error) {
        return setIsNotError(false);
      }
      if (subTestData.data.error) setIsNotError(false);

      let problemData;
      try {
        problemData = await axios.get(`${BASE_URL}/problems/${testGroup}`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
      } catch (error) {
        return setIsNotError(false);
      }
      if (problemData.data.error) setIsNotError(false);

      setAnswers(subTestData.data.answers);
      setTime(
        new Date(Date.now() + (new Date(subTestData.data.time) - new Date()))
      );
      setProblems(problemData.data.problems);

      setInterval(() => {
        setIsLoading(false);
      }, 1000);
    };

    getData();
  }, []);

  const changeAnswer = async (e) => {
    await axios
      .patch(
        `${BASE_URL}`,
        {
          testType: testGroup,
          testAnswers: {
            problemId: e.target.name,
            answer: e.target.value,
          },
        },
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data.error) setIsNotError(false);

        setAnswers((prev) => {
          const prevAnswer = prev.filter(
            (answer) => answer.problemId !== e.target.name
          );

          return [
            ...prevAnswer,
            { problemId: e.target.name, answer: e.target.value },
          ];
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const endSubTest = async () => {
    await axios
      .post(
        `${BASE_URL}/subtest/end`,
        {
          testGroup,
          answers,
        },
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        navigate("/exam");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      {!isLoading ? (
        testGroup && isNotError ? (
          <div>
            <div className={styles.title}>
              <div className={styles["title-text"]}>
                <h1>PROTEIN 2022 - {testGroup.toUpperCase()} SECTION</h1>
              </div>
            </div>
            {isSureEnding && (
              <div className={styles["inner-container-end"]}>
                <div className={styles["sure-end"]}>
                  <p>
                    Are you sure want to end this section? You can always exit
                    this page and go back without ending the section first
                  </p>
                  <div className={styles["sure-end-buttons"]}>
                    <button
                      onClick={endSubTest}
                      className={styles["sure-end-button"]}
                    >
                      End
                    </button>
                    <button
                      className={styles["sure-end-cancel-button"]}
                      onClick={() => {
                        setIsSureEnding(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div>
              <div className={styles["menu-container"]}>
                <div className={styles.menu}>
                  <Timer time={time} />
                  <div className={styles.problemGrid}>
                    {problems.map((problem, index) => {
                      return (
                        <a
                          href={`#${index + 1}`}
                          className={styles.gridItem}
                          key={index}
                        >
                          <p>{index + 1}</p>
                          {answers.find(
                            (answer) =>
                              answer.problemId === problem._id &&
                              answer.answer !== ""
                          ) && <span></span>}
                        </a>
                      );
                    })}
                  </div>
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
                        {problem.associatedFile && (
                          <>
                            {problem.type == "listening" ? (
                              <audio controls>
                                <source
                                  src={`http://localhost:5000${problem.associatedFile}`}
                                  type="audio/mpeg"
                                />
                              </audio>
                            ) : (
                              <img
                                className={styles["image-file"]}
                                src={`http://localhost:5000${problem.associatedFile}`}
                                alt="server failed to retrieve file"
                              />
                            )}
                          </>
                        )}
                        <div className={styles.desc}>
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
                                  name={problem._id}
                                  id={`radio${index}${problemIndex}`}
                                  onChange={changeAnswer}
                                  defaultChecked={answers.find(
                                    (answer) =>
                                      answer.problemId === problem._id &&
                                      answer.answer === convert[index]
                                  )}
                                />
                                <label htmlFor={`radio${index}${problemIndex}`}>
                                  <p>{`${convert[index]}.`}</p>
                                  <pre>{choice}</pre>
                                </label>
                              </div>
                            );
                          })}
                          <button
                            name={problem._id}
                            value=""
                            onClick={(e) => {
                              changeAnswer(e).then(() => {
                                try {
                                  var radio = document.querySelector(
                                    `input[type=radio][name="${problem._id}"]:checked`
                                  );
                                  radio.checked = false;
                                } catch (error) {
                                  console.log(
                                    "No answer to clear -_- (btw yg buat website ni namany azie)"
                                  );
                                }
                              });
                            }}
                            className={styles["clear-answer"]}
                          >
                            Clear Answer
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className={styles.end}>
              <button
                onClick={() => {
                  setIsSureEnding(true);
                }}
                className={styles["end-button"]}
              >
                End Section
              </button>
            </div>
          </div>
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
