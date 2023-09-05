const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const Course = require("../models/courses");
const { ObjectId } = mongoose.Schema;

const refundSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 100,
      required: true,
    },
  },
  { timestamps: true }
);

const refund = mongoose.model("refund", refundSchema);
module.exports = refund;
