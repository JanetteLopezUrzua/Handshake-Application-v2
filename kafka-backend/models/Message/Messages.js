const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema(
  {
    fromid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "onModel",
    },
    onModel: {
      type: String,
      required: true,
      enum: ["companies", "students"],
    },
    toid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "students",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      required: true,
    },
    messagemonth: {
      type: Number,
      required: true,
    },
    messageday: {
      type: Number,
      required: true,
    },
    messageyear: {
      type: Number,
      required: true,
    },
    messagehour: {
      type: Number,
      required: true,
    },
    messageminute: {
      type: Number,
      required: true,
    },
    messagedaytime: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
module.exports = Messages = mongoose.model("Messages", MessagesSchema);
