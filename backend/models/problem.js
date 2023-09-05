const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const problemSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["technical", "financial", "other"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: ["unseen", "resolved", "pending"],
      default: "unseen",
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    courseId: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const problem = mongoose.model("problem", problemSchema);
module.exports = problem;
