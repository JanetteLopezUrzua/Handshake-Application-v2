const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client");

// @route   POST companies/newevent
// @desc    Add a new event for a company
// @access  Public
router.post(
  "/newevent",
  [
    check("title", "Required. Enter Title.").trim().not().isEmpty(),
    check("dayofweek", "Required. Select Day of Week.").trim().not().isEmpty(),
    check("month", "Required. Select Month.").trim().not().isEmpty(),
    check("day", "Required. Select Day.").trim().not().isEmpty(),
    check("year", "Required. Select Year.").trim().not().isEmpty(),
    check("starttime", "Required. Select Start Time.").trim().not().isEmpty(),
    check("startdaytime", "Required. Select Start Time AM or PM.")
      .trim()
      .not()
      .isEmpty(),
    check("endtime", "Required. Select End Time.").trim().not().isEmpty(),
    check("enddaytime", "Required. Select End Time AM or PM.")
      .trim()
      .not()
      .isEmpty(),
    check("timezone", "Required. Select time Zone.").trim().not().isEmpty(),
    check("location", "Required. Enter Location.").trim().not().isEmpty(),
    check("eligibility", "Required. Enter Eligibility.").trim().not().isEmpty(),
    check("description", "Required. Enter Description.").trim().not().isEmpty(),
  ],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);
    //Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("company_add_new_event", req.body, function (
      err,
      results
    ) {
      try {
        let event = results;
        if (event === 0) {
          return res.status(400).json({
            errors: [
              { eventmsg: "An event with this information already exists" },
            ],
          });
        }

        res.json({ event });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   GET companies/eventslist
// @desc    Get events list
// @access  Public
router.get("/eventslist", checkAuth, async (req, res) => {
  kafka.make_request("company_events_list", req.query, function (err, results) {
    try {
      let eventsList = results;
      res.json({ eventsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT companies/event/bannerphoto
// @desc    Update event banner photo
// @access  Public
router.put("/event/bannerphoto", checkAuth, async (req, res) => {
  console.log(req.body);

  kafka.make_request("company_update_banner_photo", req.body, function (
    err,
    results
  ) {
    try {
      let event = results;
      res.json({ event });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   DELETE companies/event/bannerphoto/:eventid
// @desc    Delete event banner photo
// @access  Public
router.delete("/event/bannerphoto/:eventid", checkAuth, async (req, res) => {
  let eventid = req.params.eventid;

  kafka.make_request("company_delete_banner_photo", eventid, function (
    err,
    results
  ) {
    try {
      let event = results;
      res.json({ event });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   GET companies/event/:eventid
// @desc    Get event information
// @access  Public
router.get("/event/:eventid", checkAuth, async (req, res) => {
  let eventid = req.params.eventid;
  kafka.make_request("event_info", eventid, function (err, results) {
    try {
      let event = results;
      res.json({ event });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
