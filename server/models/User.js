const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  passwrord: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  // takenRoom: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Room",
  //   choosenAnswers: [{ type: Number }],
  // },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
