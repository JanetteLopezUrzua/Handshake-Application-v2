const express = require("../node_modules/express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student/Students");
const { checkAuth } = require("../config/passport");

// @route   GET students/info/:id
// @desc    Get student profile information
// @access  Public
router.get("/info/:id", checkAuth, async (req, res) => {
  try {
    let id = req.params.id;
    let student = await Student.findById(id).select("-password");
    res.json({ student });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT students/info/:id
// @desc    Update student profile information
// @access  Public
router.put(
  "/info",
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

    try {
      let { id, fname, lname, dob, city, state, country } = req.body;
      data = {
        fname,
        lname,
        dob,
        city,
        state,
        country
      };
      console.log(id);
      let student = await Student.findByIdAndUpdate(id, data, { new: true });
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
