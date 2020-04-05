const express = require("../node_modules/express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student/Students");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client");

// @route   GET students/studentslist/:page
// @desc    Get student profile information
// @access  Public
router.get("/studentslist/:page", checkAuth, async (req, res) => {
  let page = req.params.page;

  kafka.make_request("students_list", page, function(err, results) {
    try {
      let studentsList = results;
      res.json({ studentsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
