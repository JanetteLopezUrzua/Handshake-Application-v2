const Event = require("../../../models/Event/Events");

async function handle_request(msg, callback) {
  console.log("Inside company_update_event_info kafka backend");
  console.log(msg);

  let {
    event_id,
    title,
    dayofweek,
    month,
    day,
    year,
    starttime,
    startdaytime,
    endtime,
    enddaytime,
    timezone,
    location,
    eligibility,
  } = msg;

  try {
    data = {
      title,
      dayofweek,
      month,
      day,
      year,
      starttime,
      startdaytime,
      endtime,
      enddaytime,
      timezone,
      location,
      eligibility,
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
