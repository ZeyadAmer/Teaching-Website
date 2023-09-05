const express = require("express");
const {
  newProblem,
  followUpProblem,
} = require("../controllers/problemController");

const {
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
  payCourse,
  changeforgot,
  completeCourse,
  forgotPassword,

  isComplete,
} = require("../controllers/individualTrainee");

const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
router.post("/forgotPassword", forgotPassword);
router.use(requireAuth);

router.post("/changeCountry", changeCountry);
router.post("/followUpProblem", followUpProblem);
router.post("/reviewCourse", reviewCourse);
router.post("/reviewInstructor", reviewInstructor);
router.get("/wallet", wallet);
router.get("/myCourses", myCourses);
router.get("/myProblems", myProblems);
router.get("/unresolved", unresolved);
router.get("/percentage_completed", percentage_completed);
router.post("/refund", refund);
router.post("/changePassword", changePassword);
router.get("/viewExcercises", viewExcercises);
router.get("/viewSubtitles", viewSubtitles);
router.get("/watchVideo", watchVideo);
router.post("/payCourse", payCourse);
router.get("/completeCourse", completeCourse);
router.post("/changeforgot", changeforgot);

router.post("/newProblem", newProblem);

router.post("/payCourse", payCourse);

router.get("/isComplete", isComplete);

module.exports = router;
