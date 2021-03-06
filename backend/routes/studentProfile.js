const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const Student = require("../models/Student/Students");
const { checkAuth } = require("../config/passport");
const kafka = require("../kafka/client");

// @route   GET students/info/:id
// @desc    Get student profile information
// @access  Public
router.get("/info/:id", checkAuth, async (req, res) => {
  const { id } = req.params;
  kafka.make_request("student_info", id, (err, results) => {
    try {
      const student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT students/basicinfo
// @desc    Update student profile information
// @access  Public
router.put(
  "/basicinfo",
  [
    check("fname", "First name is required").not().isEmpty().trim(),
    check("lname", "Last name is required").not().isEmpty().trim(),
    check("dob").trim(),
    check("city").trim(),
    check("state").trim(),
    check("country").trim(),
  ],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);

    // Check if there are errors
    if (!errors.isEmpty()) {
      console.log("inside errors");
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request(
      "student_update_basic_info",
      req.body,
      (err, results) => {
        try {
          const student = results;
          res.json({ student });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
    );
  }
);

// @route   PUT students/careerobjective
// @desc    Update student career objective
// @access  Public
router.put(
  "/careerobjective",
  [check("objective").trim()],
  checkAuth,
  async (req, res) => {
    console.log(req.body);

    kafka.make_request(
      "student_update_career_objective",
      req.body,
      (err, results) => {
        try {
          const student = results;
          res.json({ student });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
    );
  }
);

// @route   PUT students/photo
// @desc    Update student photo
// @access  Public
router.put("/photo", checkAuth, async (req, res) => {
  console.log(req.body);

  kafka.make_request("student_update_photo", req.body, (err, results) => {
    try {
      const student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   DELETE students/photo/:id
// @desc    Delete student photo
// @access  Public
router.delete("/photo/:id", checkAuth, async (req, res) => {
  const { id } = req.params;

  kafka.make_request("student_delete_photo", id, (err, results) => {
    try {
      const student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT students/contactinfo
// @desc    Update student contact information
// @access  Public
router.put(
  "/contactinfo",
  [
    check("email", "Please enter a valid email").isEmail().trim(),
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
      "student_update_contact_info",
      req.body,
      (err, results) => {
        try {
          const student = results;
          res.json({ student });
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
    );
  }
);

// @route   PUT students/skillset
// @desc    Update student skillset
// @access  Public
router.put(
  "/skillset",
  [check("skill", "Enter a skill").not().isEmpty().trim()],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);
    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    kafka.make_request("student_update_skillset", req.body, (err, results) => {
      try {
        const student = results;
        if (student === 0) {
          return res.status(400).json({
            errors: [{ skillmsg: "Skill already exists" }],
          });
        }

        res.json({ student });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   DELETE students/skill/:id/:skill
// @desc    Delete student photo
// @access  Public
router.delete("/skill/:id/:skill", checkAuth, async (req, res) => {
  kafka.make_request("student_delete_skill", req.params, (err, results) => {
    try {
      const student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   POST students/newschool
// @desc    Add a new school to the student profile
// @access  Public
router.post(
  "/newschool",
  [
    check("name", "School name is required").not().isEmpty().trim(),
    check("gpa", "GPA must follow this format: 0.00").isLength({
      min: 4,
      max: 4,
    }),
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

    if (
      (req.body.passingmonth === "" && req.body.passingyear !== "") ||
      (req.body.passingmonth !== "" && req.body.passingyear === "")
    ) {
      return res
        .status(400)
        .json({ errors: [{ schoolmsg: "Enter complete end date" }] });
    }

    kafka.make_request("student_add_new_school", req.body, (err, results) => {
      try {
        const student = results;
        if (student === 0) {
          return res.status(400).json({
            errors: [
              { schoolmsg: "A school with this information already exists" },
            ],
          });
        }

        res.json({ student });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   DELETE students/school/:id/:schoolid
// @desc    Delete school from the student profile
// @access  Public
router.delete("/school/:id/:schoolid", checkAuth, async (req, res) => {
  kafka.make_request("student_delete_school", req.params, (err, results) => {
    try {
      const student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT students/school
// @desc    Update a school in the student profile
// @access  Public
router.put(
  "/school",
  [
    check("gpa", "GPA must follow this format: 0.00").isLength({
      min: 4,
      max: 4,
    }),
  ],
  checkAuth,
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.body);
    // Check if there are errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: update.errors.array() });
    }

    if (
      (req.body.passingmonth === null && req.body.passingyear !== null) ||
      (req.body.passingmonth !== null && req.body.passingyear === null)
    ) {
      return res
        .status(400)
        .json({ errors: [{ updateschoolmsg: "Enter complete end date" }] });
    }

    kafka.make_request("student_update_school", req.body, (err, results) => {
      try {
        const student = results;
        res.json({ student });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   POST students/newjob
// @desc    Add a new job to the student profile
// @access  Public
router.post(
  "/newjob",
  [
    check("companyname", "Company name is required").not().isEmpty().trim(),
    check("title", "Title is required").not().isEmpty().trim(),
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

    if (
      (req.body.startdatemonth !== "" && req.body.startdateyear === "") ||
      (req.body.startdatemonth === "" && req.body.startdateyear !== "") ||
      (req.body.enddatemonth === "" && req.body.enddateyear !== "") ||
      (req.body.enddatemonth !== "" && req.body.enddateyear === "")
    ) {
      return res.status(400).json({
        errors: [
          {
            jobmsg: "Found date with a year but not a month. Enter month too.",
          },
        ],
      });
    }

    if (
      req.body.startdateyear > req.body.enddateyear ||
      (req.body.startdateyear === req.body.enddateyear &&
        req.body.startdatemonth > req.body.enddatemonth)
    ) {
      return res.status(400).json({
        errors: [
          {
            jobmsg: "Start date cannot be after end date",
          },
        ],
      });
    }

    kafka.make_request("student_add_new_job", req.body, (err, results) => {
      try {
        const student = results;
        if (student === 0) {
          return res.status(400).json({
            errors: [
              {
                jobmsg:
                  "A work experience with this information already exists",
              },
            ],
          });
        }

        res.json({ student });
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    });
  }
);

// @route   DELETE students/job/:id/:jobid
// @desc    Delete job from the student profile
// @access  Public
router.delete("/job/:id/:jobid", checkAuth, async (req, res) => {
  kafka.make_request("student_delete_job", req.params, (err, results) => {
    try {
      const student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

// @route   PUT students/job
// @desc    Update a job in the student profile
// @access  Public
router.put("/job", checkAuth, async (req, res) => {
  const errors = validationResult(req);
  console.log(errors);
  console.log(req.body);
  // Check if there are errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: update.errors.array() });
  }

  if (
    (req.body.startdatemonth !== null && req.body.startdateyear === null) ||
    (req.body.startdatemonth === null && req.body.startdateyear !== null) ||
    (req.body.enddatemonth === null && req.body.enddateyear !== null) ||
    (req.body.enddatemonth !== null && req.body.enddateyear === null)
  ) {
    return res.status(400).json({
      errors: [
        {
          updatejobmsg:
            "Found date with a year but not a month. Enter month too.",
        },
      ],
    });
  }

  if (
    req.body.startdateyear > req.body.enddateyear ||
    (req.body.startdateyear === req.body.enddateyear &&
      req.body.startdatemonth > req.body.enddatemonth)
  ) {
    return res.status(400).json({
      errors: [
        {
          updatejobmsg: "Start date cannot be after end date",
        },
      ],
    });
  }

  kafka.make_request("student_update_job", req.body, (err, results) => {
    try {
      const student = results;
      res.json({ student });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
});

module.exports = router;
