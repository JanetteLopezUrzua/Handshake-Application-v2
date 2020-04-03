const Student = require("../../../models/Student/Students");

async function handle_request(msg, callback) {
  console.log("Inside student_update_contact_info kafka backend");
  console.log(msg);

  let { id, email, phonenumber } = msg;

  try {
    data = {
      email,
      phonenumber
    };
    console.log(id);
    let student = await Student.findByIdAndUpdate(id, data, { new: true });

    callback(null, student);
  } catch (err) {
    //throw err;
    console.log(err);
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
