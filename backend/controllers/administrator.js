const administratormodel = require("../models/administrators");
const corporatemodel = require("../models/corporateTrainee");
const individualModel = require("../models/individualTrainee");
const problemModel = require("../models/problem");
const Instructormodel = require("../models/instructors");
const refundModel = require("../models/refund");
const accessCourseModel = require("../models/accessCourse");
const indcourse = require("../models/indCourses");
const course = require("../models/courses");

const bcrypt = require("bcrypt");

const addAdministrator = async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const administrator = await administratormodel.create({
      username: username,
      password: hashedPassword,
    });
    res.status(200).json(administrator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const addInstructor = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const instructor = await Instructormodel.create({
      username: username,
      password: hashedPassword,
    });
    res.status(200).json(instructor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const addCorporate = async (req, res) => {
  const { username, password } = req.body;
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const corporate = await corporatemodel.create({
      username: username,
      password: hashedPassword,
    });
    res.status(200).json(corporate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewrefunds = async (req, res) => {
  try {
    const refunds = await refundModel.find();
    res.status(200).json(refunds);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const refund = async (req, res) => {
  // TODO: delete from courses of individual
  const { username, title } = req.body;
  try {
    var user = await individualModel.findOne({ username: username });
    const refund = await refundModel.findOne({
      username: username,
      title: title,
    });
    var money = user["wallet"];
    var cash = refund["price"];
    console.log(money);
    money += cash;

    const user1 = await individualModel.findOneAndUpdate(
      { username: username },
      { wallet: money },
      { new: true }
    );
    const refunds = await refundModel.findOneAndDelete({
      username: username,
      title: title,
    });
    await indcourse.findOneAndDelete({ username: username, title: title });
    res.status(200).json(user1);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewProblems = async (req, res) => {
  try {
    const problem = await problemModel.find({});
    res.status(200).json(problem);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const markProblem = async (req, res) => {
  const { id, status } = req.body;
  try {
    const problem = await problemModel.findOneAndUpdate(
      { _id: id },
      { state: status },
      { new: true }
    );
    res.status(200).json(problem);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const viewRequests = async (req, res) => {
  try {
    const problem = await accessCourseModel.find({});
    res.status(200).json(problem);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const grantCourse = async (req, res) => {
  const { id } = req.body;
  try {
    // console.log(title);
    const request = await accessCourseModel.findByIdAndDelete({ _id: id });
    const title = request.title;
    const courses = await course.findOne({ title: title });
    const name = request.username;

    // console.log(courses);
    const subtitles = courses.subtitles;
    const Excercises = courses.Excercises;
    const instructor =courses.instructor;
    const preview=courses.preview;
    const subject=courses.subject
    const granted = await indcourse.create({
      username: name,
      title: title,
      subtitles: subtitles,
      Exercises: Excercises,
      instructor:instructor,
      price:0,
      preview:preview,
      subject:subject
    });

    console.log(granted)
    res.status(200).json(granted);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const rejectRequest = async (req, res) => {
  const id = req.body.id;
  try {
    const request = await accessCourseModel.findByIdAndDelete({ _id: id });
    res.status(200).json(request);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const setPromotion = async (req, res) => {
  const { IDs, perc, expirationDate } = req.body;
  try {
    IDs.forEach(async (idcourse) => {
      let Course = await course.findOne({ _id: idcourse });
      let originalPrice = Course.price;
      let newPrice = originalPrice * ((100 - perc) / 100);
      let Promotion = await course.findOneAndUpdate(
        { _id: idcourse },
        { price: newPrice, expirationDate: expirationDate },
        { new: true }
      );
    });
    res.status(200).json("Promotions Added");
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

setInterval(async () => {
  const currentDate = new Date();
  const documents = await course.find({
    expirationDate: { $lt: currentDate },
  });
  documents.forEach(async (doc) => {
    doc.price = doc.originalPrice;
    await doc.save();
  });
}, 60000);

module.exports = {
  addAdministrator,
  addInstructor,
  addCorporate,
  viewrefunds,
  refund,
  viewProblems,
  markProblem,
  viewRequests,
  grantCourse,
  setPromotion,
  rejectRequest
};
