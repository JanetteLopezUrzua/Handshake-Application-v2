const Event = require("../../../models/Event/Events");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_add_new_event kafka backend");
  console.log(msg);

  let {
    company_id,
    bannerphoto,
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
    eligibilityoption,
    eligibility,
    description,
  } = msg;

  try {
    //Check if event exists
    let event = await Event.findOne({
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
      eligibilityoption,
      eligibility,
      description,
      companyid: new mongoose.Types.ObjectId(company_id),
    });

    if (event) return callback(null, 0);

    event = new Event({
      bannerphoto,
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
      eligibilityoption,
      eligibility,
      description,
      companyid: new mongoose.Types.ObjectId(company_id),
    });

    await event.save();

    callback(null, event);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
