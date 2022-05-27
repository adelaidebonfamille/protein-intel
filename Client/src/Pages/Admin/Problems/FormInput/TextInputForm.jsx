import styles from "./TextInputForm.module.css";

const TextInputForm = (props) => {
  return (
    <form onSubmit={props.handler}>
      {props.children}
      <p>Question</p>
      <textarea
        name="description"
        id=""
        cols="60"
        rows="10"
        required
      ></textarea>
      <p>Options</p>
      <div className={styles["text-inputs"]}>
        A{" "}
        <textarea name="choice-1" id="" cols="60" rows="2" required></textarea>B{" "}
        <textarea name="choice-2" id="" cols="60" rows="2" required></textarea>C{" "}
        <textarea name="choice-3" id="" cols="60" rows="2" required></textarea>D{" "}
        <textarea name="choice-4" id="" cols="60" rows="2" required></textarea>E{" "}
        <textarea name="choice-5" id="" cols="60" rows="2" required></textarea>
      </div>
      <p>Right Answer</p>
      <div className={styles.keys}>
        <input type="radio" id="answer-type1" name="key" value="A" required />
        <label htmlFor="answer-type1">A</label>

        <input type="radio" id="answer-type2" name="key" value="B" required />
        <label htmlFor="answer-type2">B</label>

        <input type="radio" id="answer-type3" name="key" value="C" required />
        <label htmlFor="answer-type3">C</label>

        <input type="radio" id="answer-type4" name="key" value="D" required />
        <label htmlFor="answer-type4">D</label>

        <input type="radio" id="answer-type5" name="key" value="E" required />
        <label htmlFor="answer-type5">E</label>
      </div>
      <br />
      <button type="submit">Add Problem</button>
    </form>
  );
};

export default TextInputForm;
