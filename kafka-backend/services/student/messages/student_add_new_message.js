const Message = require("../../../models/Message/Messages");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside student_add_new_message kafka backend");
  console.log(msg);

  const {
    from_type,
    from_id,
    to_type,
    to_id,
    message,
    read,
    message_month,
    message_day,
    message_year,
    message_hour,
    message_minute,
    message_day_time,
  } = msg;

  try {
    //Check if email conversation exists
    let m = await Message.findOne({
      fromid: new mongoose.Types.ObjectId(from_id),
      onModel1: from_type,
      toid: new mongoose.Types.ObjectId(to_id),
      onModel2: to_type,
    });

    if (m) {
      let data = {
        message,
        read,
        messagemonth: message_month,
        messageday: message_day,
        messageyear: message_year,
        messagehour: message_hour,
        messageminute: message_minute,
        messagedaytime: message_day_time,
      };
      m = await Message.findOneAndUpdate(
        {
          fromid: new mongoose.Types.ObjectId(from_id),
          onModel1: from_type,
          toid: new mongoose.Types.ObjectId(to_id),
          onModel2: to_type,
        },
        { $push: { messages: data } },
        { new: true }
      );
    } else {
      m = await Message.create({
        fromid: new mongoose.Types.ObjectId(from_id),
        onModel1: from_type,
        toid: new mongoose.Types.ObjectId(to_id),
        onModel2: to_type,
        messages: {
          message,
          read,
          messagemonth: message_month,
          messageday: message_day,
          messageyear: message_year,
          messagehour: message_hour,
          messageminute: message_minute,
          messagedaytime: message_day_time,
        },
      });
    }

    callback(null, m);
  } catch (err) {
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
