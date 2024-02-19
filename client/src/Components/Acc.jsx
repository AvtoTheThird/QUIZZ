import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import DelIcon from "../img/del.webp";
import DetIcon from "../img/details.png";

export default function Acc() {
  const history = useNavigate();
  const location = useLocation();
  const [usersRooms, setUsersRooms] = useState([]);
  const [joinId, setJoinId] = useState("");
  const id = location.state.id;
  const goToCreateRoom = () => {
    history("/createRoom", { state: { id: id } });
  };
  // console.log(id);

  useEffect(() => {
    // console.log("asdasd");
    const email = location.state.id;
    Axios.post("https://avtos-quizz-app.onrender.com/getUserRooms", {
      email,
    }).then((res) => {
      setUsersRooms(res.data);
      // console.log(res.data);
    });
  }, []);
  // console.log(usersRooms);
  const joinRoom = () => {
    Axios.post("https://avtos-quizz-app.onrender.com/checkRoom", {
      joinId,
      id,
    }).then((res) => {
      console.log(res.data);
      if (res.data == 1) {
        history("/JoinRoom", { state: { id: joinId, userId: id } });
      } else if (res.data == 2) {
        alert("number Of Allowed Attempts exausted");
      } else {
        alert("wrong ID");
      }
    });
  };
  console.log(joinId, id);

  const goToDetails = (id, name) => {
    history("/RoomOverview", { state: { id: id, roomName: name } });
  };

  const deleteRoom = (id, name) => {
    console.log(id);
    Axios.delete(`https://avtos-quizz-app.onrender.com/deleteRoom/${id}`)
      .then((res) => {
        if (res.data == 1) {
          alert(`room ${name} has been deleted succesfully`);
        }
      })
      .then(
        setUsersRooms(
          usersRooms.filter((val) => {
            return val._id != id;
          })
        )
      );
  };
  return (
    <div>
      <div>
        <h3>test room id: 65d33c16a2e749be0836d6d8</h3>
      </div>{" "}
      <h1>hello {location.state.id}</h1>
      <div className="acc-info">
        {" "}
        <h1>your rooms</h1>
        {usersRooms.map((val) => (
          <h3 className="room-info" key={val._id}>
            {val.name}: {val._id}
            <button
              className="empty-button"
              onClick={() => deleteRoom(val._id, val.name)}
            >
              <img className="small-icons" src={DelIcon} alt="" />
            </button>
            <button
              className="empty-button"
              onClick={() => goToDetails(val._id, val.name)}
            >
              <img className="small-icons" src={DetIcon} alt="details" />
            </button>
          </h3>
        ))}
        <button onClick={goToCreateRoom} className="submit-button">
          create room
        </button>
      </div>
      <div className="spacer"></div>
      {/* <h1>64bf855b57c44b938a2a3dcd</h1> */}
      {/* <a href="/joinRoom">join a room</a> */}{" "}
      <div className="join-a-room">
        {" "}
        <h2>Join a room with ID</h2>
        <input
          placeholder="example: 64c63a2b6be010f297489850"
          type="text"
          value={joinId}
          onChange={(e) => {
            setJoinId(e.target.value);
          }}
        />
        <button className="submit-button" onClick={joinRoom}>
          join a room
        </button>
      </div>
    </div>
  );
}
