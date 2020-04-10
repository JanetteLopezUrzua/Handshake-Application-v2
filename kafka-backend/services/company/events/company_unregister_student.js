const RSVP = require("../../../models/Event/RSVP");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_unregister_student kafka backend");
  console.log(msg);

  const { eventid, studentid } = msg;

  console.log("EVENTid", eventid);
  console.log("STUDENTID", studentid);

  try {
    let rsvp = await RSVP.deleteOne({
      eventid,
      studentid,
    });

    console.log(student);
    callback(null, student);
  } catch (err) {
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
