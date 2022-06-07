import { useEffect, useId, useState } from "react";
import styles from "./SeeScore.module.css";
import axios from "axios";
import OverallChart from "./OverallChart/OverallChart";
import AnimatedNumber from "react-animated-number";

export default function SeeScore() {
  const baseUrl =
    (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}`) ||
    "http://localhost:5000/api";

  const [scores, setScores] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const totalScoreShownId = useId();
  const [totalScoreShown, setTotalScoreShown] = useState(0);
  const changeTotalScoreShown = () => {
    setTimeout(() => {
      document.getElementById(totalScoreShownId).style.opacity = "1";
      setTotalScoreShown(scores.totalScore);
    }, 300);
  };

  const calculateScore = async () => {
    await axios
      .post(
        `${baseUrl}/test/end`,
        {},
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        getScore();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getScore = async () => {
    setIsLoading(true);
    await axios
      .get(`${baseUrl}/user/score`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.userScore) {
          setScores(res.data.userScore);
          setIsLoading(false);
        } else {
          calculateScore();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getColorFromScore = () => {
    if (scores.totalScore <= 420) {
      return "#c74653";
    } else if (scores.totalScore <= 480) {
      return "#ebe660";
    } else if (scores.totalScore <= 520) {
      return "#aaeb73";
    } else {
      return "#62f5fc";
    }
  };

  useEffect(() => {
    getScore();
  }, []);

  useEffect(() => {}, [scores]);

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <div className={styles["score-container"]}>
          <div className={styles["total-score"]}>
            <h1>Total Score</h1>
            <OverallChart
              changeTotalScoreShown={changeTotalScoreShown}
              color={getColorFromScore()}
              score={scores.reading + scores.listening + scores.structure}
              maxScore={50 + 40 + 50}
            />
            <div
              id={totalScoreShownId}
              className={styles["total-score-number"]}
            >
              <AnimatedNumber
                value={totalScoreShown}
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: getColorFromScore(),
                }}
                formatValue={(n) => n.toFixed(0)}
                frameStyle={(percentage) =>
                  percentage < 80 ? { opacity: 0.4 } : { opacity: 1 }
                }
              />
            </div>
          </div>
          <div className={styles["subtest-score-container"]}>
            <div className={styles["subtest-score"]}>
              <h3>Listening Score</h3>
              <span>
                <span className={styles["subtest-score-number"]}>
                  {scores?.listening}
                </span>
                /50
              </span>
            </div>
            <div className={styles["subtest-score"]}>
              <h3>Reading Score</h3>
              <span>
                <span className={styles["subtest-score-number"]}>
                  {scores?.reading}
                </span>
                /50
              </span>
            </div>
            <div className={styles["subtest-score"]}>
              <h3>Structure Score</h3>
              <span>
                <span className={styles["subtest-score-number"]}>
                  {scores?.structure}
                </span>
                /40
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles["loading-container"]}>Loading...</div>
      )}
    </div>
  );
}
