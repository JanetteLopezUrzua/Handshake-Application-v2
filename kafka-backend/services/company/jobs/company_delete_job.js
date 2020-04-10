const Job = require("../../../models/Job/Jobs");
const Applications = require("../../../models/Job/Applications");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_delete_job kafka backend");
  console.log(msg);

  let jobid = msg;

  try {
    console.log(jobid);
    let job = await Job.deleteOne({
      _id: mongoose.Types.ObjectId(jobid),
    });

    let applications = await Applications.deleteMany({
      jobid: mongoose.Types.ObjectId(jobid),
    });

    callback(null, job);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
