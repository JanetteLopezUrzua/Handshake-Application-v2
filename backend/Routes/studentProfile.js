const express = require("../node_modules/express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student/Students");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client");

// @route   GET students/info/:id
// @desc    Get student profile information
// @access  Public
router.get("/info/:id", checkAuth, async (req, res) => {
  let id = req.params.id;
  kafka.make_request("student_info", id, function(err, results) {
    try {
      let student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT students/basicinfo
// @desc    Update student profile information
// @access  Public
router.put(
  "/basicinfo",
  [
    check("fname", "First name is required")
      .not()
      .isEmpty()
      .trim(),
    check("lname", "Last name is required")
      .not()
      .isEmpty()
      .trim(),
    check("dob").trim(),
    check("city").trim(),
    check("state").trim(),
    check("country").trim()
  ],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);

    //Check if there are errors
    if (!errors.isEmpty()) {
      console.log("inside errors");
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("student_update_basic_info", req.body, function(
      err,
      results
    ) {
      try {
        let student = results;
        res.json({ student });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   PUT students/careerobjective
// @desc    Update student career objective
// @access  Public
router.put(
  "/careerobjective",
  [check("objective").trim()],
  checkAuth,
  async (req, res) => {
    console.log(req.body);

    kafka.make_request("student_update_career_objective", req.body, function(
      err,
      results
    ) {
      try {
        let student = results;
        res.json({ student });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

module.exports = router;
