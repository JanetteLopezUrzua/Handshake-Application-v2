const express = require("../node_modules/express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { secret } = require("../config/default");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const Company = require("../models/Company/Companies");
const { auth } = require("../config/passport");

auth("company");

// @route   POST companies/signup
// @desc    Register a company
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
    check("location", "Location is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    //Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, location } = req.body;

    try {
      //Check if company email exists
      let company = await Company.findOne({ email });

      if (company) {
        return res.status(400).json({
          errors: [{ msg: "An account with that email already exists" }]
        });
      }

      company = new Company({
        name,
        email,
        password,
        location
      });

      const salt = await bcrypt.genSalt(10);

      company.password = await bcrypt.hash(password, salt);

      await company.save();

      payload = {
        company: {
          id: company.id,
          type: "company"
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

// @route   POST companies/login
// @desc    Log in a company
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
      //Check if company email exists
      let company = await Company.findOne({ email });

      if (!company) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }]
        });
      }

      const isPasswordAMatch = await bcrypt.compare(password, company.password);

      if (!isPasswordAMatch) {
        return res.status(400).json({
          errors: [{ msg: "Invalid Credentials" }]
        });
      }

      payload = {
        company: {
          id: company.id,
          type: "company"
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
