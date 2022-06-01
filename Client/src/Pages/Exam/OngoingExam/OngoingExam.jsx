import styles from "./OngoingExam.module.css";
import { useLocation } from "react-router-dom";

const OngoingExam = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      {location.state.testGroup != undefined ? (
        <>
          <div className="title">
            <div className="title-text">
              <h1>
                PROTEIN 2022 - {location.state.testGroup.toUpperCase()} SECTION
              </h1>
            </div>
          </div>
          <div className="radio-section">
            <div className="text">
              1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos,
              incidunt? A aliquam harum dignissimos ipsum expedita ut rerum
              omnis alias velit repudiandae. Suscipit explicabo repudiandae
              tempore, sequi doloremque commodi? Eveniet fugit iste alias,
              incidunt ea nesciunt ipsa aliquid repellendus tenetur unde ipsam
              natus iure, cupiditate vel ut nisi! Iusto eligendi culpa officiis
              eveniet optio saepe provident vel. Ea quae commodi corporis quas
              aut distinctio tenetur, temporibus porro quam. Quia possimus optio
              consequuntur ad enim dolore iusto magnam dolor, officiis
              reprehenderit fugit unde molestias! Et dolores commodi accusantium
              odit pariatur quae nobis, itaque consectetur iure, explicabo nihil
              sed eveniet laboriosam! Dolore?
            </div>
            <div className="radio-list">
              <div className="radio-item">
                <input type="radio" name="radio" id="radio1" />
                <label htmlFor="radio1">A. Ayam</label>
              </div>
              <div className="radio-item">
                <input type="radio" name="radio" id="radio2" />
                <label htmlFor="radio2">B. Babi</label>
              </div>
              <div className="radio-item">
                <input type="radio" name="radio" id="radio3" />
                <label htmlFor="radio3">C. Cicak</label>
              </div>
              <div className="radio-item">
                <input type="radio" name="radio" id="radio4" />
                <label htmlFor="radio4">D. Domba</label>
              </div>
              <div className="radio-item">
                <input type="radio" name="radio" id="radio5" />
                <label htmlFor="radio5">E. Elang</label>
              </div>
            </div>
          </div>
          <div className="end">
            <button className="end-button">End Section</button>
          </div>
        </>
      ) : (
        <div className={styles["error-container"]}>
          You are not in any ongoing exam, go back to exam page
        </div>
      )}
    </div>
  );
};

export default OngoingExam;
