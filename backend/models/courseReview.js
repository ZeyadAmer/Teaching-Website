const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const courseReviewSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
          },
          trainee: {
            type: String,
            required: true,
          },
          instructor: {
            type: String,
            required: true
          },
          text: {
            type: String,
            required: false
          },
          rating: {
            type: Number,
            required: true
          }
    },
    {timestamps: true}
)

const courseReview = mongoose.model("coursesReview", courseReviewSchema);
module.exports = courseReview;