const RSVP = require("../../../models/Event/RSVP");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_rsvp_student kafka backend");
  console.log(msg);

  const { eventid, studentid } = msg;

  try {
    student = new RSVP({
      eventid: new mongoose.Types.ObjectId(eventid),
      studentid: new mongoose.Types.ObjectId(studentid),
    });

    await student.save();

    console.log(student);
    callback(null, student);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
