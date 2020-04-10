const Job = require("../../../models/Job/Jobs");

async function handle_request(msg, callback) {
  console.log("Inside job_posting_info kafka backend");
  console.log(msg);

  const jobid = msg;

  try {
    let job = await Job.findById(jobid).populate("companyid").exec();

    callback(null, job);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
