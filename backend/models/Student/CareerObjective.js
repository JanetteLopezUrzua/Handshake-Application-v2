const mongoose = require("mongoose");

const CareerObjectiveSchema = new mongoose.Schema(
  {
    studentId: {
      type: ObjectId,
      required: true
    },
    careerObjective: {
      type: String,
      required: false
    }
  },
  {
    versionKey: false
  }
);

module.exports = CareerObjective = mongoose.model(
  "careerobjective",
  CareerObjectiveSchema
);
