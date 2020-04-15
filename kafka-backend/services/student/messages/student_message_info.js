const Message = require("../../../models/Message/Messages");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside student_message_info kafka backend");
  console.log(msg);

  let { fromid, currid } = msg;
  console.log;
  try {
    let messagesList1 = await Message.find({
      fromid: new mongoose.Types.ObjectId(fromid),
      toid: new mongoose.Types.ObjectId(currid),
    });

    let messagesList2 = await Message.find({
      fromid: new mongoose.Types.ObjectId(currid),
      toid: new mongoose.Types.ObjectId(fromid),
    });

    let l1 = "";
    let l2 = "";

    if (messagesList1[0]) l1 = messagesList1[0]._id;
    if (messagesList2[0]) l2 = messagesList2[0]._id;

    console.log("m1", messagesList1);
    console.log("m2", messagesList2);

    console.log("m1", l1);
    console.log("m2", l2);

    let ml = await Message.aggregate([
      { $match: { _id: { $in: [l1, l2] } } },
      { $unwind: "$messages" },
      {
        $sort: {
          "messages.messageyear": -1,
          "messages.messagemonth": -1,
          "messages.messageday": -1,
          "messages.messagedaytime": -1,
          "messages.messagehour": -1,
          "messages.messageminute": -1,
        },
      },
    ]);

    let messagesList = await Message.populate(ml, {
      path: "fromid",
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
