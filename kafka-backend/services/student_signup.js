const Student = require("../models/Student/Students");
const bcrypt = require("bcryptjs");

async function handle_request(msg, callback) {
  console.log("Inside student_signup kafka backend");
  console.log(msg);

  const { fname, lname, email, password, college } = msg;

  try {
    //Check if student email exists
    let student = await Student.findOne({ email });

    if (student) return callback(null, 0);

    student = new Student({
      fname,
      lname,
      email,
      password,
      schools: {
        name: college,
        primaryschool: "true"
      }
    });

    const salt = await bcrypt.genSalt(10);

    student.password = await bcrypt.hash(password, salt);

    await student.save();

    callback(null, student);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
