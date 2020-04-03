const Student = require("../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_add_new_job kafka backend");
  console.log(msg);

  const {
    id,
    companyname,
    title,
    startdatemonth,
    startdateyear,
    enddatemonth,
    enddateyear,
    description
  } = msg;

  try {
    console.log(id);
    let student = await Student.findById(id, {
      jobs: {
        $elemMatch: {
          companyname,
          title,
          startdatemonth,
          startdateyear,
          enddatemonth,
          enddateyear,
          description
        }
      }
    });

    if (student.jobs.length !== 0) return callback(null, 0);
    else {
      let student = await Student.findByIdAndUpdate(
        id,
        {
          $push: {
            jobs: {
              companyname,
              title,
              startdatemonth,
              startdateyear,
              enddatemonth,
              enddateyear,
              description
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
