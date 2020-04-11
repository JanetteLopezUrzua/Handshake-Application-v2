const Job = require("../../../models/Job/Jobs");
const mongoose = require("mongoose");

async function handle_request(msg, callback) {
  console.log("Inside student_jobs_list kafka backend");
  console.log(msg);

  let { page, nameortitle, location, filter, sort } = msg;

  let sortquery = "";

  switch (sort) {
    case "location_asc":
      sortquery = { location: "asc" };
      break;
    case "location_desc":
      sortquery = { location: "desc" };
      break;
    case "posting_date_asc":
      sortquery = {
        postingyear: "asc",
        postingmonth: "asc",
        postingday: "asc",
      };
      break;
    case "posting_date_desc":
      sortquery = {
        postingyear: "desc",
        postingmonth: "desc",
        postingday: "desc",
      };
      break;
    case "app_deadline_asc":
      sortquery = {
        deadlineyear: "asc",
        deadlinemonth: "asc",
        deadlineday: "asc",
      };
      break;
    case "app_deadline_desc":
      sortquery = {
        deadlineyear: "desc",
        deadlinemonth: "desc",
        deadlineday: "desc",
      };
      break;
    default:
      sort = "";
  }

  let options = "";
  if (sort === "") {
    options = {
      select: "-password",
      populate: "companyid",
      page: parseInt(page, 10) || 1,
      limit: parseInt(25) || 25,
    };
  } else {
    options = {
      select: "-password",
      populate: "companyid",
      page: parseInt(page, 10) || 1,
      limit: parseInt(25) || 25,
      sort: sortquery,
    };
  }
  console.log("3");
  let search = {};
  if (filter === "") {
    search = Object.assign(search, {
      $and: [
        {
          $or: [
            { title: { $regex: ".*" + nameortitle + ".*", $options: "i" } },
            {
              "companyid.name": {
                $regex: ".*" + nameortitle + ".*",
                $options: "i",
              },
            },
          ],
        },
        { location: { $regex: ".*" + location + ".*", $options: "i" } },
      ],
    });
  } else {
    search = Object.assign(search, {
      $and: [
        {
          $or: [
            { title: { $regex: ".*" + nameortitle + ".*", $options: "i" } },
            {
              "companyid.name": {
                $regex: ".*" + nameortitle + ".*",
                $options: "i",
              },
            },
          ],
        },
        { category: filter },
        { location: { $regex: ".*" + location + ".*", $options: "i" } },
      ],
    });
  }

  try {
    let jobsList = await Job.paginate(search, options);
    console.log(jobsList);
    callback(null, jobsList);
  } catch (err) {
    //throw err;
    callback(err, "Error");
  }
}

exports.handle_request = handle_request;
