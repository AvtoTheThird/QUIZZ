import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function JoinRoom() {
  const history = useNavigate();
  const location = useLocation();
  const roomID = location.state.id;
  const [loaded, setLoaded] = useState(false);
  const [roomQuestions, setRoomQuestions] = useState();
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);

  const [style, setStyle] = useState("");
  const userid = location.state.userId;

  // loaded? arr = new Array(roomQuestions[0].questions.length):
  useEffect(() => {
    const joinId = location.state.id;
    Axios.post("http://localhost:3001/getQuestions", {
      joinId,
    }).then((res) => {
      setRoomQuestions(res.data);
      setLoaded(true);
    });
  }, []);
  // console.log(roomQuestions[0].questions[0].answers.length);

  // useEffect(() => {
  //   const corrans = [];
  //   for (let i = 0; i < roomQuestions[0].questions.length; i++) {
  //     for (let j = 0; roomQuestions[0].questions[i].answers.length; j++) {}
  //   }
  // }, []);

  const handleAnswers = (j, i) => {
    setAnswers((prevArr) => {
      prevArr[i] = j;
      return prevArr;
    });
    console.log(answers);

    setStyle("choosen");
  };
  const results = () => {
    let x = 0;
    roomQuestions[0].questions.map((val, i) => {
      {
        roomQuestions[0].questions[i].answers.map((val1, j) => {
          // console.log(val1);
          if (val1.tru && answers[i] == j) {
            x++;
          }
        });
      }
    });
    console.log(x);
    const id = roomQuestions[1]._id;
    Axios.post("http://localhost:3001/takenQuizz", {
      id: id,
      choosenAnswers: answers,
      roomid: roomID,
      score: x,
    }).then(
      history("/Results", {
        state: {
          answers: answers,
          roomID: roomID,
          roomQuestions: roomQuestions,
          id: userid,
        },
      })
    );
  };
  console.log(userid);
  const goToAcc = () => {
    history("/Acc", { state: { id: userid } });
  };

  if (loaded) {
    return (
      <div>
        <button onClick={goToAcc}>
          <a href="/Acc">acc</a>
        </button>
        room joined: {roomID}
        <div>
          <h4>room owner:{roomQuestions[1].email}</h4>
          <h3>questions: </h3>
          {roomQuestions[0].questions.map((val, i) => (
            <div className="join-room" key={val._id}>
              <h2 key={val._id}>{val.question}: </h2>
              {roomQuestions[0].questions[i].answers.map((val1, j) => (
                <div className="questions">
                  <p>{val1.text}</p>
                  <input
                    type="checkbox"
                    onChange={handleAnswers.bind(this, j, i)}
                  />{" "}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={results}>submit</button>
        {/* {roomQuestions[0].questions.map((val, i) => {
          {
            roomQuestions[0].questions[i].answers.map((val1, j) => {
              // console.log(val1);
              if (val1.tru && answers[i] == j) {
                return func();
              }
            });
          }
        })} */}
      </div>
    );
  } else {
    return <h1>LOADING</h1>;
  }
}
