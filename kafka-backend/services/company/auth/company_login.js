const Company = require("../../../models/Company/Companies");

async function handle_request(msg, callback) {
  console.log("Inside company_login kafka backend");
  console.log(msg);

  const { email } = msg;

  try {
    //Check if student email exists
    let company = await Company.findOne({ email });
    callback(null, company);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
