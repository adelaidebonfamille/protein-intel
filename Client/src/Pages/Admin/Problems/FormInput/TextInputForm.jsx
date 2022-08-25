import styles from "./TextInputForm.module.css";
import { useId, useState } from "react";

const TextInputForm = (props) => {
  const questionPreviewId = useId();
  const [isQuestionInputWrong, setIsQuestionInputWrong] = useState();

  const submitProblem = (e) => {
    e.preventDefault();

    if (!isQuestionInputWrong) {
      props.handler(e);
    }
  };
  const updatePreview = (e, id) => {
    if (/<\/?(?!\/?(?:[bi]|sup|sub|br)\/?>).*\/?>/.test(e.target.value)) {
      document.getElementById(id).style.color = "red";
      document.getElementById(id).innerHTML = "INPUT SALAH";
      setIsQuestionInputWrong(true);
    } else {
      document.getElementById(id).style.color = "black";
      document.getElementById(id).innerHTML = e.target.value; //ini jago jago gek ado yang nackal masuki element aneh
      setIsQuestionInputWrong(false);
    }
  };

  return (
    <form onSubmit={submitProblem}>
      {props.children}
      <p>Question</p>
      <br />
      <div className={styles["question-preview"]}>
        <h5>Question Preview</h5>
        <div className={styles.preview} id={questionPreviewId}></div>
        <table>
          <tr>
            <td>&lt;b&gt;Bold&lt;/b&gt;</td>
            <td>
              <b>Bold</b>
            </td>
            <td>when&lt;sup&gt;2&lt;/sup&gt;</td>
            <td>
              when<sup>2</sup>
            </td>
          </tr>
          <tr>
            <td>&lt;i&gt;italic&lt;/i&gt;</td>
            <td>
              <i>Italic</i>
            </td>
            <td>goes&lt;sub&gt;2&lt;/sub&gt;</td>
            <td>
              goes<sub>2</sub>
            </td>
          </tr>
          <tr>
            <td>&lt;br/&gt;</td>
            <td>Enter</td>
          </tr>
        </table>
      </div>
      <textarea
        name="description"
        id=""
        cols="60"
        rows="10"
        onChange={(e) => {
          updatePreview(e, questionPreviewId);
        }}
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
      {isQuestionInputWrong ? (
        <div className={styles["question-preview-wrong"]}>
          MASUKAN PADA BAGIAN QUESTION SALAH, SILAHKAN DIPERIKSA KEMBALI
        </div>
      ) : (
        <div></div>
      )}
      <button type="submit">Add Problem</button>
    </form>
  );
};

export default TextInputForm;
