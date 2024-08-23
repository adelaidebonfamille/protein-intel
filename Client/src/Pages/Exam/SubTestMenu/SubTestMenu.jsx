import styles from "./SubTestMenu.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OngoingExam = (props) => {
  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/test/subtest`) ||
    "http://82.112.237.86:5000/api/test/subtest";

  const navigate = useNavigate();

  const subTests = ["Reading", "Listening", "Structure"];

  const startSubTest = async (e) => {
    const { nim, testGroup } = e.target.dataset;

    await axios
      .post(
        baseUrl,
        {
          nim,
          testGroup,
        },
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      )
      .then((res) => {
        navigate(`/exam/ongoing?testGroup=${testGroup}`);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const continueSubTest = async (e) => {
    const { nim, testGroup } = e.target.dataset;

    await axios
      .patch(
        baseUrl,
        {
          nim,
          testGroup,
        },
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      )
      .then((res) => {
        navigate(`/exam/ongoing?testGroup=${testGroup}`);
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles["small-container"]}>
        <h4>Your Ongoing Exam</h4>
        <div className={styles["small-container2"]}>
          {subTests.map((subtest) => (
            <div className={styles["subtest-container"]} key={subtest}>
              {props.test.testTime[subtest.toLowerCase()].isOver ? (
                <>
                  <p>{subtest}: 0 Minutes (Finished)</p>
                  <button className={styles.button3}>Finished</button>
                </>
              ) : props.test.testTime[subtest.toLowerCase()].timeLeft ? (
                <>
                  <p>
                    {subtest}:{" "}
                    {Math.floor(
                      (new Date(
                        props.test.testTime[subtest.toLowerCase()].timeLeft
                      ) -
                        new Date()) /
                        (60 * 1000)
                    )}{" "}
                    Minutes (Continue)
                  </p>
                  <button
                    className={styles.button2}
                    onClick={continueSubTest}
                    data-nim={props.test.nim}
                    data-test-group={subtest.toLowerCase()}
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <p>
                    {subtest}: {props.test.testTime[subtest.toLowerCase()].time}{" "}
                    Minutes (Start)
                  </p>
                  <button
                    className={styles.button1}
                    onClick={startSubTest}
                    data-nim={props.test.nim}
                    data-test-group={subtest.toLowerCase()}
                  >
                    Start
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OngoingExam;
