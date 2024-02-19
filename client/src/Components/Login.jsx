import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwrord, setPasswrord] = useState("");
  const history = useNavigate();

  async function submit(e) {
    e.preventDefault();

    try {
      await Axios.post("https://avtos-quizz-app.onrender.com/loginUser", {
        email,
        passwrord,
      })
        .then((res) => {
          if (res.data == 1) {
            history("/Acc", { state: { id: email } });
          } else if (res.data == 0) {
            alert("wrong password");
          } else {
            alert("wrong details");
          }
        })
        .catch((e) => {
          alert("wrong details");
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }
  //   console.log(email);
  return (
    <div className="login">
      <h1>Login to your account</h1>
      <p>username/email</p>
      <input
        placeholder="mail"
        type="text"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />{" "}
      <p>passwprd</p>
      <input
        placeholder="password"
        type="password"
        onChange={(event) => {
          setPasswrord(event.target.value);
        }}
      />{" "}
      <button className="submit-button" onClick={submit}>
        Login
      </button>
      <p>
        Not a member yet? register <a href="/Register">Here</a>
      </p>
    </div>
  );
}
