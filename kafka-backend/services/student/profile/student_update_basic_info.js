const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_update_basic_info kafka backend");
  console.log(msg);

  let { id, fname, lname, dob, city, state, country } = msg;

  try {
    data = {
      fname,
      lname,
      dob,
      city,
      state,
      country
    };
    console.log(id);
    let student = await Student.findByIdAndUpdate(id, data, { new: true });

    callback(null, student);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
