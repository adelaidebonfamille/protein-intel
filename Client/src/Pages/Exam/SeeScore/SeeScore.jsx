import { useEffect, useState } from "react";
import styles from "./SeeScore.module.css";
import axios from "axios";
import OverallChart from "./OverallChart/OverallChart";

export default function SeeScore() {
  const baseUrl =
    (import.meta.env.API_URL && `${import.meta.env.API_URL}/api`) ||
    "http://localhost:5000/api";

  const [score, setScore] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
          setScore(res.data.userScore);
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
    if (score.totalScore <= 420) {
      return "#bf616a";
    } else if (score.totalScore <= 480) {
      return "#d08770";
    } else if (score.totalScore <= 520) {
      return "#a3be8c";
    } else {
      return "#ebcb8b";
    }
  };

  useEffect(() => {
    getScore();
  }, []);

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <div className={styles["score-container"]}>
          <div className={styles["total-score"]}>
            <h1>Total Score</h1>
            <OverallChart
              color={getColorFromScore()}
              score={score.reading + score.listening + score.structure}
              maxScore={50 + 40 + 50}
            />
            <p style={{color: getColorFromScore()}}className={styles["total-score-number"]}>{score?.totalScore}</p>
          </div>
          <div className={styles["subtest-score-container"]}>
            <div className={styles["subtest-score"]}>
              <h3>Listening Score</h3>
              {score?.listening}/50
            </div>
            <div className={styles["subtest-score"]}>
              <h3>Reading Score</h3>
              {score?.reading}/50
            </div>
            <div className={styles["subtest-score"]}>
              <h3>Structure Score</h3>
              {score?.structure}/40
            </div>
          </div>
        </div>
      ) : (
        <div className={styles["loading-container"]}>Loading...</div>
      )}
    </div>
  );
}
