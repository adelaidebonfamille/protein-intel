import { useEffect, useState } from "react";
import styles from "./SeeScore.module.css";
import axios from "axios";

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
        if ( res.data.userScore ) {
          setScore(res.data.userScore)
          setIsLoading(false);
         } else {
          calculateScore();
         } 
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getScore();
  }, []);

  return (
    <div className={styles.container}>
      {!isLoading ? (
        <div className={styles["score-container"]}>
          <div className={styles["score-all"]}>
            <p>Total Score</p>
            {score?.totalScore}
          </div>
          <div className={styles["score-section"]}>
            <div className={styles["score-listening"]}>
              <p>Listening Score</p>
              {score?.listening}
            </div>
            <div className={styles["score-reading"]}>
              <p>Reading Score</p>
              {score?.reading}
            </div>
            <div className={styles["score-structure"]}>
              <p>Structure Score</p>
              {score?.structure}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles["loading-container"]}>Loading...</div>
      )}
    </div>
  );
}
