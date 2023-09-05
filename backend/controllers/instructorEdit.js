const instructorModel = require("../models/instructors");
const courseModel = require("../models/courses");
const problem = require("../models/problem");

const { default: mongoose } = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
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

const forgotPassword = async (req, res) => {
  const mail = req.body;
  const maill = mail["mail"];
  console.log(mail);
  const subject = "Forgotten Password";
  const msg = {
    from: process.env.user,
    to: maill,
    subject: subject,
    text: "Hello, plain text! http://localhost:3000/instructor/changeforgot",
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

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  try {
    const instructor = await instructorModel.findOne({ email: mail });
    if (!instructor) {
      throw error("Incorrect user");
    }

    await instructorModel.findOneAndUpdate(
      { email: mail },
      { password: hashedPassword }
    );
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const changeMail = async (req, res) => {
  //tested and working
  const { password, email } = req.body;
  const name = req.user.username;
  try {
    const instructor = await instructorModel.findOne({ username: name });
    if (!instructor) {
      throw error("Incorrect user");
    }
    const match = await bcrypt.compare(password, instructor.password);
    if (!match) {
      throw error("Incorrect password");
    } else {
      const inst = await instructorModel.findOneAndUpdate(
        { username: name },
        { email: email },
        { new: true }
      );
      res.status(200).json(inst);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  //tested and working
  const { password, newPassword } = req.body;
  const name = req.user.username;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  try {
    const instructor = await instructorModel.findOne({ username: name });
    if (!instructor) {
      throw error("Incorrect user");
    }
    const match = await bcrypt.compare(password, instructor.password);
    if (!match) {
      throw Error("Incorrect password");
    } else {
      await instructorModel.findOneAndUpdate(
        { username: name },
        { password: hashedPassword }
      );
      res.status(200).json(instructor);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createCourse = async (req, res) => {
  //tested and working
  const { title, price, subject, shortSummary } = req.body;
  const name = req.user.username;
  try {
    const course = await courseModel.create({
      instructor: name,
      title: title,
      price: price,
      originalPrice: price,
      subject: subject,
      shortSummary: shortSummary,
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addExam = async (req, res) => {
  //tested and working
  const name = req.user.username;
  const {
    Question,
    Answer1,
    Answer2,
    Answer3,
    Answer4,
    CorrectAnswer,
    courseId,
  } = req.body;
  try {
    const exam = [
      { Question, Answer1, Answer2, Answer3, Answer4, CorrectAnswer },
    ];
    await courseModel.updateOne(
      { instructor: name, _id: courseId },
      { $push: { Exercises: exam } }
    );
    res.status(200).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addSubtitle = async (req, res) => {
  //tested and working  bas lazem yegeeb el link men el url mayenfa3sh men share el mawgoda
  const name = req.user.username;
  const { Name, Hours, link, Subtitle_description, courseId } = req.body;
  try {
    var Link = link.replace("watch?v=", "embed/");
    Link = link.replace("youtu.be/", "youtube.com/embed/");
    const subtitle = [{ Name, Hours, Link, Subtitle_description }];
    var allhours = await courseModel.findOne({
      instructor: name,
      _id: courseId,
    });
    var allhours2 = allhours["total_hours"];
    allhours2 += Hours;

    const course = await courseModel.findOneAndUpdate(
      { instructor: name, _id: courseId },
      { $push: { subtitles: subtitle }, $set: { total_hours: allhours2 } },
      { new: true }
    );

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updatePreview = async (req, res) => {
  //tested and working
  const { link, courseId } = req.body;
  const name = req.user.username;
  try {
    var embedUrl = link.replace("watch?v=", "embed/");
    embedUrl = link.replace("youtu.be/", "youtube.com/embed/");
    const subtitle = await courseModel.updateOne(
      { instructor: name, _id: courseId },
      { preview: embedUrl }
    );

    res.status(200).json(embedUrl);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBio = async (req, res) => {
  //tested and working
  const { bio } = req.body;
  try {
    const name = req.user.username;

    await instructorModel.updateOne({ username: name }, { biography: bio });
    course = await instructorModel.findOne({
      username: name,
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const myCourses = async (req, res) => {
  const name = req.user.username;
  try {
    const courses = await courseModel
      .find({ instructor: name })
      .sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const filterPrice = async (req, res) => {
  const { price } = req.body;
  try {
    const name = req.user.username;
    const courses = await courseModel
      .find({
        instructor: name,
        price: { $lt: price },
      })
      .sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const filterSubject = async (req, res) => {
  const { subject } = req.body;
  try {
    const name = req.user.username;
    const courses = await courseModel
      .find({
        instructor: name,
        subject: subject,
      })
      .sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const filterTitle = async (req, res) => {
  const { title } = req.body;
  try {
    const name = req.user.username;
    const courses = await courseModel
      .find({
        instructor: name,
        title: title,
      })
      .sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changeCountry = async (req, res) => {
  //tested and working
  const { country } = req.body;
  try {
    const name = req.user.username;
    const instructor = await instructorModel.findOneAndUpdate(
      { instructor: name },
      { country: country },
      { new: true }
    );
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const myProblems = async (req, res) => {
  //tested and working
  try {
    const name = req.user.username;
    const problems = await problem.find({ name });
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

const makePromotion = async (req, res) => {
  const { percentage_discount, expirationDate, title } = req.body;
  const name = req.user.username;
  try {
    var problem = await courseModel.findOne({
      instructor: name,
      title: title,
    });
    // console.log(problem);
    var price = problem["price"];
    newprice = price * ((100 - percentage_discount) / 100);
    const promotion = await courseModel.findOneAndUpdate(
      { instructor: name, title: title },
      { price: newprice, expirationDate: expirationDate },
      { new: true }
    );
    res.status(200).json(promotion);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
setInterval(async () => {
  const currentDate = new Date();
  const documents = await courseModel.find({
    expirationDate: { $lt: currentDate },
  });
  documents.forEach(async (doc) => {
    doc.price = doc.originalPrice;
    await doc.save();
  });
}, 60000);

module.exports = {
  changeMail,
  changePassword,
  createCourse,
  changeCountry,
  myProblems,
  unresolved,
  addSubtitle,
  updatePreview,
  addExam,
  updateBio,
  forgotPassword,
  myCourses,
  filterPrice,
  filterSubject,
  filterTitle,
  makePromotion,
  changeforgot,
};

//still need models to start test
//last try
