import { useEffect } from "react";
import { useState } from "react";
import styles from "./UpdateTextForm.module.css";

const UpdateTextForm = (props) => {
  const [filename, setFilename] = useState(
    "no file input (not changing the associated file)"
  );

  const [type, setType] = useState(props.problem.type);

  const changeType =
    props.problem.type === "listening"
      ? ["Listening"]
      : ["Reading", "Structure"];
  return (
    <form onSubmit={props.handler}>
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
                  src={`http://localhost:5000${props.problem.associatedFile}`}
                  type="audio/mpeg"
                />
              </audio>
              <br />
            </>
          ) : (
            <>
              <p>Associated File</p>
              <img
                src={`http://localhost:5000${props.problem.associatedFile}`}
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
      <textarea
        name="description"
        defaultValue={props.problem.description}
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
        E{" "}
        <textarea
          name="choice-5"
          defaultValue={props.problem["choice-5"]}
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
        {props.problem.key === "E" ? (
          <>
            <input
              type="radio"
              id="answer-type5"
              name="key"
              defaultValue="E"
              defaultChecked
            />
            <label htmlFor="answer-type5">E</label>
          </>
        ) : (
          <>
            <input type="radio" id="answer-type5" name="key" defaultValue="E" />
            <label htmlFor="answer-type5">E</label>
          </>
        )}
      </div>
      <br />
      <button type="submit">Update Problem</button>
    </form>
  );
};

export default UpdateTextForm;
