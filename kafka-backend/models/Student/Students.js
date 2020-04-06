const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const StudentsSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    country: {
      type: String,
      required: false
    },
    photo: {
      type: String,
      required: false
    },
    objective: {
      type: String,
      required: false
    },
    phonenumber: {
      type: String,
      required: false
    },
    skillset: [
      {
        skill: {
          type: String,
          required: false
        }
      }
    ],
    schools: [
      {
        name: {
          type: String,
          required: true
        },
        primaryschool: {
          type: String,
          required: false
        },
        location: {
          type: String,
          required: false
        },
        degree: {
          type: String,
          required: false
        },
        major: {
          type: String,
          required: false
        },
        passingmonth: {
          type: Number,
          required: false
        },
        passingyear: {
          type: Number,
          required: false
        },
        gpa: {
          type: String,
          required: false
        }
      }
    ],
    jobs: [
      {
        companyname: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        startdatemonth: {
          type: Number,
          required: false
        },
        startdateyear: {
          type: Number,
          required: false
        },
        enddatemonth: {
          type: Number,
          required: false
        },
        enddateyear: {
          type: Number,
          required: false
        },
        description: {
          type: String,
          required: false
        }
      }
    ]
  },
  {
    versionKey: false
  }
);
StudentsSchema.plugin(mongoosePaginate);
module.exports = Students = mongoose.model("students", StudentsSchema);
