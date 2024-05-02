const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  points:{
    type: Number,
    required: true
  }
});

const userList = new mongoose.model("user", UserSchema);

module.exports = userList;
