const { default: mongoose, trusted } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const courseSchema = new Schema(
  {
    instructor: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      default: 0,
      required: false,
    },
    subject: {
      type: String,
      required: true,
    },
    shortSummary: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numberOfRatings: {
      type: Number,
    },
    views: {
      type: Number,
    },
    preview: {
      type: String,
      required: false,
    },
    total_hours: {
      type: Number,
      required: false,
      default: 0,
    },
    subtitles: [
      {
        Name: {
          type: String,
          required: true,
        },
        Hours: {
          type: Number,
          required: true,
        },
        Link: {
          type: String,
          required: true,
        },
        Subtitle_description: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          required: false,
        },
      },
    ],

    Exercises: [
      {
        Question: {
          type: String,
          required: true,
        },
        Answer1: {
          type: String,
          required: true,
        },
        Answer2: {
          type: String,
          required: true,
        },
        Answer3: {
          type: String,
          required: true,
        },
        Answer4: {
          type: String,
          required: true,
        },
        CorrectAnswer: {
          type: Number,
          required: true,
        },
      },
    ],
    percentage_completed: {
      type: Number,
      default: 0,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
    },
  },

  { timestamps: true }
);

const course = mongoose.model("courses", courseSchema);
module.exports = course;
