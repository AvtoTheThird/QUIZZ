import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import icon from "../img/checkmark.png";
export default function Results() {
  const history = useNavigate();
  const location = useLocation();
  const roomID = location.state.roomID;
  const roomQuestions = location.state.roomQuestions;
  const answers = location.state.answers;
  const userid = location.state.id;
  const [score, setScore] = useState(0);
  const goToAcc = () => {
    history("/Acc", { state: { id: userid } });
  };

  let x = 0;
  useEffect(() => {
    setScore(x);
  }, [x]);
  console.log();

  const func = () => {
    x++;
  };

  return (
    <div>
      {roomQuestions[0].showCorrectAnsswersOnSubmit ? (
        <div>
          {" "}
          <button onClick={goToAcc}>
            <a href="/Acc">acc</a>
          </button>
          <h1>Results</h1>
          <h3>roomid: {roomID}</h3>
          {roomQuestions[0].questions.map((val, i) => {
            return (
              <div className="results">
                <h2>{val.question}</h2>
                {roomQuestions[0].questions[i].answers.map((val1, j) => {
                  // console.log(val1);
                  if (val1.tru && answers[i] == j) {
                    return (
                      func(),
                      (
                        <div className="correct">
                          <p>
                            {val1.text} <img src={icon} alt="" />
                          </p>
                        </div>
                      )
                    );
                  } else if (!val1.tru && answers[i] == j) {
                    return (
                      <div>
                        <p className="incorrect">{val1.text}</p>
                      </div>
                    );
                  } else if (val1.tru) {
                    return (
                      <div className="correct">
                        <p>
                          {val1.text} <img src={icon} alt="" />
                        </p>
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <p className="grey">{val1.text}</p>
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>
            room creator has turned off the ability to see correct answers
          </h1>

          <h2>
            your score is:{x}/{roomQuestions[0].questions.length}
          </h2>
          <button onClick={goToAcc}>
            <a href="/Acc">Go back</a>
          </button>
        </div>
      )}
    </div>
  );
}
