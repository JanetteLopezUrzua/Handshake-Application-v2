const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside company_students_list kafka backend");
  console.log(msg);

  const { page, nameorcollegeorskillset } = msg;

  const options = {
    select: "-password",
    page: parseInt(page, 10) || 1,
    limit: parseInt(25) || 25,
  };

  let search = {};
  console.log("nameorcollegeorskillset:", nameorcollegeorskillset);

  search = Object.assign(search, {
    $or: [
      {
        fname: { $regex: ".*" + nameorcollegeorskillset + ".*", $options: "i" },
      },
      {
        lname: { $regex: ".*" + nameorcollegeorskillset + ".*", $options: "i" },
      },
      {
        "schools.name": {
          $regex: ".*" + nameorcollegeorskillset + ".*",
          $options: "i",
        },
      },
      {
        "skillset.skill": {
          $regex: ".*" + nameorcollegeorskillset + ".*",
          $options: "i",
        },
      },
    ],
  });

  try {
    let studentsList = await Student.paginate(search, options);
    console.log(studentsList);
    callback(null, studentsList);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
