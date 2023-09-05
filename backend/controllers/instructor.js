const instructor = require("../models/instructors");
const mongose = require("mongoose");
const instructorReview = require("../models/instructorReview");
const courseReview = require("../models/courseReview");
const boughtCourses = require("../models/indCourses");

const calcMyAverageRating = async (req, res) => {
  const username = req.user.username;
  try {
    const ratings = await instructorReview.find({ instructor: username });
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
    res.status(200).json(rate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewMyRatings = async (req, res) => {
  const username = req.user.username;
  try {
    const reviews = await instructorReview
      .find({ instructor: username })
      .select("trainee rating review -_id");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewMyCourseRatings = async (req, res) => {
  const username = req.user.username;
  try {
    const reviews = await courseReview
      .find({ instructor: username })
      .select("title trainee rating review -_id");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const calcCourseAveragerating = async (req, res) => {
  const username = req.user.username;
  const title = req.body.title;
  try {
    // console.log(username , title)
    const ratings = await courseReview.find({
      instructor: username,
      title: title,
    });
    // console.log(ratings)
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
    res.status(200).json(rate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const calcMoneyOwed = async (req, res) => {
  user = req.user.username;
  let moneyOwed = 0;
  try {
    const courses = await boughtCourses.find({ instructor: user });
    courses.forEach((course) => {
      moneyOwed += course.price;
    });
    res.status(200).json(moneyOwed);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  calcMyAverageRating,
  calcCourseAveragerating,
  viewMyRatings,
  viewMyCourseRatings,
  calcMoneyOwed,
};
