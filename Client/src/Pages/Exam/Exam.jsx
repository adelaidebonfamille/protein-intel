import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../Contexts/AuthContext";
import SubTestMenu from "./SubTestMenu/SubTestMenu";
import StartExam from "./StartExam/StartExam";
import ChooseBatch from "./ChooseBatch/ChooseBatch";

const Exam = () => {
  const authCtx = useContext(AuthContext);
  const baseUrl = "http://localhost:5000/api/test";

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

  const startTest = async (e) => {
    await axios
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
        setTest(res.data.test);
        console.log(res.data.message);
      })
      .then(() => {
        setIsNotStarted(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
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
        })
        .catch((error) => {
          console.log(error);
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
            Object.keys(selectedBatch).length == 0 ? (
              <StartExam
                startHandler={() => {
                  setIsNotStarted(false);
                }}
              />
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
  );
};

export default Exam;
