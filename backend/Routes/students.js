const express = require("express");
const router = express.Router();

// @route   GET students
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Students route"));

// @route   POST students/careerobjective
// @desc    Test route
// @access  Public
router.post("/careerobjective", (req, res) => {
  console.log(req.body);
  res.send("career objective route");
});

module.exports = router;
