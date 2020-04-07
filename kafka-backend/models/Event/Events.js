const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const EventsSchema = new mongoose.Schema(
  {
    bannerphoto: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    dayofweek: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    starttime: {
      type: String,
      required: true,
    },
    startdaytime: {
      type: String,
      required: true,
    },
    endtime: {
      type: String,
      required: true,
    },
    enddaytime: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    eligibility: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
EventsSchema.plugin(mongoosePaginate);
module.exports = Events = mongoose.model("events", EventsSchema);
