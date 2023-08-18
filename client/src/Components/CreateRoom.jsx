import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";

export default function CreateRoom() {
  const history = useNavigate();

  const location = useLocation();
  const [roomName, setRoomName] = useState("");
  const [userID, setUserID] = useState("");
  const [NOAA, setNOAA] = useState(1);
  const [SCAOS, setSCAOS] = useState(false);
  const [data, setData] = useState([
    {
      question: "",
      answers: [
        {
          text: "",
          tru: false,
        },
        {
          text: "",
          tru: false,
        },
      ],
    },
  ]);
  const id = location.state.id;
  const addQuestion = () => {
    setData([
      ...data,
      {
        question: "",
        answers: [
          {
            text: "",
            tru: false,
          },
          {
            text: "",
            tru: false,
          },
        ],
      },
    ]);
  };
  const userid = location.state.id;

  useEffect(() => {
    const email = location.state.id;
    Axios.post("http://localhost:3001/getUserId", {
      email,
    }).then((res) => {
      setUserID(res.data);
    });
  }, []);

  const addAnswer = (i) => {
    var test = [...data];

    test[i].answers.push({
      text: "",
      tru: false,
    });

    setData(test);
  };
  const handleQuestionChange = (e, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...data];
    onchangeVal[i][name] = value;
    setData(onchangeVal);
  };
  const handleAnswerChange = (e, j, i) => {
    const { name, value } = e.target;
    const onchangeVal = [...data];
    onchangeVal[i][name][j].text = value;

    setData(onchangeVal);
  };
  const deleteQuestion = (i) => {
    const deleteVal = [...data];
    deleteVal.splice(i, 1);
    setData(deleteVal);
  };
  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleNOAAchange = (e) => {
    setNOAA(e.target.value);
  };
  const sendData = () => {
    Axios.post("http://localhost:3001/createRoom", {
      numberOfAllowedAttempts: NOAA,
      SCAOS: SCAOS,
      owner: userID,
      name: roomName,
      questions: data,
    }).then((res) => {
      if (res.data == true) {
        history("/Acc", { state: { id: location.state.id } });
      }
    });
  };
  const markTrueAns = (i, j) => {
    var test = [...data];
    test[i].answers[j].tru = !test[i].answers[j].tru;
    setData(test);
  };
  const deleteAnswer = (i) => {
    var test = [...data];

    test[i].answers.pop();

    setData(test);
  };
  const goToAcc = () => {
    history("/Acc", { state: { id: userid } });
  };
  const handleSCAOSchange = () => {
    setSCAOS(!SCAOS);
  };
  return (
    <div className="create-a-room">
      <a onClick={goToAcc} href="/Acc">
        go back
      </a>
      <h1>lets create room </h1>

      <input
        type="text"
        placeholder="roomName"
        name="roomName"
        value={roomName}
        onChange={(e) => handleRoomNameChange(e)}
      />
      <p>
        number of attempts allowed{" "}
        <input
          type="number"
          name="NOAA"
          value={NOAA}
          onChange={(e) => handleNOAAchange(e)}
        />
        show corrent answers on submit{" "}
        <input type="checkbox" onChange={handleSCAOSchange} />
      </p>
      <button className="submit-button" onClick={addQuestion}>
        Add question
      </button>
      {data.map((val, i) => (
        <div className="question-box">
          <p>question {i + 1}</p>
          <input
            type="text"
            placeholder="question"
            name="question"
            value={val.question}
            onChange={(e) => handleQuestionChange(e, i)}
          />{" "}
          <div key={i}>
            <p>multiple asnwers</p>
            {data[i].answers.map((val, j) => (
              <div key={j} className="quest">
                <input
                  type="text"
                  placeholder="answer"
                  name="answers"
                  value={val[j]}
                  onChange={(e) => handleAnswerChange(e, j, i)}
                />
                <input
                  type="checkbox"
                  name=""
                  id=""
                  onChange={() => markTrueAns(i, j)}
                />
              </div>
            ))}
          </div>
          {data[i].answers.length > 2 ? (
            <button onClick={() => deleteAnswer(i)}>remove answer</button>
          ) : null}
          <button onClick={() => addAnswer(i)}>Add answer</button>
          <button onClick={() => deleteQuestion(i)}>Delete question</button>
        </div>
      ))}
      <button onClick={sendData}>submit</button>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}
