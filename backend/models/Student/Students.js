const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema(
  {
    name: {
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
    }
  },
  {
    versionKey: false
  }
);

module.exports = Students = mongoose.model("students", StudentsSchema);
