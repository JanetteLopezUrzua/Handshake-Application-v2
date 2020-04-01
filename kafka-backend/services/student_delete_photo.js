const Student = require("../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_delete_photo kafka backend");
  console.log(msg);

  let id = msg;

  try {
    console.log(id);
    let student = await Student.findByIdAndUpdate(
      id,
      { $unset: { photo: "" } },
      { new: true }
    );

    callback(null, student);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
