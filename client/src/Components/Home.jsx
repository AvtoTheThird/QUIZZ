import React from "react";

export default function Home() {
  return (
    <div className="home">
      <div className="corner-text">
        <h2>test account credentials in case registration doesn't work:</h2>
        <h3>username: test</h3>
        <h3>password: test</h3>
      </div>
      <div className="description">
        <h1>welcome to quiz genius</h1>
        <h3>crate, share and take quizes in one place easyly</h3>
        <div className="register-login">
          <a className="button-27" href="/Register">
            Register
          </a>
          <br />
          <br />
          <h3>or</h3>
          <br />
          <br />
          <a className="button-27" href="/Login">
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
