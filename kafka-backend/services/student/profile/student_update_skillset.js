const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_update_skillset kafka backend");
  console.log(msg);

  let { id, skill } = msg;

  try {
    console.log(id);
    let student = await Student.findById(id, {
      skillset: { $elemMatch: { skill: skill } }
    });

    if (student.skillset.length !== 0) return callback(null, 0);
    else {
      let student = await Student.findByIdAndUpdate(
        id,
        { $push: { skillset: { skill } } },
        { new: true }
      );
      callback(null, student);
    }
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
