const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_info kafka backend");
  console.log(msg);

  const id = msg;

  try {
    let student = await Student.findById(id).select("-password");

    callback(null, student);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
