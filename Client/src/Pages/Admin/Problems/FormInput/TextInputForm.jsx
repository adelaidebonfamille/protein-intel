import styles from "./TextInputForm.module.css";
import { useId } from "react";

const TextInputForm = (props) => {
  const questionPreviewId = useId();

  const updatePreview = (e, id) => {
    document.getElementById(id).innerHTML = e.target.value;//ini jago jago gek ado yang nackal masuki element aneh
  }

  return (
    <form onSubmit={props.handler}>
      {props.children}
      <p>Question</p>
      <div className={styles["question-preview"]}>
        <p>Question Preview</p>
        <div className={styles.preview} id={questionPreviewId}>
        </div>
      </div>
      <textarea
        name="description"
        id=""
        cols="60"
        rows="10"
        onKeyUp={(e)=>{ updatePreview(e, questionPreviewId) }} 
        required
      ></textarea>
      <p>Options</p>
      <div className={styles["text-inputs"]}>
        A{" "}
        <textarea name="choice-1" id="" cols="60" rows="2" required></textarea>B{" "}
        <textarea name="choice-2" id="" cols="60" rows="2" required></textarea>C{" "}
        <textarea name="choice-3" id="" cols="60" rows="2" required></textarea>D{" "}
        <textarea name="choice-4" id="" cols="60" rows="2" required></textarea>
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
      </div>
      <br />
      <button type="submit">Add Problem</button>
    </form>
  );
};

export default TextInputForm;
