const TraineeModel = require("../models/corporateTrainee");
const problem = require("../models/problem");
const mongose = require("mongoose");
const courseReviewModel = require("../models/courseReview");
const traineeReviewModel = require("../models/instructorReview");
const Course = require("../models/courses");
const accessCourseModel = require("../models/accessCourse");
const bcrypt = require("bcrypt");

require ("dotenv").config

const nodemailer = require("nodemailer");

var smtpConfig = {
  host: process.env.host,
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
};

var transporter = nodemailer.createTransport(smtpConfig);

const changeCountry = async (req, res) => {
  const { country } = req.body;
  const name = req.user.username;
  try {
    const trainee = await TraineeModel.findOneAndUpdate(
      { username: name },
      { country: country }
    );
    res.status(200).json(trainee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const reviewInstructor = async (req, res) => {
  const { instructor, text } = req.body;
  const name = req.user.username;
  try {
    const courseReview = await traineeReviewModel.create({
      instructor: instructor,
      trainee: name,
      text: text,
    });
    res.status(200).json(courseReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const reviewCourse = async (req, res) => {
  const { title, text } = req.body;
  const name = req.user.username;
  try {
    const courseReview = await courseReviewModel.create({
      title: title,
      username: name,
      text: text,
    });
    res.status(200).json(courseReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const myCourses = async (req, res) => {
  const name = req.user.username;
  try {
    const courses = await TraineeModel.find({ name })
      .select("courses")
      .sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const myProblems = async (req, res) => {
  //tested and working
  try {
    const name = req.user.username;
    const problems = await problem.find({ userName: name });
    res.status(200).json(problems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const unresolved = async (req, res) => {
  //tested and working
  const name = req.user.username;
  try {
    const problems = await problem.find({
      $or: [
        { userName: name, state: "unseen" },
        { userName: name, state: "pending" },
      ],
    });
    res.status(200).json(problems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const percentage_completed = async (req, res) => {
  const { courseTitle } = req.body;
  const name = req.user.username;
  try {
    const problems = await problem
      .find({ name, courses: { $elemMatch: { title: courseTitle } } })
      .select({ courses: "percentage_completed" });
    res.status(200).json(problems);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  try {
    const name = req.user.username;
    const trainee = await TraineeModel.findOne({ name });
    if (!trainee) {
      throw error("Incorrect user");
    }
    const match = await bcrypt.compare(password, trainee.password);
    if (!match) {
      throw error("Incorrect password");
    } else {
      await TraineeModel.findOneAndUpdate(
        { name },
        { password: hashedPassword }
      );
      res.status(200).json(trainee);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const viewExcercises = async (req, res) => {
  const { title } = req.body;
  try {
    const courses = await Course.find({
      title: title,
    }).select("Excercises");
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewSubtitles = async (req, res) => {
  const { title } = req.body;
  try {
    const courses = await Course.find({
      title: title,
    }).select("subtitles");
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const watchVideo = async (req, res) => {
  const { title, Name } = req.body;
  try {
    const courses = await Course.find({
      title: title,
      courses: { $elemMatch: { subtitles: Name } },
    }).select("subtitles.Link");
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const requestCourse = async (req, res) => {
  const { title } = req.body;
  const name = req.user.username;
  try {
    const student = await accessCourseModel.create({
      username: name,
      title: title,
    });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const mail = req.body;

  const maill = mail["mail"];
  console.log(mail);

  const subject = "Forgotten Password";
  const msg = {
    from: process.env.user,
    to: maill,
    subject: subject,
    text: "Hello, plain text! http://localhost:3000/corporate/changeforgot",
  };
  try {
    transporter.sendMail(msg, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json("Email sent");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const completeCourse = async (req, res) => {
  const individual = req.user.username;
  const trainee = await TraineeModel.findOne({ username: individual });
  const mail = trainee.email;
  const subject = "Course Complete";
  const msg = {
    from: process.env.user,
    to: mail,
    subject: subject,
    attachments: [
      {
        filename: "cong.pdf",
        path: "./cong.pdf",
        contentType: "application/pdf",
      },
    ],
  };
  try {
    transporter.sendMail(msg, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.status(200).json("Email sent");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const changeforgot = async (req, res) => {
  //tested and working
  const { mail, newPassword } = req.body;
  maill = mail["mail"];
  password = newPassword["newPassword"];

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const instructor = await TraineeModel.findOne({ email: maill });
    if (!instructor) {
      throw error("Incorrect user");
    }

    await TraineeModel.findOneAndUpdate(
      { email: maill },
      { password: hashedPassword }
    );
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const isComplete = async (req, res) => {
  const { id } = req.body;
  const individual = req.user.username;
  try {
    var courses = await indcourse.find({
      username: individual,
      _id: id,
    });
    if (courses.percentage_completed == 100) {
      res.status(200).json("true");
    } else {
      res.status(200).json("true");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  changeCountry,
  reviewCourse,
  reviewInstructor,
  myCourses,
  myProblems,
  unresolved,
  percentage_completed,
  changePassword,
  viewExcercises,
  viewSubtitles,
  watchVideo,
  requestCourse,
  completeCourse,
  changeforgot,
  forgotPassword,
  isComplete,
};
