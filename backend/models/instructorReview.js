const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
 
const InstructorReviewSchema = new Schema(
    {
        instructor: {
            type: String,
            required: true,
          },
          trainee: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required:true
          },
          text: {
            type: String,
            required: false,
          }
    },
    {timestamps: true}
)

const InstructorReview = mongoose.model("instructorReview", InstructorReviewSchema);
module.exports = InstructorReview;