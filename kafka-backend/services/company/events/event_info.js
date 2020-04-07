const Event = require("../../../models/Event/Events");

async function handle_request(msg, callback) {
  console.log("Inside event_info kafka backend");
  console.log(msg);

  const eventid = msg;

  try {
    let event = await Event.findById(eventid).populate("companyid").exec();

    callback(null, event);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
