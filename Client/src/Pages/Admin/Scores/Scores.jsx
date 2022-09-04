import styles from "./Scores.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Scores = () => {
  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/admin/scores`) ||
    "http://localhost:5000/api/admin/scores";

  const [allScores, setAllScores] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedScores, setSelectedScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllScore = async () => {
    await axios
      .get(baseUrl, {
        headers: { "auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setAllScores((prev) => {
          let newScores = [...res.data.allBatchScore];
          newScores.map((scorePerBatch) => {
            scorePerBatch.batchScore.sort(
              (a, b) => b.totalScore - a.totalScore
            );
          });

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
    setSelectedScores(
      ...allScores
        .filter(
          (batchAndScore) =>
            selectedBatch === "" ||
            batchAndScore.batchName === selectedBatch ||
            batchAndScore.batchId.toString() === selectedBatch
        )
        .map((filteredBatchAndScore) => filteredBatchAndScore.batchScore)
    );
  }, [allScores, selectedBatch]);
  useEffect(() => {
    getAllScore();
  }, []);

  return (
    <div className={styles.container}>
      <Link to="/admin">
        <div className={styles["go-back-home"]}>Go back to Admin Homepage</div>
      </Link>
      <div>
        <h4>Select Batch Id or name</h4>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSelectedBatch(e.target.batch.value);
          }}
        >
          <input type="text" name="batch" />
          <button type="submit">Select Batch</button>
        </form>
      </div>
      {!loading &&
        <>
          <h3>Total {selectedScores?.length} scores</h3>
        
        {selectedScores?.map((score, index) => {
          return (
            <div className={styles.score} key={index}>
              <h4>Rank {index+1}</h4>
              <tr>
                <th>NIM</th>
                <td>{score.nim}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{score.name}</td>
              </tr>
              <tr>
                <th>Score</th>
                <td>{score.totalScore}</td>
              </tr>
              <tr>
                <th>Reading</th>
                <td>{score.subTestScore.reading}</td>
              </tr>
              <tr>
                <th>Listening</th>
                <td>{score.subTestScore.listening}</td>
              </tr>
              <tr>
                <th>Structure</th>
                <td>{score.subTestScore.structure}</td>
              </tr>
              <tr>
                <th>University</th>
                <td>{score.university}</td>
              </tr>
              <tr>
                <th>Faculty</th>
                <td>{score.faculty}</td>
              </tr>
              <tr>
                <th>Major</th>
                <td>{score.major}</td>
              </tr>
              <tr>
                <th>Entry Year</th>
                <td>{score.entryYear}</td>
              </tr>
              <tr>
                <th>Batch Id</th>
                <td>{score.batchId}</td>
              </tr>
            </div>
          );
        })}
        </>
        
        }
    </div>
  );
};

export default Scores;
