const Event = require("../../../models/Event/Events");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_delete_event kafka backend");
  console.log(msg);

  let eventid = msg;

  try {
    console.log(eventid);
    let event = await Event.deleteOne({
      _id: mongoose.Types.ObjectId(eventid),
    });

    callback(null, event);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
