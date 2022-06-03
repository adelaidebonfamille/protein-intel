import styles from "./Scores.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Scores = () => {
  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/api/admin/scores`) ||
    "http://localhost:5000/api/admin/scores";

  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllScore = async () => {
    await axios
      .get(baseUrl, {
        headers: { "auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setScores((prev) => {
          let newScores = [...res.data.userScore];
          newScores.sort((a, b) => b.totalScore - a.totalScore);

          return newScores;
        });
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllScore();
  }, []);

  return (
    <div className={styles.container}>
      <Link to="/admin">
        <div className={styles["go-back-home"]}>Go back to Admin Homepage</div>
      </Link>
      {!loading &&
        scores.map((score, index) => {
          return (
            <div className={styles.score} key={index}>
              <p>NIM {score.nim}</p>
              <p>score {score.totalScore}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Scores;
