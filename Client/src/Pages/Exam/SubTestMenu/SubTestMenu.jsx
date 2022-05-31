import styles from "./SubTestMenu.module.css";
import axios from "axios";

const OngoingExam = (props) => {
  const baseUrl = "http://localhost:5000/api/test/subtest";

  const subTests = ["Reading", "Listening", "Structure"];

  const startSubTest = async (e) => {
    const { nim, testGroup } = e.target.dataset;

    await axios
      .post(baseUrl, {
        nim,
        testGroup,
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const continueSubTest = (e) => {
    const { nim, testGroup } = e.target.dataset;
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
                    {props.test.testTime[subtest.toLowerCase()].timeLeft}{" "}
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
        <div className={styles.end}>
          {subTests.every(
            (subtest) => props.test.testTime[subtest.toLowerCase()].isOver
          ) && <p>Congrats! you've finished all the test</p>}
        </div>
      </div>
    </div>
  );
};

export default OngoingExam;
