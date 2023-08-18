const mongoose = require("mongoose");
const User = require("./User");
const roomSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  questions: [
    {
      question: {
        type: String,
      },

      answers: [
        {
          text: { type: String },
          tru: { type: Boolean },
        },
      ],
    },
  ],

  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      choosenAnswers: { type: Array },
      score: { type: Number },
    },
  ],
  numberOfAllowedAttempts: { type: Number },
  showCorrectAnsswersOnSubmit: { type: Boolean },
});

const roomModel = mongoose.model("Room", roomSchema);
module.exports = roomModel;
