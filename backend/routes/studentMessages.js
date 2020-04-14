const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { checkAuth } = require("../config/passport");
var kafka = require("../kafka/client");

// @route   POST students/newmessage
// @desc    Add new message
// @access  Public
router.post(
  "/newmessage",
  [check("message", "No message entered.").trim().not().isEmpty()],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);

    //Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("student_add_new_message", req.body, function (
      err,
      results
    ) {
      try {
        let message = results;
        res.json({ message });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

module.exports = router;
