const express = require("express");
const {
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
} = require("../controllers/courseController");
const { payCourse } = require("../controllers/individualTrainee");

const router = express.Router();

// search for course
router.get("/searchCourse", searchCourse);

router.get("/filterCourseByPrice", filterCourseByPrice);

router.get("/filterCourse", filterCourse);

router.get("/Course/:id", quickViewCourse);

router.get("searchSubject", searchSubject);

router.get("/getCourses", viewCourses);

router.get("/getAllCourses", getAllCourses);

router.get("/viewMostPopular", viewMostPopular);
router.get("/filterRating", filterRating);
router.get("/filterViews", filterViews);

router.get("/viewPrice", viewPrice);
router.get("/searchInstructor", searchInstructor);
router.get("/searchtitle", searchtitle);
router.get("/viewDetails", viewDetails);
router.get("/viewPreview", viewPreview);
router.post("/payCourse", payCourse);

module.exports = router;
