const Event = require("../../../models/Event/Events");

async function handle_request(msg, callback) {
  console.log("Inside company_update_event_description kafka backend");
  console.log(msg);

  let { event_id, description } = msg;

  try {
    data = {
      description,
    };
    console.log(event_id);
    let event = await Event.findByIdAndUpdate(event_id, data, { new: true })
      .populate("companyid")
      .exec();

    callback(null, event);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
