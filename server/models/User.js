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
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
