const Applications = require("../../../models/Job/Applications");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_job_applications_list kafka backend");
  console.log(msg);

  const jobid = msg;

  try {
    let studentsList = await Applications.find({
      jobid,
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
