const Event = require("../../../models/Event/Events");

async function handle_request(msg, callback) {
  console.log("Inside company_update_banner_photo kafka backend");
  console.log(msg);

  let { eventid, photo } = msg;

  try {
    data = {
      bannerphoto: photo,
    };
    console.log(eventid);
    let event = await Event.findByIdAndUpdate(eventid, data, { new: true })
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
