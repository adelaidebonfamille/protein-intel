import styles from "./Batch.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Batch = () => {
  const baseUrl =
    (import.meta.env.VITE_API_URL &&
      `${import.meta.env.VITE_API_URL}/admin/batch`) ||
    "http://82.112.237.86:5000/api/admin/batch";

  const [allBatch, setAllBatch] = useState([]);
  const getAllBatch = async () => {
    await axios
      .get(baseUrl, {
        headers: { "auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        setAllBatch(res.data.batch);
        console.log(res.data.message);
      });
  };

  const createBatch = async (e) => {
    e.preventDefault();

    await axios
      .post(
        baseUrl,
        {
          batch: e.target.batch.value,
        },
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res.data.message);
        if (!res.data.message)
          console.log("Mohon gunakan nama batch yang berbeda");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateBatchById = async (e) => {
    await axios
      .patch(
        `${baseUrl}/${e.target.dataset.batchId}`,
        {
          batch: e.target.dataset.batch,
          isActive: !(e.target.dataset.isActive === "true" ? true : false),
        },
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      )
      .then((res) => {
        console.log(res.data.message);
      })
      .then(() => {
        getAllBatch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBatchById = async (e) => {
    await axios
      .delete(`${baseUrl}/${e.target.dataset.batchId}`, {
        headers: { "auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data.message);
      })
      .then(() => {
        getAllBatch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllBatch();
  }, []);

  const [mode, setMode] = useState("search");

  return (
    <div className={styles.container}>
      <Link to="/admin">
        <div className={styles["go-back-home"]}>Go back to Admin Homepage</div>
      </Link>
      <div className={styles.batch}>
        <div className={styles["search-batch"]}>
          <h3>Get All Batch</h3>
          <button
            onClick={(e) => {
              getAllBatch().then(setMode("search"));
            }}
          >
            getAllBatch
          </button>
        </div>
        <div className={styles["create-batch"]}>
          <h3>Create Batch</h3>
          <button
            onClick={() => {
              setMode("create");
            }}
          >
            createBatch
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {mode === "search" &&
          allBatch?.map((batch) => (
            <div key={batch["_id"]} className={styles["batch-display"]}>
              <h4>Batch id: {batch["_id"]}</h4>
              <p>Batch name: {batch.batch}</p>
              <div
                className={
                  batch.isActive ? styles["active"] : styles["inactive"]
                }
              >
                status: {batch.isActive ? "Active" : "Inactive"}
              </div>
              <button
                data-batch={batch.batch}
                data-batch-id={batch["_id"]}
                data-is-active={batch.isActive}
                onClick={updateBatchById}
              >
                {batch.isActive ? "Inactivate Batch" : "Activate Batch"}
              </button>
              <button data-batch-id={batch["_id"]} onClick={deleteBatchById}>
                Delete Batch
              </button>
            </div>
          ))}

        {mode === "create" && (
          <div className={styles["create-batch"]}>
            <p>Batch name</p>
            <form
              onSubmit={(e) => {
                createBatch(e).then(setMode(""));
              }}
            >
              <input type="text" name="batch" />
              <button type="submit">Create Batch</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Batch;
