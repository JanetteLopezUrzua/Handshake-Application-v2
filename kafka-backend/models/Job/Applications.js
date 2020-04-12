const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const ApplicationsSchema = new mongoose.Schema(
  {
    jobid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    studentid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    appmonth: {
      type: Number,
      required: true,
    },
    appday: {
      type: Number,
      required: true,
    },
    appyear: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
ApplicationsSchema.plugin(mongoosePaginate);
module.exports = Applications = mongoose.model(
  "Applications",
  ApplicationsSchema
);
