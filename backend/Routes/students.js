const express = require("../node_modules/express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../config/default");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student/Students");
const { auth } = require("../config/passport");

auth();

// @route   POST students/signup
// @desc    Register a student
// @access  Public
router.post(
  "/signup",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("college", "College name is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, college } = req.body;

    try {
      //Check if student email exists
      let student = await Student.findOne({ email });

      if (student) {
        return res.status(400).json({
          errors: [{ msg: "An account with that email already exists" }]
        });
      }

      student = new Student({
        name,
        email,
        password,
        college_name: college
      });

      const salt = await bcrypt.genSalt(10);

      student.password = await bcrypt.hash(password, salt);

      await student.save();

      payload = {
        student: {
          id: student.id,
          type: "student"
        }
      };

      //Change to 3600 in production
      const token = jwt.sign(
        payload,
        secret,
        { expiresIn: 1008000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error occurred");
    }
  }
);

// @route   POST students/login
// @desc    Log in a student
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //Check if student email exists
      let student = await Student.findOne({ email });

      if (!student) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }]
        });
      }

      const isPasswordAMatch = await bcrypt.compare(password, student.password);

      if (!isPasswordAMatch) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }]
        });
      }

      payload = {
        student: {
          id: student.id,
          type: "student"
        }
      };

      //Change to 3600 in production
      const token = jwt.sign(
        payload,
        secret,
        { expiresIn: 1008000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error occurred");
    }
  }
);

module.exports = router;
