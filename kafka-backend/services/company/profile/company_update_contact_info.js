const Company = require("../../../models/Company/Companies");

async function handle_request(msg, callback) {
  console.log("Inside company_update_contact_info kafka backend");
  console.log(msg);

  let { id, email, phonenumber } = msg;

  try {
    data = {
      email,
      phonenumber
    };
    console.log(id);
    let company = await Company.findByIdAndUpdate(id, data, { new: true });

    callback(null, company);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
