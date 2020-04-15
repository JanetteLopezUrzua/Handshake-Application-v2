const express = require("../node_modules/express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const Company = require("../models/Company/Companies");
const { checkAuth } = require("../config/passport");
const kafka = require("../kafka/client");

// @route   GET companies/info/:id
// @desc    Get company profile information
// @access  Public
router.get("/info/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  kafka.make_request("company_info", id, (err, results) => {
    try {
      const company = results;
      res.json({ company });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT companies/basicinfo
// @desc    Update company profile information
// @access  Public
router.put(
  "/basicinfo",
  [
    check("location", "Location is required").trim().not().isEmpty(),
    check("description").trim(),
  ],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);

    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request(
      "company_update_basic_info",
      req.body,
      (err, results) => {
        try {
          const company = results;
          res.json({ company });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
    );
  }
);

// @route   PUT companies/contactinfo
// @desc    Update company contact information
// @access  Public
router.put(
  "/contactinfo",
  [
    check("email", "Please enter a valid email").trim().isEmail(),
    check("phonenumber", "Phone Number must be exactly 10 numbers")
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
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

    kafka.make_request(
      "company_update_contact_info",
      req.body,
      (err, results) => {
        try {
          const company = results;
          res.json({ company });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
    );
  }
);

// @route   PUT companies/photo
// @desc    Update company photo
// @access  Public
router.put("/photo", checkAuth, async (req, res) => {
  console.log(req.body);

  kafka.make_request("company_update_photo", req.body, (err, results) => {
    try {
      const company = results;
      res.json({ company });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   DELETE companies/photo/:id
// @desc    Delete company photo
// @access  Public
router.delete("/photo/:id", checkAuth, async (req, res) => {
  const { id } = req.params;

  kafka.make_request("company_delete_photo", id, (err, results) => {
    try {
      const company = results;
      res.json({ company });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT companies/name
// @desc    Update company name
// @access  Public
router.put(
  "/name",
  [check("name", "Name is required").trim().not().isEmpty()],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);
    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("company_update_name", req.body, (err, results) => {
      try {
        const company = results;
        res.json({ company });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

module.exports = router;
