import styles from "./Problems.module.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Problems = () => {
  const [search, setSearch] = useState(false);

  const [isAddText, setIsAddText] = useState(false);
  const [isAddImage, setIsAddImage] = useState(false);
  const [isAddAudio, setIsAddAudio] = useState(false);

  const searchHandler = async (e) => {
    e.preventDefault();

    if ( e.target.searchId.value === "" ) {
      await axios.get("http://localhost:5000/api/admin/problems", {
            headers: {
                "auth-token": localStorage.getItem("token")
            }
        })
        .then((response)=> {
            setSearch(true);
            setIsAddText(false);
            setIsAddImage(false);
            setIsAddAudio(false);

            console.log(response)
        })
        .catch((error)=> {
            console.log(error)
        })
    } else {
        
    }
  };

  const addProblemHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/admin/problems", {
        description: e.target.description.value,
        key: e.target.key.value,
        type: e.target.type.value,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <Link to='/admin'><div className={ styles[ "go-back-home" ] }>Go back to Admin Homepage</div></Link>
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
      {search && (
          <div>

          </div>
      )}
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
                name="key1"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              B{" "}
              <textarea
                name="key2"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              C{" "}
              <textarea
                name="key3"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              D{" "}
              <textarea
                name="key4"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              E{" "}
              <textarea
                name="key5"
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
            <input type="file" required />
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
                name="key1"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              B{" "}
              <textarea
                name="key2"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              C{" "}
              <textarea
                name="key3"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              D{" "}
              <textarea
                name="key4"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              E{" "}
              <textarea
                name="key5"
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
            <input type="file" required />
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
                name="key1"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              B{" "}
              <textarea
                name="key2"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              C{" "}
              <textarea
                name="key3"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              D{" "}
              <textarea
                name="key4"
                id=""
                cols="60"
                rows="2"
                required
              ></textarea>
              E{" "}
              <textarea
                name="key5"
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
