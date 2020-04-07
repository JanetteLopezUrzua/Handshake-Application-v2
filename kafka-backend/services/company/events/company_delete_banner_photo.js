const Event = require("../../../models/Event/Events");

async function handle_request(msg, callback) {
  console.log("Inside company_delete_banner_photo kafka backend");
  console.log(msg);

  let eventid = msg;

  try {
    console.log(eventid);
    let event = await Event.findByIdAndUpdate(
      eventid,
      { bannerphoto: "" },
      { new: true }
    )
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
