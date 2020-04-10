const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

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
RSVPSchema.plugin(mongoosePaginate);
module.exports = RSVP = mongoose.model("RSVP", RSVPSchema);
