const express = require("../node_modules/express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { secret } = require("../config/default");
const { auth } = require("../config/passport");
const kafka = require("../kafka/client");

auth();

// @route   POST students/signup
// @desc    Register a student
// @access  Public
router.post(
  "/signup",
  [
    check("fname", "First name is required").not().isEmpty().trim(),
    check("lname", "Last name is required").not().isEmpty().trim(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("college", "College name is required").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);
    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("student_signup", req.body, (err, results) => {
      try {
        // Check if student email exists
        // let student = await Student.findOne({ email });

        const student = results;
        console.log("Student Results", results);

        if (student === 0) {
          return res.status(400).json({
            errors: [{ msg: "An account with that email already exists" }],
          });
        }

        payload = {
          user: {
            id: student._id,
            type: "student",
          },
        };

        // Change to 3600 in production
        const token = jwt.sign(
          payload,
          secret,
          { expiresIn: 1008000 },
          (err, token) => {
            if (err) throw err;
            res.json(`JWT ${token}`);
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error occurred");
      }
    });
  }
);

// @route   POST students/login
// @desc    Log in a student
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    kafka.make_request("student_login", req.body, async (err, results) => {
      try {
        // Check if student email exists
        // let student = await Student.findOne({ email });

        const student = results;

        if (!student) {
          return res.status(400).json({
            errors: [{ msg: "Invalid Credentials" }],
          });
        }

        const isPasswordAMatch = await bcrypt.compare(
          password,
          student.password
        );

        if (!isPasswordAMatch) {
          return res.status(400).json({
            errors: [{ msg: "Invalid Credentials" }],
          });
        }

        payload = {
          user: {
            id: student._id,
            type: "student",
          },
        };

        // Change to 3600 in production
        const token = jwt.sign(
          payload,
          secret,
          { expiresIn: 1008000 },
          (err, token) => {
            if (err) throw err;
            res.json(`JWT ${token}`);
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error occurred");
      }
    });
  }
);

module.exports = router;
