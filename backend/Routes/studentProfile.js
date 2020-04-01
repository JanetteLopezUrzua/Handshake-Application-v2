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

// @route   PUT students/photo
// @desc    Update student photo
// @access  Public
router.put("/photo", checkAuth, async (req, res) => {
  console.log(req.body);

  kafka.make_request("student_update_photo", req.body, function(err, results) {
    try {
      let student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   DELETE students/photo/:id
// @desc    Delete student photo
// @access  Public
router.delete("/photo/:id", checkAuth, async (req, res) => {
  let id = req.params.id;

  kafka.make_request("student_delete_photo", id, function(err, results) {
    try {
      let student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT students/contactinfo
// @desc    Update student contact information
// @access  Public
router.put(
  "/contactinfo",
  [
    check("email", "Please enter a valid email")
      .isEmail()
      .trim(),
    check("phonenumber", "Phone Number must be exactly 10 numbers")
      .isNumeric()
      .isLength({ min: 10, max: 10 })
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

    kafka.make_request("student_update_contact_info", req.body, function(
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

// @route   PUT students/skillset
// @desc    Update student skillset
// @access  Public
router.put(
  "/skillset",
  [
    check("skill", "Enter a skill")
      .not()
      .isEmpty()
      .trim()
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

    kafka.make_request("student_update_skillset", req.body, function(
      err,
      results
    ) {
      try {
        let student = results;
        console.log("STUDEEEEEEEEENT", student);
        if (student === 0) {
          console.log("going inseideeeee");
          return res.status(400).json({
            errors: [{ msg: "Skill already exists" }]
          });
        }

        res.json({ student });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   DELETE students/skill/:id/:skill
// @desc    Delete student photo
// @access  Public
router.delete("/skill/:id/:skill", checkAuth, async (req, res) => {
  kafka.make_request("student_delete_skill", req.params, function(
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
});

module.exports = router;
