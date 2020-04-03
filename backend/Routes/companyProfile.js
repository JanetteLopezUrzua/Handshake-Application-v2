const express = require("../node_modules/express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Company = require("../models/Company/Companies");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client");

// @route   GET companies/info/:id
// @desc    Get company profile information
// @access  Public
router.get("/info/:id", checkAuth, async (req, res) => {
  let id = req.params.id;
  kafka.make_request("company_info", id, function(err, results) {
    try {
      let company = results;
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
    check("location", "Location is required")
      .not()
      .isEmpty()
      .trim(),
    check("description").trim()
  ],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);

    //Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("company_update_basic_info", req.body, function(
      err,
      results
    ) {
      try {
        let company = results;
        res.json({ company });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

module.exports = router;
