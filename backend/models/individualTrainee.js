const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const Course = require("../models/courses");

const individualTraineeSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    wallet: {
      type: Number,
      default: 0,
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

const individualTrainee = mongoose.model(
  "individualTrainee",
  individualTraineeSchema
);
module.exports = individualTrainee;

//sign up for an account as an individual trainee
//using a{ username, email, password, firstname, lastname , gender}
