const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    college_name: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    photo: {
      type: String,
      required: false
    },
    objective: {
      type: String,
      required: false
    },
    phonenumber: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false
  }
);

module.exports = Students = mongoose.model("students", StudentsSchema);
