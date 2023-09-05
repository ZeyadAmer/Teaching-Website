const express = require("express");
const {
  searchCourse,
  filterCourseByPrice,
  filterCourse,
  quickViewCourse,
  viewMyCourses,
  searchSubject,

  viewCourses,
  getAllCourses,
  filterRating,
  filterViews,
  addCourse,
  markCompleted,
  myProgress,
} = require("../controllers/courseController");
const requireAuth = require("../middleware/corpAuth");
const router = express.Router();
router.use(requireAuth);

// search for course
router.get("/Course", searchCourse);

router.get("/filterCoursePrice", filterCourseByPrice);
router.get("/viewMyCourses", viewMyCourses);

router.get("/filterCourse", filterCourse);

router.get("/Course/:id", quickViewCourse);

router.get("filterSubject", searchSubject);

router.get("/getCourses", viewCourses);

router.get("/getall", getAllCourses);

router.get("/filterRating", filterRating);

router.get("/filterViews", filterViews);
router.post("/addCourse", addCourse);
router.post("/markCompleted", markCompleted);
router.get("/myProgress", myProgress);
module.exports = router;
