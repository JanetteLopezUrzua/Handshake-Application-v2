const Job = require("../../../models/Job/Jobs");

async function handle_request(msg, callback) {
  console.log("Inside company_update_job_info kafka backend");
  console.log(msg);

  let {
    job_id,
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
  } = msg;

  try {
    data = {
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
    };
    console.log(job_id);
    let job = await Job.findByIdAndUpdate(job_id, data, { new: true })
      .populate("companyid")
      .exec();

    callback(null, job);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
