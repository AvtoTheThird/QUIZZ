const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const roomModel = require("./models/Room");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://avtonariashvili:00JDJNLObR4ip2Up@cluster0.smskyry.mongodb.net/Quizz-app?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(cors());

app.post("/RegisterUser", async (req, res) => {
  console.log(req.body);
  const user = req.body;
  const newUser = await new UserModel(user);
  await newUser.save();
  res.json(newUser);
});

app.post("/createRoom", async (req, res) => {
  console.log(req.body);

  try {
    const room = req.body;
    const newRoom = await roomModel(room);
    await newRoom.save();
    res.json(true);
  } catch (err) {
    res.json(err);
  }
});

app.post("/loginUser", async (req, res) => {
  const email = req.body.email;
  const password = req.body.passwrord;
  if (await UserModel.findOne({ email: [email] })) {
    const response = await UserModel.findOne({ email: [email] });

    if (password == response.passwrord) {
      res.json(1);
    } else {
      res.json(0);
    }
  } else {
    res.json(-1);
  }
});

app.get("/getUsers", async (req, res) => {
  try {
    const response = await UserModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
app.post("/getUserId", async (req, res) => {
  const email = req.body.email;
  try {
    const foundUser = await UserModel.findOne({ email: [email] });

    const data = foundUser._id;
    console.log(data);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.post("/getUserRooms", async (req, res) => {
  try {
    const email = req.body.email;
    const foundUser = await UserModel.findOne({ email: [email] });
    const foundUserId = foundUser._id;
    const foundRoom = await roomModel.find({ owner: [foundUserId] });
    res.json(foundRoom);
  } catch (err) {
    res.json(err);
  }
});
app.post("/checkRoom", async (req, res) => {
  try {
    const roomId = req.body.joinId;

    if (await roomModel.findById(roomId)) {
      res.json(1);
    } else {
      res.json(0);
    }
  } catch (err) {
    res.json(err);
  }
});

app.post("/getQuestions", async (req, res) => {
  try {
    const data = [];
    const roomId = req.body.joinId;
    const roomData = await roomModel.findById(roomId);
    const ownerID = roomData.owner;
    const ownerdata = await UserModel.findById(ownerID);

    data.push(roomData);
    data.push(ownerdata);
    res.json(data);
  } catch (err) {
    res.json(err);
  }
});

app.delete("/deleteRoom/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await roomModel.findByIdAndRemove(id).exec();
    res.json(1);
  } catch (err) {
    console.log(err);
  }
});

app.post("/takenQuizz", async (req, res) => {
  console.log("takenQuizz START");
  const roomid = req.body.roomid;
  const userid = req.body.id;
  const choosenAnswers = req.body.choosenAnswers;
  const score = req.body.score;

  const usersSubdocument = {
    score: score,
    user: req.body.id,
    choosenAnswers: choosenAnswers,
  };

  try {
    const updatedRoom = await roomModel.findByIdAndUpdate(
      roomid,
      { $push: { users: usersSubdocument } },
      { new: true }
    );
    await updatedRoom.save();
    if (!updatedRoom) {
      console.log("Room not found");
      return;
    }

    console.log("Room updated with user and choosenAnswers:", updatedRoom);
  } catch (err) {
    // console.error("Error:", err);
  }
  console.log("takenQuizz STOP");
});

// app.post("/setScore", async (req, res) => {
//   console.log("setScore START");

//   const roomid = req.body.roomid;
//   const score = req.body.score;
//   const userid = req.body.userID;
//   console.log(req.body);
//   try {
//     const updatedRoom = await roomModel.findOneAndUpdate(
//       { _id: roomid, "users.user": userid },
//       { $set: { "users.$.score": score } },
//       { new: true, arrayFilters: [{ "elem.user": userid }] }
//     );

//     if (!updatedRoom) {
//       console.log("Room or user not found");
//       return;
//     }

//     console.log("Score set for user in the room");
//   } catch (err) {
//     console.error("Error:", err);
//   }
//   console.log("setScore STOP");
// });

app.listen(3001, () => {
  console.log("runing");
});
