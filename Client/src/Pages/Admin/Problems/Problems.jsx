import styles from "./Problems.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const Problems = () => {
  const [search, setSearch] = useState(false);

  const [isAddText, setIsAddText] = useState(false);
  const [isAddImage, setIsAddImage] = useState(false);
  const [isAddAudio, setIsAddAudio] = useState(false);

  const selectedFile = useRef(null);
  const fileChangedHandler = (e) => {
    e.preventDefault();
    selectedFile.current = e.target.files[0];
  };

  const [allProblems, setAllProblems] = useState([]);
  const searchHandler = async (e) => {
    e.preventDefault();

    if (e.target.searchId.value === "") {
      await axios
        .get("http://localhost:5000/api/admin/problems", {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setIsAddText(false);
          setIsAddImage(false);
          setIsAddAudio(false);

          setAllProblems(response.data.problems);

          setSearch(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
    }
  };

  const addProblemHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("description", e.target.description.value);
      formData.append("key", e.target.key.value);
      formData.append("type", e.target.type.value);
      
      for (let i = 1; i <= 5; i++) {
        formData.append("choice[]", e.target[`choice-${i}`].value)
      }

      if (selectedFile.current) {
        formData.append("problem", selectedFile.current);
        console.log(selectedFile.current)
      }

      axios
        .post("http://localhost:5000/api/admin/problems", formData, {
          headers: {
            "Content-type": "multipart/form-data",
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log("respon: " + response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Link to="/admin">
        <div className={styles["go-back-home"]}>Go back to Admin Homepage</div>
      </Link>
      <div className={styles.container}>
        <div className={styles["input-container"]}>
          <form onSubmit={searchHandler}>
            <p>Search Problems Id (empty means show all)</p>
            <input type="search" name="searchId" />
            <button type="submit">Search</button>
          </form>
          <div className={styles["add-problems"]}>
            Add Problems
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  setSearch(false);
                  setIsAddText(true);
                  setIsAddImage(false);
                  setIsAddAudio(false);
                  selectedFile.current = null;
                }}
              >
                Type Text
              </button>
              <button
                onClick={() => {
                  setSearch(false);
                  setIsAddText(false);
                  setIsAddImage(true);
                  setIsAddAudio(false);
                }}
              >
                Type Image
              </button>
              <button
                onClick={() => {
                  setSearch(false);
                  setIsAddText(false);
                  setIsAddImage(false);
                  setIsAddAudio(true);
                }}
              >
                Type Audio
              </button>
            </div>
          </div>
        </div>

        {search &&
          allProblems.map((problem) => (
            <div key={problem["_id"].toString()}>
              <h4>Id</h4>
              <p>{problem["_id"].toString()}</p>
              <h4>Type</h4>
              <p>{problem.type}</p>
              <h4>Question</h4>
              <p>{problem.description}</p>
              <h4>Choice</h4>
              <ol type="A">
                {problem.choice.map((choice, index) => (
                  <>
                    <li key={index}>{choice}</li>
                  </>
                ))}
              </ol>
              <h4>Key</h4>
              {problem.key}
              <button>Edit Problem</button>
              <button>Delete Problem</button>
            </div>
          ))}
        {isAddText && (
          <div>
            <h3>Add Problem Type Text</h3>
            <form onSubmit={addProblemHandler}>
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
                <textarea
                  name="choice-1"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                B{" "}
                <textarea
                  name="choice-2"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                C{" "}
                <textarea
                  name="choice-3"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                D{" "}
                <textarea
                  name="choice-4"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                E{" "}
                <textarea
                  name="choice-5"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
              </div>
              <p>Right Answer</p>
              <div className={styles.keys}>
                <input
                  type="radio"
                  id="answer-type1"
                  name="key"
                  value="A"
                  required
                />
                <label htmlFor="answer-type1">A</label>

                <input
                  type="radio"
                  id="answer-type2"
                  name="key"
                  value="B"
                  required
                />
                <label htmlFor="answer-type2">B</label>

                <input
                  type="radio"
                  id="answer-type3"
                  name="key"
                  value="C"
                  required
                />
                <label htmlFor="answer-type3">C</label>

                <input
                  type="radio"
                  id="answer-type4"
                  name="key"
                  value="D"
                  required
                />
                <label htmlFor="answer-type4">D</label>

                <input
                  type="radio"
                  id="answer-type5"
                  name="key"
                  value="E"
                  required
                />
                <label htmlFor="answer-type5">E</label>
              </div>
              <br />
              <p>Question Category</p>
              <p>
                <input
                  type="radio"
                  id="problem-type1"
                  name="type"
                  value="reading"
                  required
                />
                <label htmlFor="problem-type1">Reading</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="problem-type2"
                  name="type"
                  value="structure"
                  required
                />
                <label htmlFor="problem-type2">Structure</label>
              </p>
              <br />
              <button type="submit">Add Problem</button>
            </form>
          </div>
        )}
        {isAddImage && (
          <div>
            <h3>Add Problem Type Image</h3>
            <form onSubmit={addProblemHandler}>
              <p>Input Image</p>
              <input type="file" onChange={fileChangedHandler} required accept=".jpg, .png, .jpeg"/>
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
                <textarea
                  name="choice-1"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                B{" "}
                <textarea
                  name="choice-2"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                C{" "}
                <textarea
                  name="choice-3"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                D{" "}
                <textarea
                  name="choice-4"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                E{" "}
                <textarea
                  name="choice-5"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
              </div>
              <p>Right Answer</p>
              <div className={styles.keys}>
                <input
                  type="radio"
                  id="answer-type1"
                  name="key"
                  value="A"
                  required
                />
                <label htmlFor="answer-type1">A</label>

                <input
                  type="radio"
                  id="answer-type2"
                  name="key"
                  value="B"
                  required
                />
                <label htmlFor="answer-type2">B</label>

                <input
                  type="radio"
                  id="answer-type3"
                  name="key"
                  value="C"
                  required
                />
                <label htmlFor="answer-type3">C</label>

                <input
                  type="radio"
                  id="answer-type4"
                  name="key"
                  value="D"
                  required
                />
                <label htmlFor="answer-type4">D</label>

                <input
                  type="radio"
                  id="answer-type5"
                  name="key"
                  value="E"
                  required
                />
                <label htmlFor="answer-type5">E</label>
              </div>
              <br />
              <p>Question Category</p>
              <p>
                <input
                  type="radio"
                  id="problem-type1"
                  name="type"
                  value="reading"
                  required
                />
                <label htmlFor="problem-type1">Reading</label>
              </p>
              <p>
                <input
                  type="radio"
                  id="problem-type2"
                  name="type"
                  value="structure"
                  required
                />
                <label htmlFor="problem-type2">Structure</label>
              </p>
              <br />
              <button type="submit">Add Problem</button>
            </form>
          </div>
        )}
        {isAddAudio && (
          <div>
            <h3>Add Problem Type Audio</h3>
            <form onSubmit={addProblemHandler}>
              <p>Input Audio</p>
              <input type="file" onChange={fileChangedHandler} required accept=".mp3"/>
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
                <textarea
                  name="choice-1"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                B{" "}
                <textarea
                  name="choice-2"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                C{" "}
                <textarea
                  name="choice-3"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                D{" "}
                <textarea
                  name="choice-4"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
                E{" "}
                <textarea
                  name="choice-5"
                  id=""
                  cols="60"
                  rows="2"
                  required
                ></textarea>
              </div>
              <div className={styles.keys}>
                <input
                  type="radio"
                  id="answer-type1"
                  name="key"
                  value="A"
                  required
                />
                <label htmlFor="answer-type1">A</label>

                <input
                  type="radio"
                  id="answer-type2"
                  name="key"
                  value="B"
                  required
                />
                <label htmlFor="answer-type2">B</label>

                <input
                  type="radio"
                  id="answer-type3"
                  name="key"
                  value="C"
                  required
                />
                <label htmlFor="answer-type3">C</label>

                <input
                  type="radio"
                  id="answer-type4"
                  name="key"
                  value="D"
                  required
                />
                <label htmlFor="answer-type4">D</label>

                <input
                  type="radio"
                  id="answer-type5"
                  name="key"
                  value="E"
                  required
                />
                <label htmlFor="answer-type5">E</label>
              </div>
              <br />
              <input type="hidden" name="type" value="listening" />
              <button type="submit">Add Problem</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Problems;
