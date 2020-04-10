const RSVP = require("../../../models/Event/RSVP");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside student_events_list kafka backend");
  console.log(msg);

  const { page, id } = msg;

  const options = {
    select: "-password",
    populate: {
      path: "eventid",
      populate: {
        path: "companyid",
      },
    },
    page: parseInt(page, 10) || 1,
    limit: parseInt(25) || 25,
  };

  let search = {};

  search = Object.assign(search, {
    studentid: new mongoose.Types.ObjectId(id),
  });

  try {
    let eventsList = await RSVP.paginate(search, options);
    console.log(eventsList);
    callback(null, eventsList);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
