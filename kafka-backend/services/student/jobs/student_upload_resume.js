const Application = require("../../../models/Job/Applications");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside student_upload_resume kafka backend");
  console.log(msg);

  let { job_id, student_id, resume, status, month, day, year } = msg;

  try {
    application = new Application({
      jobid: new mongoose.Types.ObjectId(job_id),
      studentid: new mongoose.Types.ObjectId(student_id),
      resume,
      status,
      appmonth: month,
      appday: day,
      appyear: year,
    });

    await application.save();

    callback(null, application);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
