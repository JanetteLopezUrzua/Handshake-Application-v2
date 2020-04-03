const Student = require("../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_delete_school kafka backend");
  console.log(msg);

  let { id, schoolid } = msg;

  try {
    console.log(id);

    let student = await Student.findById(id, {
      schools: { $elemMatch: { _id: schoolid, primaryschool: "true" } }
    });

    if (student.schools.length === 0) {
      let student = await Student.findByIdAndUpdate(
        id,
        { $pull: { schools: { _id: schoolid } } },
        { new: true }
      );

      callback(null, student);
    } else {
      student = await Student.findByIdAndUpdate(
        id,
        { $pull: { schools: { _id: schoolid } } },
        { new: true }
      );

      let schools = await Student.findById(id).select("schools");

      if (schools.schools.length !== 0) {
        let school = schools.schools[0]._id;

        let student = await Student.findOneAndUpdate(
          { _id: id, "schools._id": school },
          { $set: { "schools.$.primaryschool": "true" } },
          { new: true }
        );

        return callback(null, student);
      }
      callback(null, student);
    }
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
