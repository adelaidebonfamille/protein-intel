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
import { useEffect } from "react";

const Problems = () => {
  const baseUrl = "http://localhost:5000/api/admin/problems";

  const selectedFile = useRef(null);
  const fileChangedHandler = (e) => {
    selectedFile.current = e.target.files[0];
  };
  const fileCanceledHandler = (e) => {
    selectedFile.current = null;
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
        setAllProblems(response.data.problems);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [problemShown, setProblemShown] = useState([]);

  const [categoryShown, setCategoryShown] = useState("");
  const [order, setOrder] = useState(false);
  useEffect(() => {
    let selectedProblem =
      categoryShown == ""
        ? allProblems
        : allProblems.filter((problem) => problem.type === categoryShown);

    if (order) {
      selectedProblem = selectedProblem.slice().reverse();
    }

    setProblemShown(selectedProblem);
  }, [categoryShown, order, allProblems]);

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
    selectedProblem.current = { ...e.target.dataset };
    setMode("update");
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
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [mode, setMode] = useState("");
  useEffect(() => {
    selectedFile.current = null;
    setCategoryShown("");
    setOrder(false);
  }, [mode]);

  return (
    <>
      <Link to="/admin">
        <div className={styles["go-back-home"]}>Go back to Admin Homepage</div>
      </Link>
      <div className={styles.container}>
        <div className={styles["input-container"]}>
          <div className={styles["show-problem-container"]}>
            <h3>Search Problems</h3>
            {mode === "search" ? (
              <>
                <div>
                  <button onClick={showAllProblemHandler}>
                    Reload Show Problem
                  </button>
                </div>

                <p>Problem Category</p>
                <input
                  type="radio"
                  id="category-search-0"
                  name="category-search"
                  required
                  defaultChecked
                  onChange={() => {
                    setCategoryShown("");
                  }}
                />
                <label htmlFor="category-search-0">All Category</label>
                <input
                  type="radio"
                  id="category-search-1"
                  name="category-search"
                  required
                  onChange={() => {
                    setCategoryShown("reading");
                  }}
                />
                <label htmlFor="category-search-1">Reading</label>
                <input
                  type="radio"
                  id="category-search-2"
                  name="category-search"
                  required
                  onChange={() => {
                    setCategoryShown("structure");
                  }}
                />
                <label htmlFor="category-search-2">Structure</label>
                <input
                  type="radio"
                  id="category-search-3"
                  name="category-search"
                  required
                  onChange={() => {
                    setCategoryShown("listening");
                  }}
                />
                <label htmlFor="category-search-3">Listening</label>
                <p>Show Order</p>
                <input
                  type="radio"
                  id="order-1"
                  name="order"
                  required
                  defaultChecked
                  onChange={() => {
                    setOrder(false);
                  }}
                />
                <label htmlFor="order-1">Oldest to Newest</label>
                <input
                  type="radio"
                  id="order-2"
                  name="order"
                  required
                  onChange={() => {
                    setOrder(true);
                  }}
                />
                <label htmlFor="order-2">Newest to Oldest</label>
              </>
            ) : (
              <button
                onClick={() => {
                  setMode("search");
                  showAllProblemHandler();
                }}
              >
                Show Problem
              </button>
            )}
          </div>

          <div className={styles["add-problems"]}>
            <h3>Add Problems</h3>
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  setMode("text");
                }}
              >
                Type Text
              </button>
              <button
                onClick={() => {
                  setMode("image");
                }}
              >
                Type Image
              </button>
              <button
                onClick={() => {
                  setMode("audio");
                }}
              >
                Type Audio
              </button>
            </div>
          </div>
        </div>
        {mode === "search" &&
          problemShown.map((problem) => (
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
        {mode === "update" && (
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
        {mode === "text" && (
          <div>
            <h3>Add Problem Type Text</h3>
            <TextInputForm handler={addProblemHandler}>
              <CategoryInput categories={["Reading", "Structure"]} />
            </TextInputForm>
          </div>
        )}
        {mode === "image" && (
          <div>
            <h3>Add Problem Type Image</h3>
            <TextInputForm handler={addProblemHandler}>
              <CategoryInput categories={["Reading", "Structure"]} />
              <ImageInput fileChangeHandler={fileChangedHandler} />
            </TextInputForm>
          </div>
        )}
        {mode === "audio" && (
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
