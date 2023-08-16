import React from "react";

export default function Home() {
  return (
    <div className="home">
      {" "}
      <h1>WELLCOME</h1>
      <div className="register-login">
        {" "}
        <a className="button-27" href="/Register">
          Register
        </a>
        <p>or</p>{" "}
        <a className="button-27" href="/Login">
          Login
        </a>
      </div>
    </div>
  );
}
