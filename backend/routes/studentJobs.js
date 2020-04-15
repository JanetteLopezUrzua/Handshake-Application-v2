const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const { checkAuth } = require("../config/passport");
const kafka = require("../kafka/client");

// @route   GET students/jobslist
// @desc    Get jobs list
// @access  Public
router.get("/jobslist", checkAuth, async (req, res) => {
  kafka.make_request("student_jobs_list", req.query, (err, results) => {
    try {
      const jobsList = results;
      res.json({ jobsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT students/job/application
// @desc    Update event banner photo
// @access  Public
router.put("/job/application", checkAuth, async (req, res) => {
  console.log(req.body);

  kafka.make_request("student_upload_resume", req.body, (
    err,
    results
  ) => {
    try {
      const application = results;
      res.json({ application });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   GET students/applicationslist;
// @desc    Get applications list
// @access  Public
router.get("/applicationslist", checkAuth, async (req, res) => {
  kafka.make_request("student_applications_list", req.query, (
    err,
    results
  ) => {
    try {
      const applicationsList = results;
      res.json({ applicationsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
