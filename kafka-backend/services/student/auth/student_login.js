const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_login kafka backend");
  console.log(msg);

  const { email } = msg;

  try {
    //Check if student email exists
    let student = await Student.findOne({ email });
    callback(null, student);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
