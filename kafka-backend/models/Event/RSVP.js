const mongoose = require("mongoose");

const RSVPSchema = new mongoose.Schema(
  {
    eventid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
      required: true,
    },
    studentid: {
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
