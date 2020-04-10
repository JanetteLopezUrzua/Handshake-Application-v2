const Job = require("../../../models/Job/Jobs");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_add_new_job kafka backend");
  console.log(msg);

  let {
    company_id,
    title,
    deadlinemonth,
    deadlineday,
    deadlineyear,
    deadlinetime,
    deadlinedaytime,
    location,
    salary,
    salarytime,
    description,
    category,
    postingmonth,
    postingday,
    postingyear,
  } = msg;

  try {
    //Check if job exists
    let job = await Job.findOne({
      title,
      deadlinemonth,
      deadlineday,
      deadlineyear,
      deadlinetime,
      deadlinedaytime,
      location,
      salary,
      salarytime,
      description,
      category,
      postingmonth,
      postingday,
      postingyear,
      companyid: new mongoose.Types.ObjectId(company_id),
    });

    if (job) return callback(null, 0);

    job = new Job({
      title,
      deadlinemonth,
      deadlineday,
      deadlineyear,
      deadlinetime,
      deadlinedaytime,
      location,
      salary,
      salarytime,
      description,
      category,
      postingmonth,
      postingday,
      postingyear,
      companyid: new mongoose.Types.ObjectId(company_id),
    });

    await job.save();

    callback(null, job);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
