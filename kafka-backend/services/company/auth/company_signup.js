const Company = require("../../../models/Company/Companies");
const bcrypt = require("bcryptjs");

async function handle_request(msg, callback) {
  console.log("Inside company_signup kafka backend");
  console.log(msg);

  const { name, email, password, location } = msg;

  try {
    //Check if student email exists
    let company = await Company.findOne({ email });

    if (company) return callback(null, []);

    company = new Company({
      name,
      email,
      password,
      location
    });

    const salt = await bcrypt.genSalt(10);

    company.password = await bcrypt.hash(password, salt);

    await company.save();

    callback(null, company);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
