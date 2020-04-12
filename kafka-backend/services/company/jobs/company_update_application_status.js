const Application = require("../../../models/Job/Applications");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside company_update_application_status kafka backend");
  console.log(msg);

  let { appid, status } = msg;

  try {
    data = {
      status,
    };

    let application = await Application.findByIdAndUpdate(appid, data, {
      new: true,
    })
      .populate("studentid")
      .exec();

    callback(null, application);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
