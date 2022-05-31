import { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Contexts/AuthContext";
import styles from "./Exam.module.css";
import OngoingExam from "./OngoingExam/OngoingExam";
import StartExam from "./StartExam/StartExam";

const Exam = () => {
  const authCtx = useContext(AuthContext);

  const [isNotStarted, setIsNotStarted] = useState(true);

  const [test, setTest] = useState({});

  const [allActiveBatch, setAllActiveBatch] = useState([]);
  const getAllActiveBatch = async () => {
    await axios
      .get("http://localhost:5000/api/test/batch", {
        headers: { "auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setAllActiveBatch(res.data.activeBatch);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedBatch = useRef({});
  const selectBatch = async () => {};

  useEffect(() => {
    const getInfo = async () => {
      await axios
        .get("http://localhost:5000/api/test", {
          params: { nim: authCtx.userData.nim },
          headers: { "auth-token": localStorage.getItem("token") },
        })
        .then(async (res) => {
          res.data.test != undefined && setTest(res.data.test);

          if (Object.keys(test).length == 0) {
            await getAllActiveBatch();
          }
        })
    };

    getInfo();
  }, []);

  return (
    <>
      {Object.keys(test).length == 0 ? (
        <div className={styles.container}>
          <div>
            <h3>Select Active Batch</h3>
          </div>
          <div className={styles.batches}>
            {allActiveBatch.map((batch) => (
              <div className={styles.batch} key={batch["_id"]}>
                {batch.batch}
                <button onClick={selectBatch}>SelectBatch</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {isNotStarted ? (
            <StartExam
              startHandler={() => {
                setIsNotStarted(false);
              }}
            />
          ) : (
            <OngoingExam />
          )}
        </>
      )}
    </>
  );
};

export default Exam;
