import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function Register() {
  const history = useNavigate();
  // const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwrord, setPasswrord] = useState("");

  const sendData = () => {
    Axios.post("https://avtos-quizz-app.onrender.com/RegisterUser", {
      email,
      passwrord,
      name,
    }).then((res) => {
      if (res.data == 1) {
        history("/Login", {});
      } else {
        allert("somethng went wrong");
      }
    });
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <p>username</p>
      <input
        placeholder="name"
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <p>email</p>
      <input
        placeholder="email"
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <p>password</p>
      <input
        placeholder="password"
        type="password"
        onChange={(event) => {
          setPasswrord(event.target.value);
        }}
      />

      <button className="submit-button" type="submit" onClick={sendData}>
        register
      </button>
      <p>
        Already a member? Login <a href="/Login">HERE</a>
      </p>
    </div>
  );
}

export default Register;
