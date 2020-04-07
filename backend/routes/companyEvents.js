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
      console.log(
        "YYYYYYYYYYYYYYYYYYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY"
      );
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

module.exports = router;
