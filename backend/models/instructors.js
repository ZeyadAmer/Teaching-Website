const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const instructorSchema = new Schema(
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
    biography: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false
    }
  },
  { timestamps: true }
);

const instructor = mongoose.model("instructor", instructorSchema);
module.exports = instructor;
