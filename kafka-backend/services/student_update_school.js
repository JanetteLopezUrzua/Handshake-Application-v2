const Student = require("../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_update_school kafka backend");
  console.log(msg);

  const {
    id,
    schoolid,
    location,
    degree,
    major,
    passingmonth,
    passingyear,
    gpa
  } = msg;

  try {
    console.log(id);

    let student = await Student.findOneAndUpdate(
      { _id: id, "schools._id": schoolid },
      {
        $set: {
          "schools.$.location": location,
          "schools.$.degree": degree,
          "schools.$.major": major,
          "schools.$.passingmonth": passingmonth,
          "schools.$.passingyear": passingyear,
          "schools.$.gpa": gpa
        }
      },
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
