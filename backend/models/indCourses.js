const { default: mongoose } = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const indcourseSchema = new Schema(
  {
    username: {
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
    instructor: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
    subject:{
      type: String,
      required:true,
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
          required: true,
          default: false,
        },
      },
    ],

    Excercises: [
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
      required: true,
    },
  },

  { timestamps: true }
);

const course = mongoose.model("indTraineeCourses", indcourseSchema);
module.exports = course;
