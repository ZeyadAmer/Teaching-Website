const express = require("express");
const {
  searchCourse,

  filterCourseByPrice,
  filterCourse,
  quickViewCourse,
  // myCourses,
  searchSubject,
  viewMyCourses,
  viewCourses,
  getAllCourses,
  filterRating,
  filterViews,
  viewPrice,
  addCourse,
  markCompleted,
  myProgress,
} = require("../controllers/courseController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
router.use(requireAuth);

// search for course
router.get("/searchCourse", searchCourse);
router.get("/viewMyCourses", viewMyCourses);
router.get("/filterCourseByPrice", filterCourseByPrice);
router.get("/filterCourse", filterCourse);
router.get("/Course/:id", quickViewCourse);
router.get("searchSubject", searchSubject);
router.get("/getCourses", viewCourses);
router.get("/getAllCourses", getAllCourses);
router.get("/filterRating", filterRating);
router.get("/filterViews", filterViews);
router.get("/viewPrice", viewPrice);
router.post("/addCourse", addCourse);
router.post("/markCompleted", markCompleted);
router.get("/myProgress", myProgress);
module.exports = router;
