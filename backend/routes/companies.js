const express = require("../node_modules/express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { secret } = require("../config/default");
const Company = require("../models/Company/Companies");
const { auth } = require("../config/passport");
const kafka = require("../kafka/client");

auth();

// @route   POST companies/signup
// @desc    Register a company
// @access  Public
router.post(
  "/signup",
  [
    check("name", "Name is required").not().isEmpty().trim(),
    check("email", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("location", "Location is required").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("company_signup", req.body, (err, results) => {
      try {
        // Check if company email exists
        // let company = await Company.findOne({ email });
        const company = results;
        console.log("Company Results", results);

        if (company === 0) {
          return res.status(400).json({
            errors: [{ msg: "An account with that email already exists" }],
          });
        }

        payload = {
          user: {
            id: company._id,
            type: "company",
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

// @route   POST companies/login
// @desc    Log in a company
// @access  Public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    kafka.make_request("company_login", req.body, async (err, results) => {
      try {
        // Check if company email exists
        // let company = await Company.findOne({ email });

        const company = results;

        if (!company) {
          return res.status(400).json({
            errors: [{ msg: "Invalid Credentials" }],
          });
        }

        const isPasswordAMatch = await bcrypt.compare(
          password,
          company.password
        );

        if (!isPasswordAMatch) {
          return res.status(400).json({
            errors: [{ msg: "Invalid Credentials" }],
          });
        }

        payload = {
          user: {
            id: company._id,
            type: "company",
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
