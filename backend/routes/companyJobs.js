const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const { checkAuth } = require("../config/passport");
const kafka = require("../kafka/client");

// @route   POST companies/newjobposting
// @desc    Add a new job post for a company
// @access  Public
router.post(
  "/newjobposting",
  [
    check("title", "Required. Enter Title.").trim().not().isEmpty(),
    check("deadlinemonth", "Required. Select Deadline Month.")
      .trim()
      .not()
      .isEmpty(),
    check("deadlineday", "Required. Select Deadline Day.")
      .trim()
      .not()
      .isEmpty(),
    check("deadlineyear", "Required. Select Deadline Year.")
      .trim()
      .not()
      .isEmpty(),
    check("deadlinetime", "Required. Select Deadline Time.")
      .trim()
      .not()
      .isEmpty(),
    check("deadlinedaytime", "Required. Select Deadline Time AM or PM.")
      .trim()
      .not()
      .isEmpty(),
    check("location", "Required. Enter Location.").trim().not().isEmpty(),
    check("salary", "Required. Enter Salary.").trim().not().isEmpty(),
    check("salarytime", "Required. Select Salary Period.")
      .trim()
      .not()
      .isEmpty(),
    check("description", "Required. Enter a Description.")
      .trim()
      .not()
      .isEmpty(),
    check("category", "Required. Select a Category.").trim().not().isEmpty(),
  ],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);
    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("company_add_new_job", req.body, (
      err,
      results
    ) => {
      try {
        const job = results;
        if (job === 0) {
          return res.status(400).json({
            errors: [
              { jobmsg: "A job posting with this information already exists" },
            ],
          });
        }

        res.json({ job });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   GET companies/jobslist
// @desc    Get jobs list
// @access  Public
router.get("/jobslist", checkAuth, async (req, res) => {
  kafka.make_request("company_jobs_list", req.query, (err, results) => {
    try {
      const jobsList = results;
      res.json({ jobsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   GET companies/job/:jobid
// @desc    Get job information
// @access  Public
router.get("/job/:jobid", checkAuth, async (req, res) => {
  const { jobid } = req.params;
  kafka.make_request("job_posting_info", jobid, (err, results) => {
    try {
      const job = results;
      res.json({ job });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT companies/job/info
// @desc    Update job posting info
// @access  Public
router.put(
  "/job/info",
  [
    check("title", "Required. Enter Title.").trim().not().isEmpty(),
    check("deadlinemonth", "Required. Select Deadline Month.")
      .trim()
      .not()
      .isEmpty(),
    check("deadlineday", "Required. Select Deadline Day.")
      .trim()
      .not()
      .isEmpty(),
    check("deadlineyear", "Required. Select Deadline Year.")
      .trim()
      .not()
      .isEmpty(),
    check("deadlinetime", "Required. Select Deadline Time.")
      .trim()
      .not()
      .isEmpty(),
    check("deadlinedaytime", "Required. Select Deadline Time AM or PM.")
      .trim()
      .not()
      .isEmpty(),
    check("location", "Required. Enter Location.").trim().not().isEmpty(),
    check("salary", "Required. Enter Salary.").trim().not().isEmpty(),
    check("salarytime", "Required. Select Salary Period.")
      .trim()
      .not()
      .isEmpty(),
    check("description", "Required. Enter a Description.")
      .trim()
      .not()
      .isEmpty(),
    check("category", "Required. Select a Category.").trim().not().isEmpty(),
  ],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);
    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("company_update_job_info", req.body, (
      err,
      results
    ) => {
      try {
        const job = results;
        res.json({ job });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   DELETE companies/job/:jobid
// @desc    Delete job
// @access  Public
router.delete("/job/:jobid", checkAuth, async (req, res) => {
  const { jobid } = req.params;

  kafka.make_request("company_delete_job", jobid, (err, results) => {
    try {
      const job = results;
      res.json({ job });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   GET companies/job/:jobid/applications
// @desc    Get job's applications list
// @access  Public
router.get("/job/:jobid/applications", checkAuth, async (req, res) => {
  const { jobid } = req.params;

  kafka.make_request("company_job_applications_list", jobid, (
    err,
    results
  ) => {
    try {
      const applications = results;
      res.json({ applications });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT companies/job/status
// @desc    Update status of job applications
// @access  Public
router.put("/job/status", checkAuth, async (req, res) => {
  kafka.make_request("company_update_application_status", req.body, (
    err,
    results
  ) => {
    try {
      const applications = results;
      res.json({ applications });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
