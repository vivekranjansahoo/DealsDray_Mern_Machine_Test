const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: {
    type: String,
    default: "test",
  },

  mobno: String,
  designation: String,
  gender: String,
  course: String,
  image: String,
});

const Emp = mongoose.model("User", userSchema);

module.exports = Emp;
