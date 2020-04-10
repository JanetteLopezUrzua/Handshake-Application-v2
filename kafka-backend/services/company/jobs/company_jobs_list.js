const Job = require("../../../models/Job/Jobs");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_jobs_list kafka backend");
  console.log(msg);

  const { page, id } = msg;

  const options = {
    select: "-password",
    populate: "companyid",
    page: parseInt(page, 10) || 1,
    limit: parseInt(25) || 25,
  };

  let search = {};
  search = Object.assign(search, {
    companyid: new mongoose.Types.ObjectId(id),
  });

  try {
    let jobsList = await Job.paginate(search, options);
    console.log(jobsList);
    callback(null, jobsList);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
