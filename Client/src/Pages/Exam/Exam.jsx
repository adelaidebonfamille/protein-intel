import styles from "./Exam.module.css";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Contexts/AuthContext";
import SubTestMenu from "./SubTestMenu/SubTestMenu";
import StartExam from "./StartExam/StartExam";
import ChooseBatch from "./ChooseBatch/ChooseBatch";
import SeeScore from "./SeeScore/SeeScore";

const Exam = () => {
  const authCtx = useContext(AuthContext);
  const baseUrl =
    (import.meta.env.VITE_API_URL && `${import.meta.env.VITE_API_URL}/test`) ||
    "http://82.112.237.86:5000/api/test";

  const [isLoading, setIsLoading] = useState(true);
  const [isNotStarted, setIsNotStarted] = useState(true);

  const [test, setTest] = useState({});

  const [allActiveBatch, setAllActiveBatch] = useState([]);
  const getAllActiveBatch = async () => {
    await axios
      .get(`${baseUrl}/batch`, {
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

  const startTest = (e) => {
    axios
      .post(
        baseUrl,
        {
          nim: e.target.dataset.nim,
          batchId: e.target.dataset.batchId,
        },
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      )
      .then((res) => {
        if (res.data.error) return alert(res.data.error);
        setTest(res.data.test);
        setIsNotStarted(false);
        console.log(res.data.message);
      })
      .catch((error) => {
        return alert(error);
      });
  };

  const getInfo = async () => {
    await axios
      .get(baseUrl, {
        headers: { "auth-token": localStorage.getItem("token") },
      })
      .then(async (res) => {
        res.data.test != undefined && setTest(res.data.test);

        if (Object.keys(test).length == 0) {
          await getAllActiveBatch();
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div>
      {!isLoading ? (
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
                Object.keys(selectedBatch).length == 0 ? (
                  <>
                    {test.isTestOver ? (
                      <SeeScore />
                    ) : (
                      <StartExam
                        startHandler={() => {
                          setIsNotStarted(false);
                        }}
                      />
                    )}
                  </>
                ) : (
                  <StartExam
                    startHandler={startTest}
                    batch={selectedBatch}
                    nim={authCtx.userData.nim}
                    deleteBatch={deleteBatch}
                  />
                )
              ) : (
                <SubTestMenu test={test} />
              )}
            </>
          )}
        </>
      ) : (
        <div className={styles["inner-container"]}>
          <div className={styles["loading-container"]}>Loading...</div>
        </div>
      )}
    </div>
  );
};

export default Exam;
