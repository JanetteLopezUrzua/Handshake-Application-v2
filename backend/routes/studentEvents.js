const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client");

// @route   GET students/eventslist
// @desc    Get events list
// @access  Public
router.get("/eventslist", checkAuth, async (req, res) => {
  kafka.make_request("student_events_list", req.query, function (err, results) {
    try {
      let eventsList = results;
      res.json({ eventsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   GET students/registered/eventslist
// @desc    Get registered events list
// @access  Public
router.get("/registered/eventslist", checkAuth, async (req, res) => {
  kafka.make_request("student_registered_events_list", req.query, function (
    err,
    results
  ) {
    try {
      let eventsList = results;
      res.json({ eventsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   GET students/upcoming/eventslist
// @desc    Get upcoming events list
// @access  Public
router.get("/upcoming/eventslist", checkAuth, async (req, res) => {
  kafka.make_request("student_upcoming_events_list", req.query, function (
    err,
    results
  ) {
    try {
      let eventsList = results;
      res.json({ eventsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
