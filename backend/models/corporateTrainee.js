const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const Course = require("../models/courses");

const corporateTraineeSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    courses: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Course,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const corporateTrainee = mongoose.model(
  "corporateTrainee",
  corporateTraineeSchema
);
module.exports = corporateTrainee;
