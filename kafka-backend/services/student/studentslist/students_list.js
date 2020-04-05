const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside students_list kafka backend");
  console.log(msg);

  const page = msg;

  const options = {
    select: "-password",
    page: parseInt(page, 10) || 1,
    limit: parseInt(25) || 25,
  };

  try {
    let studentsList = await Student.paginate({}, options);

    callback(null, studentsList);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
