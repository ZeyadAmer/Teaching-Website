const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const accessCourseSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const accessCourse = mongoose.model("accessCourse", accessCourseSchema);
module.exports = accessCourse;
