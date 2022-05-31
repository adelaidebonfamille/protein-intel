import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Contexts/AuthContext";
import styles from "./Exam.module.css";
import OngoingExam from "./OngoingExam/OngoingExam";
import StartExam from "./StartExam/StartExam";
import ChooseBatch from "./ChooseBatch/ChooseBatch";

const Exam = () => {
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

  const [selectedBatch, setSelectedBatch] = useState({});
  const selectBatch = (e) => {
    setSelectedBatch({
      batchId: e.target.dataset.id,
      batchName: e.target.dataset.batchName,
    });
  };
  const deleteBatch = () => {
    setSelectedBatch({});
  };

  useEffect(() => {
    const getInfo = async () => {
      await axios
        .get("http://localhost:5000/api/test", {
          headers: { "auth-token": localStorage.getItem("token") },
        })
        .then(async (res) => {
          res.data.test != undefined && setTest(res.data.test);

          if (Object.keys(test).length == 0) {
            await getAllActiveBatch();
          }
        });
    };

    getInfo();
  }, []);

  return (
    <>
      {Object.keys(test).length == 0 &&
      Object.keys(selectedBatch).length == 0 ? (
        <ChooseBatch
          allActiveBatch={allActiveBatch}
          selectBatch={selectBatch}
        />
      ) : (
        <>
          {isNotStarted ? (
            <StartExam
              startHandler={() => {
                setIsNotStarted(false);
              }}
              batchName={selectedBatch.batchName}
              deleteBatch={deleteBatch}
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
