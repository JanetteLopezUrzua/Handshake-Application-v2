const Application = require("../../../models/Job/Applications");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside student_applications_list kafka backend");
  console.log(msg);

  let { page, filter, id } = msg;

  let options = "";

  options = {
    select: "-password",
    populate: {
      path: "jobid",
      populate: {
        path: "companyid",
      },
    },
    page: parseInt(page, 10) || 1,
    limit: parseInt(25) || 25,
  };

  let search = {};
  if (filter === "") {
    search = Object.assign(search, {
      studentid: new mongoose.Types.ObjectId(id),
    });
  } else {
    search = Object.assign(search, {
      studentid: new mongoose.Types.ObjectId(id),
      status: filter,
    });
  }

  try {
    let applicationsList = await Application.paginate(search, options);
    console.log(applicationsList);
    callback(null, applicationsList);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
