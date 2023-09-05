require("dotenv").config();
const TraineeModel = require("../models/individualTrainee");
const mongose = require("mongoose");
const courseReviewModel = require("../models/courseReview");
const refundModel = require("../models/refund");
const instructorReviewModel = require("../models/instructorReview");
const problem = require("../models/problem");
const fs = require("fs");
const instructormodel = require("../models/instructors");
const Course = require("../models/courses");
const indcourse = require("../models/indCourses");
const course = require("../models/courses");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const bcrypt = require("bcrypt");

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

const changeCountry = async (req, res) => {
  const country = req.body.country;
  const username = req.user.username;
  try {
    const trainee = await TraineeModel.findOneAndUpdate(
      { username: username },
      { country: country },
      {
        new: true,
      }
    );
    if (!trainee) {
      return res.status(404).json({ error: "No such user" });
    }
    res.status(200).json(trainee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const reviewInstructor = async (req, res) => {
  const { inst, rating, text } = req.body;
  const trainee = req.user.username;
  try {
    const review = await instructorReviewModel.findOneAndUpdate(
      { trainee: trainee, instructor: inst },
      { rating: rating, text: text },
      { new: true, upsert: true }
    );
    // console.log(review)

    const ratings = await instructorReviewModel.find({ instructor: inst });
    let avgrate = 0;
    let count = 0;
    let rate = 0;
    ratings.forEach((rating) => {
      avgrate += rating.rating;
      count++;
    });
    if (count == 0) {
      rate = 0;
    } else {
      rate = Math.round((avgrate * 100) / count) / 100;
    }
    await instructormodel.findOneAndUpdate(
      { username: inst },
      { rating: rate }
    );
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const reviewCourse = async (req, res) => {
  const { title, rating, text, instructor } = req.body;
  const trainee = req.user.username;
  try {
    const review = await courseReviewModel.findOneAndUpdate(
      { trainee: trainee, title: title },
      { rating: rating, text: text, instructor: instructor },
      { new: true, upsert: true }
    );
    const ratings = await courseReviewModel.find({ title: title });
    let avgrate = 0;
    let count = 0;
    let rate = 0;
    ratings.forEach((rating) => {
      avgrate += rating.rating;
      count++;
    });
    if (count == 0) {
      rate = 0;
    } else {
      rate = Math.round((avgrate * 100) / count) / 100;
    }
    await coursemodel.findOneAndUpdate({ title: title }, { rating: rate });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const wallet = async (req, res) => {
  const trainee = req.user.username;
  try {
    const money = await TraineeModel.find({ username: trainee }).select(
      "wallet"
    );
    res.status(200).json(money);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const myCourses = async (req, res) => {
  const { username } = req.body;
  try {
    const courses = await TraineeModel.find({ username })
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
  const { username, courseTitle } = req.body;
  try {
    const completed = await problem
      .find({ username, courses: { $elemMatch: { title: courseTitle } } })
      .select({ courses: "percentage_completed" });
    res.status(200).json(completed);
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

const refund = async (req, res) => {
  const { courseTitle, reason } = req.body;
  const name = req.user.username;
  try {
    const completed = await indcourse.findOne({
      username: name,
      title: courseTitle,
    });
    console.log(completed.percentage_completed);
    if (completed.percentage_completed < 50) {
      //return the cash
      const refund = await refundModel.create({
        username: name,
        reason: reason,
        title: courseTitle,
        price: completed.price,
      });
      res.status(200).json(refund);
    } else {
      res
        .status(200)
        .json("sorry refund is not possible as you watched more than 50%");
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
    var courses = await Course.find({
      title: title,
    }).select({ subtitles: { $elemMatch: { Name: Name } } });

    res.status(200).json(courses);
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

const forgotPassword = async (req, res) => {
  const mail = req.body;
  const maill = mail["mail"];
  console.log(mail);
  const subject = "Forgotten Password";
  const msg = {
    from: process.env.user,
    to: maill,
    subject: subject,
    text: "Hello, plain text! http://localhost:3000/individualetrainee/changeforgot",
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

const payCourse = async (req, res) => {
  const id = req.body.id;
  try {
    const co = await course.findOne({ _id: id });
    const title = co.title;
    const price = co.price * 100;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: {
        price_data: {
          currency: "usd",
          product_data: {
            name: title,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
      success_url: `www.google.com`,
      cancel_url: `www.google.com`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  changeCountry,
  reviewCourse,
  reviewInstructor,
  wallet,
  myCourses,
  myProblems,
  unresolved,
  percentage_completed,
  refund,
  changePassword,
  viewExcercises,
  viewSubtitles,
  watchVideo,
  completeCourse,
  changeforgot,
  forgotPassword,

  payCourse,

  isComplete,
  payCourse,
};
