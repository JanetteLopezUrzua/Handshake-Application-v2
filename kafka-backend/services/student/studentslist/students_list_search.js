const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside students_list_search kafka backend");
  console.log(msg);

  const { nameorcollege, major } = msg;

  const options = {
    select: "-password",
    page: parseInt(page, 10) || 1,
    limit: parseInt(25) || 25,
  };

  let search = {};

  search = Object.assign(search, {
    $and: [
      {
        $or: [
          { name: { $regex: ".*" + nameorcollege + ".*" } },
          { college: { $regex: ".*" + nameorcollege + ".*" } },
        ],
      },
      { major: { $regex: ".*" + major + ".*" } },
    ],
  });

  try {
    let studentsList = await Student.paginate(search, options);

    callback(null, studentsList);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
