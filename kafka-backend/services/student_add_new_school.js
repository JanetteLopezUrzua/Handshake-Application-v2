const Student = require("../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_add_new_school kafka backend");
  console.log(msg);

  const {
    id,
    name,
    primaryschool,
    location,
    degree,
    major,
    passingmonth,
    passingyear,
    gpa
  } = msg;

  try {
    console.log(id);
    let student = await Student.findById(id, {
      schools: {
        $elemMatch: {
          name,
          primaryschool,
          location,
          degree,
          major,
          passingmonth,
          passingyear,
          gpa
        }
      }
    });

    if (student.schools.length !== 0) return callback(null, 0);
    else {
      let student = await Student.findByIdAndUpdate(
        id,
        {
          $push: {
            schools: {
              name,
              primaryschool,
              location,
              degree,
              major,
              passingmonth,
              passingyear,
              gpa
            }
          }
        },
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
