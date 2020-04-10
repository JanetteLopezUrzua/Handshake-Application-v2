const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const JobsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    deadlinemonth: {
      type: Number,
      required: true,
    },
    deadlineday: {
      type: Number,
      required: true,
    },
    deadlineyear: {
      type: Number,
      required: true,
    },
    deadlinetime: {
      type: String,
      required: true,
    },
    deadlinedaytime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    salarytime: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    postingmonth: {
      type: Number,
      required: true,
    },
    postingday: {
      type: Number,
      required: true,
    },
    postingyear: {
      type: Number,
      required: true,
    },
    companyid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
JobsSchema.plugin(mongoosePaginate);
module.exports = Jobs = mongoose.model("jobs", JobsSchema);
