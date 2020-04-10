const RSVP = require("../../../models/Event/RSVP");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_event_rsvp_list kafka backend");
  console.log(msg);

  const eventid = msg;

  try {
    let studentsList = await RSVP.find({
      eventid,
    })
      .populate("studentid")
      .exec();
    console.log(studentsList);
    callback(null, studentsList);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
