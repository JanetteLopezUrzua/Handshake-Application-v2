const Events = require("../../../models/Event/Events");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside student_events_list kafka backend");
  console.log(msg);

  const { page } = msg;

  const options = {
    select: "-password",
    populate: "companyid",
    page: parseInt(page, 10) || 1,
    limit: parseInt(25) || 25,
    sort: { year: "asc", month: "asc", day: "asc" },
  };

  try {
    let eventsList = await Events.paginate({}, options);
    console.log(eventsList);
    callback(null, eventsList);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
