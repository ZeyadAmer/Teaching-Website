const express = require("express");

const {
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
  filterPrice,
  filterSubject,
  myCourses,
  filterTitle,
  makePromotion,
  changeforgot,
} = require("../controllers/instructorEdit");
const {
  calcMyAverageRating,
  calcCourseAveragerating,
  viewMyRatings,
  viewMyCourseRatings,
  calcMoneyOwed,
} = require("../controllers/instructor");

const { completeCourse } = require("../controllers/individualTrainee");

const requireAuth = require("../middleware/instructorAuth");
const router = express.Router();
router.post("/forgotPassword", forgotPassword);

router.post("/changeforgot", changeforgot);
router.use(requireAuth);

router.post("/makePromotion", makePromotion);
router.post("/forgotPassword", forgotPassword);
router.post("/changeMail", changeMail);
router.post("/changePassword", changePassword);
router.post("/createCourse", createCourse);
router.post("/changeCountry", changeCountry);
router.get("/myProblems", myProblems);
router.get("/unresolved", unresolved);
router.post("/addSubtitle", addSubtitle);
router.post("/updatePreview", updatePreview);
router.post("/addExam", addExam);
router.post("/updateBio", updateBio);
router.get("/calcMyAverageRating", calcMyAverageRating);
router.get("/calcCourseAveragerating", calcCourseAveragerating);
router.get("/viewMyRatings", viewMyRatings);
router.get("/viewMyCourseRatings", viewMyCourseRatings);
router.get("/myCourses", myCourses);
router.get("/filterPrice", filterPrice);
router.get("/filterSubject", filterSubject);
router.get("/filterTitle", filterTitle);

router.get("/completeCourse", completeCourse);

router.get("/calcMoneyOwed", calcMoneyOwed);

module.exports = router;
