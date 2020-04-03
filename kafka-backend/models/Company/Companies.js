const mongoose = require("mongoose");

const CompaniesSchema = new mongoose.Schema(
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
    location: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    phonenumber: {
      type: String,
      required: false
    },
    photo: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false
  }
);

module.exports = Companies = mongoose.model("companies", CompaniesSchema);
