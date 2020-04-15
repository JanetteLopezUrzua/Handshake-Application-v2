const express = require("../node_modules/express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student/Students");
const { checkAuth } = require("../config/passport");
const kafka = require("../kafka/client");

// @route   GET students/studentslist
// @desc    Get students list
// @access  Public
router.get("/studentslist", checkAuth, async (req, res) => {
  kafka.make_request("students_list", req.query, (err, results) => {
    try {
      const studentsList = results;
      res.json({ studentsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   GET students/studentslist/company
// @desc    Get students list for companies
// @access  Public
router.get("/studentslist/company", checkAuth, async (req, res) => {
  kafka.make_request("company_students_list", req.query, (err, results) => {
    try {
      const studentsList = results;
      res.json({ studentsList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
