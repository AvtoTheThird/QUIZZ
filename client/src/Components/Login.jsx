import React from "react";
import { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [passwrord, setPasswrord] = useState("");
  const history = useNavigate();

  // const submit = () => {
  //   const history = useNavigate();

  //   Axios.post("http://localhost:3001/loginUser", {
  //     email,
  //     passwrord,
  //   }).then((response) => {
  //     console.log(response.data);
  //   });
  // };
  async function submit(e) {
    e.preventDefault();

    try {
      await Axios.post("http://localhost:3001/loginUser", {
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
      <input
        placeholder="mail"
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
      />{" "}
      <button className="submit-button" onClick={submit}>
        Login
      </button>
      {/* <input type="submit" onClick={submit} /> */}
      <p>
        Not a member yet? register <a href="/Register">Here</a>
      </p>
    </div>
  );
}