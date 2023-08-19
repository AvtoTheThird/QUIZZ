import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
export default function RoomOverview() {
  const [roomQuestions, setRoomQuestions] = useState();
  const [loaded, setLoaded] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  // const id = location.state.id;
  const roomName = location.state.roomName;
  useEffect(() => {
    const joinId = location.state.id;
    Axios.post("http://localhost:3001/getQuestions", {
      joinId,
    }).then((res) => {
      setRoomQuestions(res.data);
      setLoaded(true);
    });
  }, []);
  // console.log(roomQuestions[0].questions.length);
  if (loaded) {
    return (
      <div>
        <h3>room has been taken by:</h3>
        <div>
          {roomQuestions[0].users.map((val, j) => {
            // console.log(val);

            return (
              <div className="results">
                <h4>
                  name: {val.username} score:{val.score}/
                  {roomQuestions[0].questions.length}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
