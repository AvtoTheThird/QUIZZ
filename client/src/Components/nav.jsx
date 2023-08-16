import React from "react";
import { Outlet, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <a href="/Register">Register</a>
      <a href="/createRoom">createRoom</a>
      <a href="/Login">Login</a>
      <a href="/Acc">acc</a>
    </nav>
  );
}

export default Navbar;
