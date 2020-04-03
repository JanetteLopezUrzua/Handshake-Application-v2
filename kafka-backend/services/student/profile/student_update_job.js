const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_update_job kafka backend");
  console.log(msg);

  const {
    id,
    jobid,
    startdatemonth,
    startdateyear,
    enddatemonth,
    enddateyear,
    description
  } = msg;

  try {
    console.log(id);

    let student = await Student.findOneAndUpdate(
      { _id: id, "jobs._id": jobid },
      {
        $set: {
          "jobs.$.startdatemonth": startdatemonth,
          "jobs.$.startdateyear": startdateyear,
          "jobs.$.enddatemonth": enddatemonth,
          "jobs.$.enddateyear": enddateyear,
          "jobs.$.description": description
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
