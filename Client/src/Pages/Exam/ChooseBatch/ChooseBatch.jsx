import styles from "./ChooseBatch.module.css";

const ChooseBatch = (props) => (
  <div className={styles["container-batch"]}>
    <div>
      <h3>Select Active Batch</h3>
    </div>
    <div className={styles.batches}>
      {props.allActiveBatch.map((batch) => (
        <div className={styles.batch} key={batch["_id"]}>
          {batch.batch}
          <button
            data-id={batch["_id"]}
            data-batch-name={batch.batch}
            onClick={props.selectBatch}
          >
            Select Batch
          </button>
        </div>
      ))}
      {props.allActiveBatch.length == 0 && (
        <div className={styles.error}>
          There are no active batch right now, please come back again later
        </div>
      )}
    </div>
  </div>
);

export default ChooseBatch;
