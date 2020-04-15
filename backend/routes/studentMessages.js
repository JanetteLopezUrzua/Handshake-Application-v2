const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const { checkAuth } = require("../config/passport");
const kafka = require("../kafka/client");

// @route   POST students/newmessage
// @desc    Add new message
// @access  Public
router.post(
  "/newmessage",
  [check("message", "No message entered.").trim().not().isEmpty()],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);

    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("student_add_new_message", req.body, (
      err,
      results
    ) => {
      try {
        const message = results;
        res.json({ message });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   GET students/messageslist
// @desc    Get messages list
// @access  Public
router.get("/messageslist", checkAuth, async (req, res) => {
  kafka.make_request("student_messages_list", req.query, (
    err,
    results
  ) => {
    try {
      const messagesList = results;
      res.json({ messagesList });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   GET students/messageinfo
// @desc    Get message info
// @access  Public
router.get("/messageinfo", checkAuth, async (req, res) => {
  kafka.make_request("student_message_info", req.query, (
    err,
    results
  ) => {
    try {
      const message = results;
      res.json({ message });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
