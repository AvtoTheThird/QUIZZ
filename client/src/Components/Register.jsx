import React from "react";
import { useState } from "react";
import Axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passwrord, setPasswrord] = useState("");

  const sendData = () => {
    Axios.post("http://localhost:3001/RegisterUser", {
      email,
      passwrord,
      name,
    }).then(console.log("suc"));
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <input
        placeholder="name"
        type="text"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <input
        placeholder="email"
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <input
        placeholder="password"
        type="text"
        onChange={(event) => {
          setPasswrord(event.target.value);
        }}
      />
      <input className="submit-button" type="submit" onClick={sendData} />
      <p>
        Already a member? Login <a href="/Login">HERE</a>
      </p>
    </div>
  );
}

export default Register;
