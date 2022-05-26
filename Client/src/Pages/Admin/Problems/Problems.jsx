import styles from "./Problems.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";

import TextInputForm from "./AddForm/TextInputForm";
import CategoryInput from "./AddForm/CategoryInput";
import ImageInput from "./ImageInput/ImageInput";
import AudioInput from "./AudioInput/AudioInput";
import UpdateTextForm from "./UpdateForm/UpdateTextForm";

const Problems = () => {
  const baseUrl = "http://localhost:5000/api/admin/problems";

  const [search, setSearch] = useState(false);
  const [isAddText, setIsAddText] = useState(false);
  const [isAddImage, setIsAddImage] = useState(false);
  const [isAddAudio, setIsAddAudio] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const selectedFile = useRef(null);
  const fileChangedHandler = (e) => {
    e.preventDefault();
    selectedFile.current = e.target.files[0];
    console.log(selectedFile.current);
  };
  const fileCanceledHandler = () => {
    selectedFile.current = null;
    console.log(selectedFile.current);
  };

  const [allProblems, setAllProblems] = useState([]);
  const showAllProblemHandler = async () => {
    await axios
      .get(baseUrl, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        allFalse();

        setAllProblems(response.data.problems);

        setSearch(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addProblemHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("description", e.target.description.value);
    formData.append("key", e.target.key.value);
    formData.append("type", e.target.type.value);

    for (let i = 1; i <= 5; i++) {
      formData.append("choice[]", e.target[`choice-${i}`].value);
    }

    if (selectedFile.current) {
      formData.append("problem", selectedFile.current);
    }

    axios
      .post(baseUrl, formData, {
        headers: {
          "content-type": "multipart/form-data",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProblemHandler = async (e) => {
    axios
      .delete(`${baseUrl}/${e.target.dataset.id}`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data.message);
        showAllProblemHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectedProblem = useRef({});
  const selectProblem = (e) => {
    allFalse();
    selectedProblem.current = { ...e.target.dataset };
    console.log(selectedProblem.current);
    setIsUpdate(true);
  };

  const updateProblemHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("description", e.target.description.value);
    formData.append("key", e.target.key.value);
    formData.append("type", e.target.type.value);

    for (let i = 1; i <= 5; i++) {
      formData.append("choice[]", e.target[`choice-${i}`].value);
    }

    if (selectedFile.current) {
      formData.append("problem", selectedFile.current);
    }

    //https://stackoverflow.com/a/54020234/13673444
    axios
      .patch(`${baseUrl}/${e.target.id.value}`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const allFalse = () => {
    setSearch(false);
    setIsAddText(false);
    setIsAddImage(false);
    setIsAddAudio(false);
    setIsUpdate(false);
  };

  return (
    <>
      <Link to="/admin">
        <div className={styles["go-back-home"]}>Go back to Admin Homepage</div>
      </Link>
      <div className={styles.container}>
        <div className={styles["input-container"]}>
          <div className={styles["show-problem-container"]}>
            <p>Search Problems</p>
            <input
              type="button"
              value="Show Problem"
              onClick={showAllProblemHandler}
            />
          </div>

          <div className={styles["add-problems"]}>
            Add Problems
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  allFalse();
                  setIsAddText(true);
                }}
              >
                Type Text
              </button>
              <button
                onClick={() => {
                  allFalse();
                  setIsAddImage(true);
                }}
              >
                Type Image
              </button>
              <button
                onClick={() => {
                  allFalse();
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
            <div className={styles.problem} key={problem["_id"]}>
              <h4>Id</h4>
              <p>{problem["_id"]}</p>
              <h4>Question Category</h4>
              <p>{problem.type}</p>
              {problem.associatedFile && (
                <>
                  <h4>File Used</h4>
                  {problem.type == "listening" ? (
                    <audio controls>
                      <source
                        src={`http://localhost:5000${problem.associatedFile}`}
                        type="audio/mpeg"
                      />
                    </audio>
                  ) : (
                    <img
                      className={styles["image-file"]}
                      src={`http://localhost:5000${problem.associatedFile}`}
                      alt="server failed to retrieve file"
                    />
                  )}
                </>
              )}
              <h4>Question</h4>
              <p>{problem.description}</p>
              <h4>Choice</h4>
              <ol type="A">
                {problem.choice.map((choice, index) => (
                  <li key={index}>{choice}</li>
                ))}
              </ol>
              <h4>Key</h4>
              {problem.key}
              <div>
                <input
                  type="button"
                  value="Edit Problem"
                  onClick={selectProblem}
                  data-id={problem["_id"]}
                  data-type={problem.type}
                  data-associated-file={problem.associatedFile}
                  data-description={problem.description}
                  data-choice-1={problem.choice[0]}
                  data-choice-2={problem.choice[1]}
                  data-choice-3={problem.choice[2]}
                  data-choice-4={problem.choice[3]}
                  data-choice-5={problem.choice[4]}
                  data-key={problem.key}
                />
                <input
                  type="button"
                  value="Delete Problem"
                  data-id={problem["_id"]}
                  onClick={deleteProblemHandler}
                />
              </div>
            </div>
          ))}
        {isUpdate && (
          <div>
            <h3>Update Problem</h3>
            <UpdateTextForm
              handler={updateProblemHandler}
              fileChangeHandler={fileChangedHandler}
              fileCancelHandler={fileCanceledHandler}
              problem={selectedProblem.current}
            />
          </div>
        )}
        {isAddText && (
          <div>
            <h3>Add Problem Type Text</h3>
            <TextInputForm handler={addProblemHandler}>
              <CategoryInput categories={["Reading", "Structure"]} />
            </TextInputForm>
          </div>
        )}
        {isAddImage && (
          <div>
            <h3>Add Problem Type Image</h3>
            <TextInputForm handler={addProblemHandler}>
              <CategoryInput categories={["Reading", "Structure"]} />
              <ImageInput fileChangeHandler={fileChangedHandler} />
            </TextInputForm>
          </div>
        )}
        {isAddAudio && (
          <div>
            <h3>Add Problem Type Audio</h3>
            <TextInputForm handler={addProblemHandler}>
              <input type="hidden" name="type" value="listening" />
              <AudioInput fileChangeHandler={fileChangedHandler} />
            </TextInputForm>
          </div>
        )}
      </div>
    </>
  );
};

export default Problems;
