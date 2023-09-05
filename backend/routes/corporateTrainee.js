const express = require("express");
const {
  newProblem,
  followUpProblem,
} = require("../controllers/problemController");

const {
  changeCountry,
  reviewCourse,
  reviewInstructor,
  myCourses,
  myProblems,
  unresolved,
  percentage_completed,
  changePassword,
  viewExcercises,
  viewSubtitles,
  requestCourse,
  watchVideo,
  completeCourse,
  changeforgot,
  forgotPassword,
  isComplete,
} = require("../controllers/corporateTrainee");

const requireAuth = require("../middleware/corpAuth");
const router = express.Router();
router.post("/forgotPassword", forgotPassword);
router.post("/changeforgot", changeforgot);

router.use(requireAuth);

router.post("/changeCountry", changeCountry);
router.post("/reviewCourse", reviewCourse);
router.post("/reviewInstructor", reviewInstructor);
router.get("/myCourses", myCourses);
router.get("/myProblems", myProblems);
router.get("/unresolved", unresolved);
router.get("/percentage_completed", percentage_completed);
router.post("/changePassword", changePassword);
router.get("/viewExcercises", viewExcercises);
router.get("/viewSubtitles", viewSubtitles);
router.get("/watchVideo", watchVideo);
router.post("/requestCourse", requestCourse);

router.get("/completeCourse", completeCourse);

router.post("/changeforgot", changeforgot);
router.post("/forgotPassword", forgotPassword);


router.post("/newProblem", newProblem);
router.post("/followUpProblem", followUpProblem);
router.get("/isComplete", isComplete);
module.exports = router;
