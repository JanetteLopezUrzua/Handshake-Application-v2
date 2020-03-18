const express = require("express");
const router = express.Router();

// @route   GET companies
// @desc    Test route
// @access  Public
router.get("/", (req, res) => res.send("Companies route"));

module.exports = router;
