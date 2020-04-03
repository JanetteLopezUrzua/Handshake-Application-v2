const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_delete_job kafka backend");
  console.log(msg);

  let { id, jobid } = msg;

  try {
    let student = await Student.findByIdAndUpdate(
      id,
      { $pull: { jobs: { _id: jobid } } },
      { new: true }
    );

    callback(null, student);
  } catch (err) {
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
