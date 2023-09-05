const Course = require("../models/courses");

const { default: mongoose } = require("mongoose");
const express = require("express");
const indcourse = require("../models/indCourses");

const getAllCourses = async (req, res) => {
  //tested and working
  const course = await Course.find({});
  return res.status(200).json({ course });
};

// search for course by title,subject,instructor
const searchCourse = async (req, res) => {
  //tested and working
  const { title, instructor, subject } = req.body;

  if (title != undefined) {
    const course = await Course.find({ title: title });
    return res.status(200).json({ course });
  }
  if (subject != undefined) {
    const course = await Course.find({ subject: subject }).sort({ price: 1 });
    return res.status(200).json({ course });
  }
  if (instructor != undefined) {
    const course = await Course.find({ instructor: instructor }).sort({
      price: 1,
    });
    return res.status(200).json({ course });
  }
};

//filter by subject and/or rating
const filterCourse = async (req, res) => {
  //tested and working
  const { rating, subject } = req.body;
  if (rating != undefined && subject != undefined) {
    const course = await Course.find({
      rating: { $gte: rating },
      subject: subject,
    }).sort({
      rating: -1,
    });
    return res.status(200).json({ course });
  } else if (subject != undefined) {
    const course = await Course.find({ subject: subject });
    return res.status(200).json({ course });
  } else if (rating != undefined) {
    const course = await Course.find({ rating: { $gte: rating } }).sort({
      rating: -1,
    });
    return res.status(200).json({ course });
  }
};

//filter course by price
const filterCourseByPrice = async (req, res) => {
  //tested and working
  const { price } = req.body;
  const course = await Course.find({ price: { $lte: price } }).sort({
    price: 1,
  });
  return res.status(200).json({ course });
};

// quick view course
const quickViewCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.find({ _id: id });
  return res.status(200).json({ course });
};

const filterRating = async (req, res) => {
  // most popular
  try {
    const courses = await Course.find().sort({ rating: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const filterViews = async (req, res) => {
  try {
    const courses = await Course.find().sort({ views: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const searchSubject = async (req, res) => {
  const { subject } = req.body;
  try {
    const courses = await Course.find({
      subject: subject,
    }).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const searchtitle = async (req, res) => {
  const { title } = req.body;
  try {
    const courses = await Course.find({
      title: title,
    }).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const viewDetails = async (req, res) => {
  const { title } = req.body;
  try {
    const courses = await Course.find({
      title: title,
    }).select(" total_hours Exercises price subtitles.Name subtitles.Hours");
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const viewPreview = async (req, res) => {
  const { title } = req.body;
  try {
    const courses = await Course.find({
      title: title,
    }).select("preview shortSummary  subtitles.Name ");
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const searchInstructor = async (req, res) => {
  const { instructor } = req.body;
  try {
    const courses = await Course.find({
      instructor: instructor,
    }).sort({ createdAt: -1 });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const viewCourses = async (req, res) => {
  //const courses = await Course.find({}).project({ title: 1, price: 1 });
  //return res.status(200).json(courses);
};

const viewPrice = async (req, res) => {
  const Title = req.body.title;
  try {
    const courses = await Course.findOne({ title: Title }).select(
      "title price -_id"
    );
    return res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const viewMostPopular = async (req, res) => {
  try {
    const courses = await Course.find({})
      .sort({ rating: -1 })
      .limit(10)
      .select("title rating -_id");
    return res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addCourse = async (req, res) => {
  const { courseId } = req.body;
  const userName = req.user.username;
  try {
    const course = await Course.findOne({ _id: courseId });
    const subtitles = course.subtitles;
    const price = course.price;
    const Excercises = course.Exercises;
    const prev = course.preview;
    const inst = course.instructor;
    const bought = await indcourse.create({
      username: userName,
      title: title,
      subtitles: subtitles,
      Excercises: Excercises,
      price: price,
      preview: prev,
      instructor: inst,
    });
    res.status(200).json(bought);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const markCompleted = async (req, res) => {
  const { courseId, name } = req.body;
  const userName = req.user.username;
  try {
    let count = 0;
    let comp = 0;
    const course = await indcourse.findOne({
      _id: courseId,
    });
    const subtitles = course.subtitles;
    subtitles.forEach((sub) => {
      if (sub.Name == name) {
        sub.completed = true;
      }
      if (sub.completed) {
        comp++;
      }
      count++;
    });
    let perc = Math.round((comp * 100) / count) / 100;
    const newCourse = await indcourse.findOneAndUpdate(
      {
        title: title,
        username: userName,
      },
      { subtitles: subtitles, percentage_completed: perc },
      { new: true }
    );
    res.status(200).json(newCourse);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const myProgress = async (req, res) => {
  const { title } = req.body;
  const userName = req.user.username;
  try {
    const prog = await indcourse
      .findOne({ username: userName, title: title })
      .select(percentage_completed);
    res.status(200).json(prog);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const viewMyCourses = async (req, res) => {
  const user = req.user.username;
  try {
    const courses = await indcourse.find({ username: user });
    res.status(200).json(courses);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  searchCourse,
  filterCourseByPrice,
  filterCourse,
  quickViewCourse,
  searchSubject,

  viewCourses,
  getAllCourses,
  filterRating,
  filterViews,
  viewPrice,
  searchInstructor,
  searchtitle,
  viewDetails,
  viewPreview,
  viewMostPopular,
  viewMyCourses,
  addCourse,
  markCompleted,
  myProgress,
};
