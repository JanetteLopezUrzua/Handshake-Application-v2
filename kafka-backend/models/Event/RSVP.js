const mongoose = require("mongoose");

const RSVPSchema = new mongoose.Schema(
  {
    companyid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
    eventid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    rsvpstudentsid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
module.exports = RSVP = mongoose.model("RSVP", RSVPSchema);
