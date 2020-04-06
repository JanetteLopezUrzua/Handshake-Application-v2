const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside students_list kafka backend");
  console.log(msg);

  const { page, nameorcollege, major } = msg;

  const options = {
    select: "-password",
    page: parseInt(page, 10) || 1,
    limit: parseInt(25) || 25,
  };

  let search = {};
  console.log("nameorcollege:", nameorcollege);
  console.log("major:", major);

  if (major === "") {
    search = Object.assign(search, {
      $or: [
        { fname: { $regex: ".*" + nameorcollege + ".*", $options: "i" } },
        { lname: { $regex: ".*" + nameorcollege + ".*", $options: "i" } },
        {
          "schools.name": {
            $regex: ".*" + nameorcollege + ".*",
            $options: "i",
          },
        },
      ],
    });
  } else {
    search = Object.assign(search, {
      $and: [
        {
          $or: [
            { fname: { $regex: ".*" + nameorcollege + ".*", $options: "i" } },
            { lname: { $regex: ".*" + nameorcollege + ".*", $options: "i" } },
            {
              "schools.name": {
                $regex: ".*" + nameorcollege + ".*",
                $options: "i",
              },
            },
          ],
        },
        { "schools.major": { $regex: ".*" + major + ".*", $options: "i" } },
      ],
    });
  }

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
