import { useId, useState } from "react";
import styles from "./UpdateTextForm.module.css";

const UpdateTextForm = (props) => {
  const [filename, setFilename] = useState(
    "no file input (not changing the associated file)"
  );
  const questionPreviewId = useId();
  const [isQuestionInputWrong, setIsQuestionInputWrong] = useState();

  const submitProblem = (e) => {
    e.preventDefault();
    
    if (!isQuestionInputWrong) {
      props.handler(e);
    }
  }

  const updatePreview = (e, id) => {
    if (/<\/?(?!\/?(?:[bi]|br)\/?>).*\/?>/.test(e.target.value)) {
      document.getElementById(id).style.color = "red";
      document.getElementById(id).innerHTML = "INPUT SALAH"
      setIsQuestionInputWrong(true);
    } else {
      document.getElementById(id).style.color = "black";
      document.getElementById(id).innerHTML = e.target.value;//ini jago jago gek ado yang nackal masuki element aneh
      setIsQuestionInputWrong(false);
    }
  }

  const changeType =
    props.problem.type === "listening"
      ? ["Listening"]
      : ["Reading", "Structure"];
  return (
    <form onSubmit={submitProblem}>
      <h3>Problem Id: {props.problem.id}</h3>
      <input type="hidden" name="id" value={props.problem.id} />

      <p>Problem Category</p>
      {changeType.map((category, index) => {
        return (
          <div key={index}>
            {props.problem.type === category.toLowerCase() ? (
              <input
                type="radio"
                id={`problem-type-${index}`}
                name="type"
                value={category.toLowerCase()}
                onClick={() => {
                  setType(category.toLowerCase());
                }}
                defaultChecked
              />
            ) : (
              <input
                type="radio"
                id={`problem-type-${index}`}
                name="type"
                value={category.toLowerCase()}
                onClick={() => {
                  setType(category.toLowerCase());
                }}
              />
            )}
            <label htmlFor={`problem-type-${index}`}>{category}</label>
          </div>
        );
      })}
      <br />

      {props.problem.associatedFile !== "" && (
        <>
          {props.problem.type === "listening" ? (
            <>
              <p>Associated File</p>
              <audio controls>
                <source
                  src={
                    (import.meta.env.VITE_API_STATIC &&
                      `${import.meta.env.VITE_API_STATIC}${
                        props.problem.associatedFile
                      }`) ||
                    `http://localhost:5000${props.problem.associatedFile}`
                  }
                  type="audio/mpeg"
                />
              </audio>
              <br />
            </>
          ) : (
            <>
              <p>Associated File</p>
              <img
                src={
                  (import.meta.env.VITE_API_STATIC &&
                    `${import.meta.env.VITE_API_STATIC}${
                      props.problem.associatedFile
                    }`) ||
                  `http://localhost:5000${props.problem.associatedFile}`
                }
                alt="server failed to retrieve file"
                className={styles["image-file"]}
              />
              <br />
            </>
          )}
          <h4>Change the Associated file to:</h4>
          {props.problem.type === "listening" ? (
            <>
              <p>category listening (mp3 file)</p>
              <input
                type="file"
                id="selectedFile"
                name="problem"
                onChange={(e) => {
                  props.fileChangeHandler(e);
                  try {
                    setFilename(e.target.files[0].name);
                  } catch {}
                }}
                style={{ display: "none" }}
                accept=".mp3"
              />
            </>
          ) : (
            <>
              <p>category structure/reading (image file)</p>
              <input
                type="file"
                id="selectedFile"
                name="problem"
                onChange={(e) => {
                  props.fileChangeHandler(e);
                  try {
                    setFilename(e.target.files[0].name);
                  } catch {}
                }}
                style={{ display: "none" }}
                accept=".jpg, .png, .jpeg"
              />
            </>
          )}
          <div className={styles["file-input-name"]}>{filename}</div>
          <button
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("selectedFile").click();
            }}
          >
            Choose File
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              props.fileCancelHandler(e);
              setFilename("no file input (not changing the associated file)");
            }}
            className={styles["cancel-file"]}
          >
            Cancel Change File
          </button>
          <br />
        </>
      )}

      <p>Question</p>
      <br/>
      <div className={styles["question-preview"]}>
        <h5>Question Preview</h5>
        <div className={styles.preview} id={questionPreviewId} dangerouslySetInnerHTML={{__html: props.problem.description}}></div>
        <table>
          <tr>
            <td>&lt;b&gt;&lt;/b&gt;</td>
            <td><b>Bold</b></td>
            <td>&lt;br/&gt;</td>
            <td>Enter</td>
          </tr>
          <tr>
            <td>&lt;i&gt;&lt;/i&gt;</td>
            <td><i>Italic</i></td>
          </tr>
        </table>
      </div>
      <textarea
        name="description"
        defaultValue={props.problem.description}
        onKeyUp={(e)=>{ updatePreview(e, questionPreviewId) }} 
        id=""
        cols="60"
        rows="10"
      ></textarea>
      <p>Options</p>
      <div className={styles["text-inputs"]}>
        A{" "}
        <textarea
          name="choice-1"
          defaultValue={props.problem["choice-1"]}
          id=""
          cols="60"
          rows="2"
        ></textarea>
        B{" "}
        <textarea
          name="choice-2"
          defaultValue={props.problem["choice-2"]}
          id=""
          cols="60"
          rows="2"
        ></textarea>
        C{" "}
        <textarea
          name="choice-3"
          defaultValue={props.problem["choice-3"]}
          id=""
          cols="60"
          rows="2"
        ></textarea>
        D{" "}
        <textarea
          name="choice-4"
          defaultValue={props.problem["choice-4"]}
          id=""
          cols="60"
          rows="2"
        ></textarea>
      </div>

      <p>Right Answer</p>
      <div className={styles.keys}>
        {props.problem.key === "A" ? (
          <>
            <input
              type="radio"
              id="answer-type1"
              name="key"
              defaultValue="A"
              defaultChecked
            />
            <label htmlFor="answer-type1">A</label>
          </>
        ) : (
          <>
            <input type="radio" id="answer-type1" name="key" defaultValue="A" />
            <label htmlFor="answer-type1">A</label>
          </>
        )}
        {props.problem.key === "B" ? (
          <>
            <input
              type="radio"
              id="answer-type2"
              name="key"
              defaultValue="B"
              defaultChecked
            />
            <label htmlFor="answer-type2">B</label>
          </>
        ) : (
          <>
            <input type="radio" id="answer-type2" name="key" defaultValue="A" />
            <label htmlFor="answer-type2">B</label>
          </>
        )}
        {props.problem.key === "C" ? (
          <>
            <input
              type="radio"
              id="answer-type3"
              name="key"
              defaultValue="C"
              defaultChecked
            />
            <label htmlFor="answer-type3">C</label>
          </>
        ) : (
          <>
            <input type="radio" id="answer-type3" name="key" defaultValue="C" />
            <label htmlFor="answer-type3">C</label>
          </>
        )}
        {props.problem.key === "D" ? (
          <>
            <input
              type="radio"
              id="answer-type4"
              name="key"
              defaultValue="D"
              defaultChecked
            />
            <label htmlFor="answer-type4">D</label>
          </>
        ) : (
          <>
            <input type="radio" id="answer-type4" name="key" defaultValue="D" />
            <label htmlFor="answer-type4">D</label>
          </>
        )}
      </div>
      <br />
      {isQuestionInputWrong ? (
        <div className={styles["question-preview-wrong"]}>MASUKAN PADA BAGIAN QUESTION SALAH, SILAHKAN DIPERIKSA KEMBALI</div>
      ):(
        <div></div>
      )}
      <button type="submit">Update Problem</button>
    </form>
  );
};

export default UpdateTextForm;
