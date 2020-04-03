const Company = require("../../../models/Company/Companies");

async function handle_request(msg, callback) {
  console.log("Inside company_info kafka backend");
  console.log(msg);

  const id = msg;

  try {
    let company = await Company.findById(id).select("-password");

    callback(null, company);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
