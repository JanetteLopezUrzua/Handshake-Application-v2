const Message = require("../../../models/Message/Messages");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside student_messages_list kafka backend");
  console.log(msg);

  let { toid } = msg;
  console.log;
  try {
    let messagesList = await Message.find({
      toid: new mongoose.Types.ObjectId(toid),
    })
      .select("-password")
      .populate(["fromid", "toid"])
      .sort({
        "messages.messageyear": "desc",
        "messages.messagemonth": "desc",
        "messages.messageday": "desc",
        "messages.messagedaytime": "desc",
        "messages.messagehour": "desc",
        "messages.messageminute": "desc",
      });
    console.log(messagesList);
    callback(null, messagesList);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
