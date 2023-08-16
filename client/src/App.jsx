import { useState } from "react";
import "./App.css";
import Axios from "axios";
import Register from "./Components/Register";
import Home from "./Components/Home";
import CreateRoom from "./Components/CreateRoom";
import Login from "./Components/Login";
import Navbar from "./Components/nav";
import Acc from "./Components/Acc";
import JoinRoom from "./Components/JoinRoom";
import Results from "./Components/Results";
import RoomOverview from "./Components/RoomOverview";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Acc" element={<Acc />} />
        <Route path="/JoinRoom" element={<JoinRoom />} />
        <Route path="/Results" element={<Results />} />
        <Route path="/RoomOverview" element={<RoomOverview />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/CreateRoom" element={<CreateRoom />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
